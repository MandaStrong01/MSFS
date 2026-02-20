import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Settings, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search } from 'lucide-react';

const AI_TOOLS = {
  Writing: ["Text to Script Cinematic Writer","Text to Script Action Sequence","Text to Script Dialogue Generator","Text to Script Scene Builder","Text to Script Character Creator","Text to Script Plot Developer","Text to Script Story Outliner","Text to Script Three Act Structure","Text to Script Screenplay Formatter","Text to Script Treatment Writer","Text to Script Logline Generator","Text to Script Synopsis Creator","Text to Script Beat Sheet","Text to Script Scene Heading","Text to Script Action Line","Text to Script Parenthetical","Text to Script Transition","Text to Script Montage Builder","Text to Script Flashback Creator","Text to Script Voice Over","Text to Script Dream Sequence","Text to Script Opening Scene","Text to Script Closing Scene","Text to Script Climax Builder","Text to Script Conflict Generator","Text to Script Resolution Writer","Text to Script Backstory Creator","Text to Script Character Arc","Text to Script Emotional Journey","Text to Script Plot Twist","Text to Script Foreshadowing","Text to Script Pacing Tool","Text to Script Tension Builder","Text to Script Comic Relief","Text to Script Romance Scene","Text to Script Fight Choreography","Text to Script Chase Sequence","Text to Script Suspense Creator","Text to Script Horror Elements","Text to Script Sci-Fi World","Text to Script Fantasy Realm","Text to Script Historical Period","Text to Script Contemporary Drama","Text to Script Thriller Plot","Text to Script Mystery Clues","Text to Script Detective Work","Text to Script Court Scene","Text to Script Medical Drama","Text to Script War Scene","Text to Script Western Showdown"],
  Voice: ["Text to Script Voice Actor Director","Text to Script Voice Casting","Text to Script Narration Style","Text to Script Character Voice","Text to Script Accent Coach","Text to Script Emotion Mapper","Text to Script Tone Analyzer","Text to Script Pitch Director","Text to Script Pace Controller","Text to Script Volume Director","Text to Script Emphasis Guide","Text to Script Pause Placement","Text to Script Breath Control","Text to Script Vocal Warmup","Text to Script Voice Range","Text to Script Age Voice","Text to Script Gender Voice","Text to Script Child Voice","Text to Script Elderly Voice","Text to Script Teen Voice","Text to Script Adult Voice","Text to Script Hero Voice","Text to Script Villain Voice","Text to Script Sidekick Voice","Text to Script Mentor Voice","Text to Script Comic Voice","Text to Script Serious Voice","Text to Script Whisper Mode","Text to Script Shout Mode","Text to Script Angry Voice","Text to Script Happy Voice","Text to Script Sad Voice","Text to Script Fearful Voice","Text to Script Excited Voice","Text to Script Calm Voice","Text to Script Nervous Voice","Text to Script Confident Voice","Text to Script Shy Voice","Text to Script Aggressive Voice","Text to Script Gentle Voice","Text to Script Monster Voice","Text to Script Robot Voice","Text to Script Alien Voice","Text to Script Animal Voice","Text to Script Creature Voice","Text to Script God Voice","Text to Script Ghost Voice","Text to Script Echo Effect","Text to Script Reverb Effect","Text to Script Radio Effect"],
  Image: ["Text to Script Image Storyboard","Text to Script Scene Visualization","Text to Script Character Design","Text to Script Location Scout","Text to Script Set Design","Text to Script Costume Concept","Text to Script Prop Design","Text to Script Vehicle Design","Text to Script Weapon Design","Text to Script Creature Design","Text to Script Monster Design","Text to Script Hero Shot","Text to Script Establishing Shot","Text to Script Close-up Frame","Text to Script Wide Shot","Text to Script Medium Shot","Text to Script Over Shoulder","Text to Script POV Shot","Text to Script Aerial View","Text to Script Ground Level","Text to Script Low Angle","Text to Script High Angle","Text to Script Dutch Angle","Text to Script Symmetry Shot","Text to Script Golden Hour","Text to Script Blue Hour","Text to Script Night Scene","Text to Script Day Scene","Text to Script Sunrise Shot","Text to Script Sunset Shot","Text to Script Interior Design","Text to Script Exterior Design","Text to Script Urban Setting","Text to Script Rural Setting","Text to Script Forest Scene","Text to Script Desert Scene","Text to Script Ocean Scene","Text to Script Mountain Scene","Text to Script Space Scene","Text to Script Underwater Scene","Text to Script Cave Scene","Text to Script Castle Scene","Text to Script City Scene","Text to Script Village Scene","Text to Script Battlefield","Text to Script Laboratory","Text to Script Hospital Scene","Text to Script School Scene","Text to Script Office Scene","Text to Script Home Scene"],
  Video: ["Text to Script Video Sequence","Text to Script Opening Credits","Text to Script Title Card","Text to Script Montage Sequence","Text to Script Action Sequence","Text to Script Chase Scene","Text to Script Fight Scene","Text to Script Battle Scene","Text to Script Love Scene","Text to Script Break-up Scene","Text to Script Reunion Scene","Text to Script Death Scene","Text to Script Birth Scene","Text to Script Wedding Scene","Text to Script Funeral Scene","Text to Script Party Scene","Text to Script Dinner Scene","Text to Script Car Scene","Text to Script Train Scene","Text to Script Plane Scene","Text to Script Boat Scene","Text to Script Spaceship Scene","Text to Script Time Lapse","Text to Script Slow Motion","Text to Script Fast Motion","Text to Script Freeze Frame","Text to Script Split Screen","Text to Script Picture in Picture","Text to Script Flashback Transition","Text to Script Dream Transition","Text to Script Wipe Transition","Text to Script Fade Transition","Text to Script Dissolve Transition","Text to Script Cut Transition","Text to Script Match Cut","Text to Script Jump Cut","Text to Script Cross Cut","Text to Script Parallel Edit","Text to Script Montage Edit","Text to Script Rhythmic Edit","Text to Script Emotional Edit","Text to Script Suspense Edit","Text to Script Action Edit","Text to Script Comedy Edit","Text to Script Drama Edit","Text to Script Horror Edit","Text to Script Thriller Edit","Text to Script Romance Edit","Text to Script Sci-Fi Edit","Text to Script Fantasy Edit"],
  Motion: ["Text to Script Camera Movement","Text to Script Pan Left","Text to Script Pan Right","Text to Script Tilt Up","Text to Script Tilt Down","Text to Script Zoom In","Text to Script Zoom Out","Text to Script Dolly In","Text to Script Dolly Out","Text to Script Track Left","Text to Script Track Right","Text to Script Crane Up","Text to Script Crane Down","Text to Script Steadicam Flow","Text to Script Handheld Shake","Text to Script Whip Pan","Text to Script Swish Pan","Text to Script Orbit Shot","Text to Script Arc Shot","Text to Script Boom Movement","Text to Script Jib Movement","Text to Script Drone Flight","Text to Script Aerial Sweep","Text to Script Walk and Talk","Text to Script Follow Shot","Text to Script Leading Shot","Text to Script Reveal Shot","Text to Script Push In","Text to Script Pull Out","Text to Script Circular Move","Text to Script Figure Eight","Text to Script Spiral Motion","Text to Script Vertigo Effect","Text to Script Crash Zoom","Text to Script Speed Ramp","Text to Script Time Freeze","Text to Script Bullet Time","Text to Script 360 Rotation","Text to Script First Person POV","Text to Script God's Eye View","Text to Script Worm's Eye View","Text to Script Bird's Eye View","Text to Script Dutch Roll","Text to Script Parallax Effect","Text to Script Smooth Glide","Text to Script Sudden Stop","Text to Script Acceleration","Text to Script Deceleration","Text to Script Momentum Shift","Text to Script Dynamic Follow"],
  Advanced: ["Text to Script Cinematic Grading","Text to Script Color Palette","Text to Script LUT Application","Text to Script Film Look","Text to Script Digital Look","Text to Script Vintage Look","Text to Script Modern Look","Text to Script Noir Style","Text to Script Technicolor Style","Text to Script Bleach Bypass","Text to Script Cross Process","Text to Script Day for Night","Text to Script Night Vision","Text to Script Thermal Vision","Text to Script X-Ray Effect","Text to Script Split Tone","Text to Script Selective Color","Text to Script Color Pop","Text to Script Monochrome","Text to Script Sepia Tone","Text to Script Desaturation","Text to Script Oversaturation","Text to Script Contrast Boost","Text to Script Shadow Recovery","Text to Script Highlight Rolloff","Text to Script HDR Effect","Text to Script Bloom Effect","Text to Script Glow Effect","Text to Script Lens Flare","Text to Script Light Rays","Text to Script God Rays","Text to Script Volumetric Light","Text to Script Atmospheric Haze","Text to Script Fog Effect","Text to Script Mist Effect","Text to Script Smoke Effect","Text to Script Fire Effect","Text to Script Water Effect","Text to Script Rain Effect","Text to Script Snow Effect","Text to Script Lightning Effect","Text to Script Explosion Effect","Text to Script Particle System","Text to Script Motion Blur","Text to Script Depth of Field","Text to Script Bokeh Effect","Text to Script Vignette Effect","Text to Script Film Grain","Text to Script Digital Noise","Text to Script Glitch Effect"]
};

