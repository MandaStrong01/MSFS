import { supabase } from './supabase';

export interface UploadTask {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  error?: string;
  url?: string;
  metadata?: {
    title?: string;
    description?: string;
    isPublic?: boolean;
  };
}

type UploadListener = (tasks: UploadTask[]) => void;

class UploadQueueManager {
  private tasks: Map<string, UploadTask> = new Map();
  private listeners: Set<UploadListener> = new Set();
  private activeUploads = 0;
  private maxConcurrentUploads = 3;

  subscribe(listener: UploadListener) {
    this.listeners.add(listener);
    listener(Array.from(this.tasks.values()));
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const tasks = Array.from(this.tasks.values());
    this.listeners.forEach(listener => listener(tasks));
  }

  addTask(file: File, metadata?: UploadTask['metadata']): string {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const task: UploadTask = {
      id,
      file,
      status: 'pending',
      progress: 0,
      metadata,
    };

    this.tasks.set(id, task);
    this.notify();
    this.processQueue();
    return id;
  }

  private async processQueue() {
    if (this.activeUploads >= this.maxConcurrentUploads) return;

    const pendingTask = Array.from(this.tasks.values()).find(
      task => task.status === 'pending'
    );

    if (!pendingTask) return;

    this.activeUploads++;
    await this.uploadTask(pendingTask);
    this.activeUploads--;
    this.processQueue();
  }

  private async uploadTask(task: UploadTask) {
    try {
      task.status = 'uploading';
      this.notify();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const fileExt = task.file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, task.file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      task.url = publicUrl;
      task.progress = 100;
      task.status = 'completed';

      if (task.metadata) {
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';

        await new Promise((resolve, reject) => {
          videoElement.onloadedmetadata = () => resolve(null);
          videoElement.onerror = () => reject(new Error('Failed to load video metadata'));
          videoElement.src = URL.createObjectURL(task.file);
        });

        const duration = Math.floor(videoElement.duration);
        URL.revokeObjectURL(videoElement.src);

        const { error: dbError } = await supabase
          .from('movies')
          .insert({
            user_id: user.id,
            title: task.metadata.title || task.file.name,
            description: task.metadata.description || '',
            video_url: publicUrl,
            duration,
            is_public: task.metadata.isPublic ?? true,
          });

        if (dbError) throw dbError;
      }

      this.notify();
    } catch (error: any) {
      task.status = 'error';
      task.error = error.message || 'Upload failed';
      this.notify();
    }
  }

  removeTask(id: string) {
    this.tasks.delete(id);
    this.notify();
  }

  clearCompleted() {
    Array.from(this.tasks.values())
      .filter(task => task.status === 'completed')
      .forEach(task => this.tasks.delete(task.id));
    this.notify();
  }

  retryTask(id: string) {
    const task = this.tasks.get(id);
    if (task && task.status === 'error') {
      task.status = 'pending';
      task.progress = 0;
      task.error = undefined;
      this.notify();
      this.processQueue();
    }
  }
}

export const uploadQueue = new UploadQueueManager();
