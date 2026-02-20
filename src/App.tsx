import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Settings, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search } from 'lucide-react';

const AI_TOOLS = {
  Writing: ["Dialogue Writer","Plot Generator","Scene Writer","Story Outliner","Character Developer","Script Formatter","Three Act Builder","Backstory Generator","Theme Generator","Plot Twist Creator","Scene Analyzer","World Builder","Subplot Generator","Character Voice","Pacing Analyzer","Opening Hook","Climax Designer","Character Mapper","Flashback Creator","Foreshadowing Tool","Beat Sheet","Story Structure","Character Arc","Plot Device","Narrative Flow","Story Consultant","Character Interview","Scene Setting","Emotional Arc","Story Question","Character Flaw","Story Goal","Inciting Incident","Midpoint Tool","Dark Night","Growth Tracker","Tag Optimizer","Action Line","Scene Heading","Parenthetical","Script Timer","Format Checker","Name Generator","Location Database","Prop List","Costume Designer","Scene Number","Page Counter","Reading Timer","Coverage Writer","Logline Generator","Synopsis Writer","Treatment Format","Pitch Deck","Character Bio","World Bible","Magic System","Tech Inventor","Culture Creator","Language Builder","Religion Designer","Government Tool","Economy Builder","Geography Map","History Timeline","Mythology","Legend Writer","Prophecy","Quest Designer","MacGuffin","Plot Hole Detector","Continuity Check","Character Check","Timeline Validator","Research Helper","Fact Checker","Trope Finder","Cliche Detector","Originality Score","Genre Analyzer","Tone Checker","Voice Tool","POV Analyzer","Tense Checker","Grammar Polish","Spell Check","Readability","Engagement Meter","Pacing Visual","Story Arc Map","Network Graph","Distribution Chart","Word Counter","Goal Setter","Sprint Timer","Dashboard","Collab Hub","Version Control","Comment System","Revision Track","Export Manager","PDF Generator","Screenplay Format","Novel Format","Stage Format","TV Format","Comic Script","Audio Drama","Interactive Fiction","Game Narrative","Branching Story"],
  Voice: ["Voice Maker","Voice Cloner","Voice Creator","Voice Recorder","Speech Converter","Voice Builder","Voice Generator","Premium Voice","Emotion Voice","Natural Voice","Narrator","Voice Imitator","Accent Generator","Pitch Controller","Tone Adjuster","Lip Sync","Voice Coach","Audiobook","Commercial Voice","Trailer Voice","Documentary","News Anchor","Radio DJ","Sports Cast","Game Show","Meditation","Hypnosis","ASMR Creator","Whisper Gen","Shout Creator","Scream Gen","Laugh Creator","Cry Gen","Sigh Creator","Gasp Gen","Cough Creator","Throat Clear","Warm-up Tool","Range Finder","Pitch Train","Articulation","Diction Drill","Health Monitor","Strain Detect","Rest Reminder","Hydration","Posture Guide","Breathing","Vocal Workout","Range Expand","Stamina Build","Endurance Train","Quality Enhance","Clarity Boost","Richness Amp","Warmth Add","Brightness","Darkness Mix","Raspy Tool","Smooth Filter","Texture Design","Timbre Mod","Resonance Tune","Projection","Volume Expand","Dynamic Range","Compression","EQ Voice","De-esser","Pop Filter","Noise Gate","Reverb Voice","Echo Voice","Delay Voice","Chorus FX","Flanger FX","Phaser FX","Distortion","Bitcrush","Lo-fi Voice","Radio Effect","Phone Effect","Megaphone","Robot Voice","Alien Voice","Monster Voice","Demon Voice","Angel Voice","Chipmunk","Deep Voice","High Voice","Child Voice","Elderly Voice","Speed Modifier","Volume Normal","Breath Control","Pause Insert","Emphasis Tool","Inflection","Pronunciation","Mouth Shape","Emotion Mixer","Mood Select","Voice Bank","Profile Saver","Multi-Voice","Dialogue Mix","Conversation","Interview","Podcast Voice"],
  Image: ["Image Generator","Asset Architect","Texture Mapper","VFX Synthesis","Matte Logic","Color Palette","Background Gen","Character Design","Lighting Designer","Scene Composite","Photo Enhance","Image Upscale","Style Transfer","Text to Image","Color Grading","Tone Mapper","Film Grain","Bokeh Gen","Sky Replace","Cloud Gen","Prop Creator","Depth Map","Normal Map","Albedo Map","Roughness Map","Metallic Map","Emission Map","Ambient Occlude","Shadow Gen","Highlight","Rim Light","Fill Light","Key Light","3-Point Light","Studio Light","Natural Light","Golden Hour","Blue Hour","Night Scene","Day Scene","Sunrise FX","Sunset FX","Moonlight","Starlight","Fire Light","Candle Light","Neon Light","LED Effect","LUT Creator","Contrast Adjust","Brightness","Saturation","Hue Shift","Temperature","Tint Control","Exposure Fix","HDR Merge","Panorama Stitch","360 Image","Fisheye Fix","Lens Distort","Chromatic Aberr","Vignette","Noise Add","Scratch Add","Dust Particles","Light Leaks","Depth Field","Motion Blur","Radial Blur","Zoom Blur","Gaussian Blur","Smart Blur","Sharpen","Edge Enhance","Detail Boost","Clarity","Structure","Dehaze","Weather FX","Rain Creator","Snow Effect","Fog Gen","Mist Tool","Haze Creator","Smoke FX","Steam Gen","Fire Creator","Explosion","Spark Gen","Lightning","Aurora FX","Rainbow","Lens Flare","God Rays","Volumetric","Caustics"],
  Video: ["Motion Video Maker","Video Creator","Avatar Generator","Video Synthesizer","Video Studio","Image to Motion","Dynamic Pan","Tilt Shot","Tracking Shot","Crane Movement","Steadycam","Shot Transition","Close-up","Wide Shot","POV Shot","Zoom In","Dolly In","Time Lapse","Slow Motion","Speed Ramp","Flow Gen","Video Craft","Style Tool","Temporal Flow","Frame Blend","Track Shot","Crane Move","Handheld FX","Shot Transit","Establish Shot","Medium Shot","Over Shoulder","Dutch Angle","Whip Pan","Swish Pan","Zoom Out","Dolly Out","Truck Left","Truck Right","Pedestal Up","Pedestal Down","Arc Shot","Orbit Shot","Boom Up","Boom Down","Jib Shot","Drone Shot","Aerial View","Birds Eye","Ground Level","Low Angle","High Angle","Eye Level","Worms Eye","Canted Frame","Symmetry","Rule Thirds","Golden Ratio","Leading Lines","Frame Frame","Negative Space","Depth Layers"],
  Motion: ["Motion Tracker","Mocap Logic","Physics Engine","Cloth Dynamics","Skeleton Animator","Facial Rigging","Body Movement","Camera Tracker","Particle System","Fluid Dynamics","Spring System","Keyframe Tool","Graph Editor","Timeline Editor","Ease In","Ease Out","Bounce Effect","Elastic Motion","Anticipation","Follow Through","Tracker Pro","Object Physics","Gravity Sim","Collision Detect","Soft Body","Rigid Body","Particle Sys","Fluid Dynamic","Smoke Sim","Fire Dynamic","Water Physics","Wind Effect","Force Field","Turbulence","Vortex","Attraction","Repulsion","Gravity Well","Rope Physics","Chain Dynamic","Hair Sim","Fur Dynamic","Cloth Drape","Flag Wave","Curtain Motion","Dress Physics","Cape Sim","Muscle Sys","Skin Deform"]
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
          const boards = ["Writing","Voice","Image","Video","Motion","Image"];
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