const ENHANCEMENT_TOOLS = ["AI 8K Upscaling","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro","Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery","Highlight Rolloff","Skin Tone Uniformity","Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence","De-Banding Pro","Moire Removal","Color Space Transform","Anamorphic Stretch","Flicker Reduction","Low Light Clarity","Texture Enhancement","Micro-Contrast Adjust","Vignette Pro","Film Stock Emulation","Glow Synthesis","Edge Refinement","Smart Saturation","Tone Mapping Pro","Gamma Correction","Black Point Calibration","White Balance AI","Color Match Pro","Temporal Denoise","Digital Intermediate","Chromatic Correction","Film Grain Advanced","Halation Effect","Bloom Control","Light Wrap"];

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolSearch, setToolSearch] = useState('');
  const [duration, setDuration] = useState(90);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedEnhancement, setSelectedEnhancement] = useState(null);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [timeline, setTimeline] = useState({ video: [], audio: [], text: [] });
  const [draggedItem, setDraggedItem] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [audioLevels, setAudioLevels] = useState({ music: 75, voice: 50, sfx: 65, master: 80 });
  const [enhancementSettings, setEnhancementSettings] = useState({ intensity: 75, clarity: 75, color: 75, brightness: 75 });
  const [exportSettings, setExportSettings] = useState({ quality: '8K', format: 'MP4' });
  const [communityPosts, setCommunityPosts] = useState([
    {id:1,title:'Epic Action Movie',user:'Sarah J.',emoji:'🎬',likes:2847,loves:1923,comments:[]},
    {id:2,title:'Family Vacation',user:'Mike Chen',emoji:'✈️',likes:1256,loves:892,comments:[]},
    {id:3,title:'First Documentary',user:'Emily R.',emoji:'📹',likes:3421,loves:2156,comments:[]},
    {id:4,title:'Music Video',user:'Alex T.',emoji:'🎵',likes:5234,loves:4012,comments:[]}
  ]);
  const [newComment, setNewComment] = useState({});
  
  const fileInputRef = useRef(null);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaLibrary(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
          size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
          url: event.target.result,
          timestamp: new Date().toISOString()
        }]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const newAsset = {
        id: Date.now(),
        name: `AI-${selectedTool.replace(/\s+/g,'-').toLowerCase()}-${Date.now()}.mp4`,
        type: 'video',
        size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
        url: `data:video/mp4;base64,SIMULATED_AI_GENERATED_CONTENT`,
        aiGenerated: true,
        prompt: aiPrompt,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, newAsset]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
    }, 2000);
  }, [aiPrompt, selectedTool]);

  const handleDrop = useCallback((track) => {
    if (!draggedItem) return;
    setTimeline(prev => ({
      ...prev,
      [track]: [...prev[track], { ...draggedItem, trackPosition: Date.now() }]
    }));
    setDraggedItem(null);
  }, [draggedItem]);

  const removeFromTimeline = useCallback((track, index) => {
    setTimeline(prev => ({
      ...prev,
      [track]: prev[track].filter((_, i) => i !== index)
    }));
  }, []);

  const deleteFromLibrary = useCallback((id) => {
    setMediaLibrary(prev => prev.filter(item => item.id !== id));
  }, []);

  const applyEnhancement = useCallback(() => {
    const enhancedAsset = {
      id: Date.now(),
      name: `enhanced-${selectedEnhancement.toLowerCase().replace(/\s+/g,'-')}-${Date.now()}.mp4`,
      type: 'video',
      size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
      url: `data:video/mp4;base64,ENHANCED_CONTENT`,
      enhanced: true,
      enhancement: selectedEnhancement,
      settings: { ...enhancementSettings },
      timestamp: new Date().toISOString()
    };
    setMediaLibrary(prev => [...prev, enhancedAsset]);
    setSelectedEnhancement(null);
  }, [selectedEnhancement, enhancementSettings]);

  const handleRender = useCallback(() => {
    setRendering(true);
    setRenderProgress(0);
    
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const renderedVideo = {
              id: Date.now(),
              name: `final-render-${Date.now()}.${exportSettings.format.toLowerCase()}`,
              type: 'video',
              size: (Math.random() * 1000 + 500).toFixed(2) + 'MB',
              url: `data:video/${exportSettings.format.toLowerCase()};base64,RENDERED_CONTENT`,
              rendered: true,
              quality: exportSettings.quality,
              format: exportSettings.format,
              duration: duration,
              timestamp: new Date().toISOString()
            };
            setMediaLibrary(prev => [...prev, renderedVideo]);
            setCurrentVideo(renderedVideo);
            setRendering(false);
            setRenderProgress(0);
            setPage(16);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  }, [duration, exportSettings]);

  const handleDownload = useCallback((asset) => {
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    link.click();
  }, []);

  const handleLike = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  }, []);

  const handleLove = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, loves: post.loves + 1 } : post
    ));
  }, []);

  const handleComment = useCallback((postId) => {
    const comment = newComment[postId];
    if (!comment || !comment.trim()) return;
    
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { 
        ...post, 
        comments: [...(post.comments || []), { 
          id: Date.now(), 
          text: comment, 
          user: 'You', 
          timestamp: new Date().toISOString() 
        }] 
      } : post
    ));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  }, [newComment]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      
      <style>{`
        .scrollbar::-webkit-scrollbar{width:8px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
      `}</style>

      <input 
        ref={fileInputRef}
        type="file" 
        multiple 
        accept="video/*,audio/*,image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {page > 0 && (
        <div className="fixed top-6 left-6 z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-[#7c3aed] p-4 rounded-full shadow-2xl hover:scale-110 transition">
            <Menu size={28}/>
          </button>
          {menuOpen && (
            <div className="absolute top-20 left-0 bg-zinc-950 border border-[#7c3aed] p-6 rounded-2xl w-72 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar">
              <h3 className="text-lg font-black uppercase mb-4 text-[#7c3aed]">Quick Access</h3>
              {[
                {p:1,l:"Home"},{p:2,l:"Welcome"},{p:3,l:"Login/Pricing"},{p:4,l:"Writing Tools"},{p:5,l:"Voice Tools"},
                {p:6,l:"Image Tools"},{p:7,l:"Video Tools"},{p:8,l:"Motion Tools"},{p:10,l:"Upload Media"},
                {p:11,l:"Editor Suite"},{p:12,l:"Timeline & Library"},{p:13,l:"Enhancement"},{p:14,l:"Audio Mixer"},
                {p:15,l:"Preview"},{p:16,l:"Export"},{p:17,l:"Tutorials"},{p:18,l:"Terms"},{p:19,l:"Agent Grok"},
                {p:20,l:"Community"},{p:21,l:"Thank You"}
              ].map(i => (
                <button key={i.p} onClick={() => {setPage(i.p);setMenuOpen(false);}} className="w-full text-left text-sm font-bold uppercase text-white p-3 hover:bg-[#7c3aed] rounded-lg transition">
                  {i.l}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {page >= 1 && page !== 19 && (
        <button onClick={() => setPage(19)} className="fixed bottom-6 right-6 z-50 bg-[#7c3aed] w-16 h-16 rounded-full flex items-center justify-center text-4xl font-black shadow-2xl hover:scale-110 transition border-2 border-[#a78bfa]">G</button>
      )}

      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2.5 text-center z-40 border-t border-[#7c3aed]/20">
          <p className="text-xs uppercase font-black text-white/80">MandaStrong Studio 2025 • MandaStrong1.Etsy.com</p>
        </div>
      )}

      {page > 1 && page < 21 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-6">
          <button onClick={() => setPage(page-1)} className="bg-zinc-950 border border-[#7c3aed] px-10 py-2.5 rounded-full font-black uppercase text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition text-xs flex items-center gap-2">
            <ChevronLeft size={16}/> BACK
          </button>
          <button onClick={() => setPage(page+1)} className="bg-[#7c3aed] px-10 py-2.5 rounded-full font-black uppercase text-white hover:bg-[#6d28d9] transition text-xs flex items-center gap-2">
            NEXT <ChevronRight size={16}/>
          </button>
        </div>
      )}

      <main className="min-h-screen pb-32">
        
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6">
            <Sparkles size={64} className="text-[#7c3aed] mb-8 animate-pulse"/>
            <h1 className="text-7xl md:text-9xl font-black text-[#7c3aed] uppercase mb-6">MANDASTRONG STUDIO</h1>
            <p className="text-xl md:text-2xl font-bold text-[#7c3aed] max-w-3xl mb-16">Welcome To The All In One Make Your Own Longer Movies App!</p>
            <button onClick={() => setPage(2)} className="bg-[#7c3aed] text-white px-16 py-4 rounded-full font-black uppercase text-xl hover:scale-105 transition shadow-2xl">START CREATING</button>
          </div>
        )}

        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-4">
            <Sparkles size={64} className="text-[#7c3aed] mb-6"/>
            <h1 className="text-5xl md:text-8xl font-black text-[#7c3aed] uppercase mb-6">MANDASTRONG STUDIO</h1>
            <p className="text-2xl md:text-4xl font-bold text-[#7c3aed] italic uppercase max-w-5xl">WELCOME! MAKE AWESOME FAMILY MOVIES OR TURN YOUR DREAMS INTO REALITY. ENJOY!</p>
          </div>
        )}

        {page === 3 && (
          <div className="p-6 pt-16 pb-40 max-w-7xl mx-auto overflow-y-auto scrollbar">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Login</h3>
                <input type="email" placeholder="your@email.com" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="password" placeholder="••••••••" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">Login & Start</button>
              </div>
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Register</h3>
                <input type="text" placeholder="Your Name" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="email" placeholder="your@email.com" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">Create Account</button>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black text-center mb-12 uppercase text-white">Choose Your Plan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {t:'Basic',p:'20',s:'https://buy.stripe.com/test_basic',f:['HD Export (1080p)','100 AI Tools','10GB Storage','Email Support']},
                  {t:'Pro',p:'30',s:'https://buy.stripe.com/test_pro',f:['4K Export (2160p)','300 AI Tools','100GB Storage','Priority Support','Commercial License']},
                  {t:'Studio',p:'50',s:'https://buy.stripe.com/test_studio',f:['8K Export (4320p)','600 AI Tools','1TB Storage','24/7 Support','Full Rights','API Access']}
                ].map(plan => (
                  <div key={plan.t} className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-3xl p-8 hover:border-[#7c3aed] transition">
                    <h3 className="text-2xl font-black uppercase mb-2 text-white">{plan.t}</h3>
                    <div className="text-5xl font-black text-[#7c3aed] mb-8">${plan.p}<span className="text-sm opacity-50">/mo</span></div>
                    <ul className="space-y-3 mb-10">
                      {plan.f.map(f => <li key={f} className="text-sm font-semibold flex items-start gap-2 text-white"><CheckCircle size={16} className="text-[#7c3aed] flex-shrink-0 mt-0.5"/> {f}</li>)}
                    </ul>
                    <a href={plan.s} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#7c3aed] text-center rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">SUBSCRIBE NOW</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(page >= 4 && page <= 9) && (() => {
          const boards = ["Writing","Voice","Image","Video","Motion","Advanced"];
          const allTools = AI_TOOLS[boards[page-4]] || [];
          const tools = toolSearch ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
          return (
            <div className="h-screen flex flex-col pt-20 pb-40">
              <h2 className="text-5xl font-black uppercase text-[#7c3aed] text-center mb-6">AI TOOL BOARD</h2>
              
              <div className="px-8 mb-6">
                <div className="relative max-w-xl">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                  <input 
                    value={toolSearch} 
                    onChange={e => setToolSearch(e.target.value)} 
                    placeholder="🔍 Search Tools..." 
                    className="w-full bg-zinc-900 border-2 border-[#7c3aed] pl-12 pr-10 py-4 rounded-xl text-white outline-none text-lg font-bold"
                  />
                  {toolSearch && <button onClick={() => setToolSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"><X size={20}/></button>}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-8 scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
                  {tools.map((tool,i) => (
                    <button key={i} onClick={() => setSelectedTool(tool)} className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl hover:bg-[#7c3aed]/10 transition group">
                      <Sparkles size={18} className="text-[#7c3aed] mb-2 group-hover:animate-spin"/>
                      <span className="text-sm font-bold uppercase text-white">{tool}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {selectedTool && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black uppercase text-white">{selectedTool}</h2>
                <button onClick={() => {setSelectedTool(null);setAiPrompt('');}} className="text-white hover:text-red-500 transition"><X size={32}/></button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button onClick={() => fileInputRef.current?.click()} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                  <Upload size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">UPLOAD</p>
                </button>

                <button onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text.startsWith('data:') || text.startsWith('http')) {
                      setMediaLibrary(prev => [...prev, {
                        id: Date.now(),
                        name: `pasted-${Date.now()}.mp4`,
                        type: 'video',
                        size: '0 MB',
                        url: text,
                        timestamp: new Date().toISOString()
                      }]);
                      setSelectedTool(null);
                    } else alert('📋 Paste a valid URL');
                  } catch {
                    alert('❌ Clipboard access denied');
                  }
                }} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                  <Layers size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">PASTE</p>
                </button>

                <div className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center">
                  <Sparkles size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">GENERATE</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-black border border-[#7c3aed]/30 rounded-xl p-6">
                  <h3 className="font-bold mb-4 text-white flex items-center gap-2">
                    <Sparkles size={20} className="text-[#7c3aed]"/>
                    Generate With AI
                  </h3>
                  <textarea 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe what you want to create..." 
                    className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-lg text-white h-24 outline-none resize-none"
                  />
                </div>
                <button 
                  onClick={handleAIGenerate}
                  disabled={!aiPrompt.trim() || generating}
                  className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {generating ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"/>
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Zap size={24}/>
                      GENERATE & SAVE TO LIBRARY
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-zinc-500">Assets automatically save to Media Library</p>
              </div>
            </div>
          </div>
        )}

        {page === 21 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <div className="max-w-6xl mx-auto">
              
              <div className="mb-16">
                <video autoPlay loop muted playsInline className="w-full rounded-3xl border-4 border-[#7c3aed] shadow-2xl">
                  <source src="/ThatsAllFolks.MP4" type="video/mp4"/>
                </video>
              </div>

              <h1 className="text-9xl font-black text-[#7c3aed] uppercase text-center mb-16 leading-none">THAT'S ALL FOLKS!</h1>

              <div className="flex gap-8 justify-center">
                <button onClick={() => setPage(1)} className="px-20 py-8 bg-white text-black rounded-full font-black uppercase text-3xl hover:scale-105 transition shadow-2xl">
                  🏠 HOME
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
