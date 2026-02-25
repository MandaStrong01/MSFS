import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader, RotateCcw, Trash2 } from 'lucide-react';
import { uploadQueue, UploadTask } from '../lib/uploadQueue';

export default function UploadQueueStatus() {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const unsubscribe = uploadQueue.subscribe(setTasks);
    return unsubscribe;
  }, []);

  if (tasks.length === 0) return null;

  const activeTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Loader className="w-5 h-5 text-cyan-400 animate-spin" />
          <span className="font-semibold text-white">
            Uploads ({activeTasks.length} active)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {completedTasks.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                uploadQueue.clearCompleted();
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Clear completed"
            >
              <Trash2 className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <button className="p-1">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border-t border-gray-700 hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {task.status === 'uploading' && (
                      <Loader className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                    )}
                    {task.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    )}
                    {task.status === 'error' && (
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                    {task.status === 'pending' && (
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    )}
                    <span className="text-sm text-white truncate">
                      {task.metadata?.title || task.file.name}
                    </span>
                  </div>

                  {task.status === 'uploading' && (
                    <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-cyan-500 h-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  )}

                  {task.status === 'error' && (
                    <p className="text-xs text-red-400 mt-1">{task.error}</p>
                  )}

                  <p className="text-xs text-gray-400 mt-1">
                    {(task.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {task.status === 'error' && (
                    <button
                      onClick={() => uploadQueue.retryTask(task.id)}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                      title="Retry upload"
                    >
                      <RotateCcw className="w-4 h-4 text-cyan-400" />
                    </button>
                  )}
                  {(task.status === 'completed' || task.status === 'error') && (
                    <button
                      onClick={() => uploadQueue.removeTask(task.id)}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
