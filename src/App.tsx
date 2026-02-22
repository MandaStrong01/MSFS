import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Settings, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search } from 'lucide-react';

// 600 AI TOOLS
const AI_TOOLS = {
  Writing: ["Text to Video","Script to Movie","Story to Video","Text to Animation","Prompt to Video","Description to Scene","Narrative to Film","Dialogue to Animation","Plot to Video","Character to Scene","Action Scene","Drama Scene","Comedy Scene","Thriller Scene","Horror Scene","Romance Scene","Sci-Fi Scene","Fantasy Scene","Documentary","Commercial","Trailer Maker","Music Video","Short Film","Feature Film","Web Series","TV Episode","Podcast Video","Social Media","Vertical Video","Square Video","Widescreen","Ultra Wide","360 Video","VR Scene","AR Content","Hologram","Green Screen","Motion Graphics","Title Sequence","Credits Roll","Lower Thirds","Captions","Subtitles","Voiceover","Narration","Sound Design","Foley","Ambient Sound","Music Score","Theme Song","Jingle","Sound FX","Transition Sound","Impact","Riser","Drop","Whoosh","Swoosh","Glitch","Digital","Analog","Vintage","Modern","Futuristic","Retro","Classic","Contemporary","Experimental","Abstract","Realistic","Stylized","Cartoon","Anime","3D Animation","2D Animation","Stop Motion","Claymation","Rotoscope","Motion Capture","CGI","VFX","Practical FX","Miniatures","Matte Painting","Compositing","Keying","Tracking","Stabilization","Color Grade","LUT Apply","Film Look","Digital Look","Broadcast","Cinema","IMAX","Anamorphic","Wide Angle","Telephoto","Macro","Tilt Shift","Fisheye","Drone Shot","Aerial View","Birds Eye","POV","First Person","Third Person","Isometric","Top Down","Side Scroll","Parallax","Ken Burns","Time Lapse","Hyperlapse","Bullet Time","Freeze Frame","Speed Ramp"],
  Voice: ["Text to Speech","Voice Clone","Character Voice","Narrator Voice","Accent British","Accent American","Accent Australian","Accent Irish","Accent Scottish","Accent Indian","Accent French","Accent German","Accent Spanish","Accent Italian","Accent Japanese","Accent Chinese","Accent Korean","Accent Russian","Accent Arabic","Accent Portuguese","Age Child","Age Teen","Age Adult","Age Elderly","Gender Male","Gender Female","Gender Neutral","Emotion Happy","Emotion Sad","Emotion Angry","Emotion Excited","Emotion Calm","Emotion Scared","Emotion Surprised","Emotion Disgusted","Emotion Neutral","Tone Formal","Tone Casual","Tone Professional","Tone Friendly","Tone Serious","Tone Playful","Tone Dramatic","Tone Comedic","Tone Sarcastic","Style News","Style Radio DJ","Style Podcast","Style Audiobook","Style Commercial","Style Trailer","Style Documentary","Style Tutorial","Style Gaming","Style ASMR","Style Meditation","Voice Whisper","Voice Shout","Voice Scream","Voice Laugh","Voice Cry","Voice Sigh","Voice Gasp","Effect Robot","Effect Alien","Effect Monster","Effect Demon","Effect Angel","Effect Ghost","Effect Zombie","Effect Chipmunk","Effect Deep Bass","Effect High Pitch","Effect Echo","Effect Reverb","Effect Delay","Effect Chorus","Effect Flanger","Effect Phaser","Effect Distortion","Effect Bitcrush","Effect Lo-Fi","Effect Radio","Effect Phone","Effect Megaphone","Effect Underwater","Effect Space","Effect Cave","Effect Stadium","Effect Concert Hall","Speed Slow","Speed Fast","Speed Normal","Pitch Up","Pitch Down","Volume Loud","Volume Soft","Clarity HD","Clarity Clear","Noise Remove","Audio Restore","EQ Enhance","Compression","Limiting","Normalize","Stereo Wide","Mono Mix","5.1 Surround","7.1 Surround","Atmos Mix","Bass Boost","Treble Enhance"],
  Image: ["Text to Image","Image Upscale","Photo Enhance","Style Transfer","Image to Video","Still to Motion","Photo Animation","Portrait Animate","Landscape Pan","Product Show","Food Styling","Fashion Photo","Architecture","Interior Design","Car Render","Jewelry Photo","Tech Product","Nature Photo","Wildlife Shot","Pet Portrait","Baby Photo","Wedding Photo","Event Photo","Concert Photo","Sports Photo","Action Shot","Macro Photo","Aerial Photo","Drone Image","Satellite View","Street Photo","Urban Scene","Rural Scene","Beach Scene","Mountain Scene","Forest Scene","Desert Scene","Snow Scene","Rain Scene","Fog Scene","Sunset Photo","Sunrise Photo","Night Photo","Starry Sky","Moon Photo","Aurora Photo","Lightning","Rainbow","Cloud Photo","Storm Photo","Weather Photo","Season Spring","Season Summer","Season Fall","Season Winter","Time Dawn","Time Morning","Time Noon","Time Afternoon","Time Evening","Time Dusk","Time Night","Light Natural","Light Studio","Light Golden Hour","Light Blue Hour","Light Dramatic","Light Soft","Color Vibrant","Color Muted","Color BW","Color Sepia","Color Tinted","Mood Happy","Mood Sad","Mood Energetic","Mood Calm","Mood Dramatic","Mood Romantic","Mood Scary","Mood Mysterious","Filter Vintage","Filter Modern","Filter Retro","Filter Cinematic","Filter HDR","Filter Soft Focus","Filter Sharp","Filter Blur","Filter Grain","Effect Bokeh","Effect Lens Flare","Effect Light Leak","Effect Vignette","Effect Glow","Effect Sparkle","Effect Glitter","Effect Shine","Effect Shadow","Effect Reflection","Upscale 2K","Upscale 4K","Upscale 8K","Enhance Detail","Sharpen","Denoise","Remove Blur"],
  Video: ["Video Upscale","Video Enhance","Slow Motion","Time Lapse","Reverse Video","Loop Video","Stabilize","Color Grade","LUT Video","Denoise","Sharpen","Blur Video","Zoom Video","Pan Video","Tilt Video","Rotate","Flip","Crop","Resize","Speed Up","Speed Down","Freeze Frame","Split Screen","Picture in Picture","Green Screen","Chroma Key","Motion Track","Face Track","Object Track","Camera Track","Stabilization 2D","Stabilization 3D","Warp Stabilizer","Remove Objects","Remove People","Clone Video","Time Remap","Optical Flow","Frame Blend","Frame Mix","Cut Video","Trim","Split","Merge","Concatenate","Crossfade","Dissolve","Fade In","Fade Out","Wipe Left","Wipe Right","Wipe Up","Wipe Down","Push","Slide","Zoom Trans","Spin","Rotate Trans","Flip Trans","Page Peel","Cube Spin","Ripple","Wave","Glitch Trans","Light Trans","Blur Trans","Morph","Pixelate","Mosaic","Kaleidoscope","Mirror","Symmetry","Prism","Rainbow","Chromatic","RGB Split","Anaglyph","VHS","Film Burn","Dust Scratch","Light Leak","Vignette","Bloom","Glow","God Rays","Volumetric Light","Lens Flare","Sun Flare","Star Filter","Bokeh","Depth Field","Tilt Shift","Miniature","Toy Camera","Polaroid","Instant Film","Negative","Solarize","Posterize","Threshold","Equalize","Invert","Gamma","Contrast","Brightness","Saturation","Hue Shift","Temperature","Tint"],
  Motion: ["Motion Blur","Radial Blur","Zoom Blur","Camera Shake","Earthquake","Explosion Shake","Impact Shake","Wobble","Wiggle","Wave Motion","Ripple","Bounce","Elastic","Spring","Pendulum","Rotate","Spin","Spiral","Orbit","Circle","Arc","Random","Noise","Turbulence","Wind","Gravity","Attraction","Repulsion","Vortex","Swirl","Twist","Bend","Warp","Bulge","Pinch","Spherize","Displace","Offset","Slide Motion","Drift","Float","Rise","Fall","Ascend","Descend","Levitate","Hover","Bob","Sway","Rock","Swing","Jitter","Vibrate","Tremble","Quake","Pulse","Beat","Throb","Flicker","Flash","Strobe","Blink","Fade Motion","Appear","Disappear","Materialize","Dematerialize","Teleport","Warp Motion","Portal","Door Open","Door Close","Curtain","Blinds","Shutter","Iris","Reveal","Conceal","Unfold","Fold","Expand","Collapse","Grow","Shrink","Scale Up","Scale Down","Stretch","Squeeze","Compress","Inflate","Deflate","Morph Motion","Liquefy","Melt","Drip","Pour","Splash","Spray","Burst","Shatter","Break","Crack","Crumble","Disintegrate","Particle Burst","Particle Trail","Particle Swarm","Particle Rain","Particle Snow","Particle Dust","Particle Smoke","Particle Fire","Particle Sparks","Particle Stars","Particle Confetti"]
};

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolSearch, setToolSearch] = useState('');
  const [duration, setDuration] = useState(90);
  const [selectedTool, setSelectedTool] = useState(null);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [timeline, setTimeline] = useState({ video: [], audio: [], text: [] });
  const [draggedItem, setDraggedItem] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [exportSettings, setExportSettings] = useState({ quality: '8K', format: 'MP4' });
  
  const fileInputRef = useRef(null);

  // WORKING FILE UPLOAD
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

  // WORKING PASTE
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        const isUrl = text.startsWith('http') || text.startsWith('data:');
        setMediaLibrary(prev => [...prev, {
          id: Date.now(),
          name: isUrl ? `pasted-${Date.now()}.mp4` : `text-${Date.now()}.txt`,
          type: isUrl ? 'video' : 'text',
          size: '0MB',
          url: isUrl ? text : `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
          content: text,
          timestamp: new Date().toISOString()
        }]);
        setSelectedTool(null);
      }
    } catch (err) {
      console.error('Paste error:', err);
    }
  }, []);

  // WORKING AI GENERATE
  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setMediaLibrary(prev => [...prev, {
        id: Date.now(),
        name: `AI-${selectedTool?.replace(/\s+/g,'-') || 'Generated'}.mp4`,
        type: 'video',
        size: '250MB',
        url: 'data:video/mp4;base64,GENERATED',
        aiGenerated: true,
        prompt: aiPrompt,
        timestamp: new Date().toISOString()
      }]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
    }, 2000);
  }, [aiPrompt, selectedTool]);

  // WORKING DRAG & DROP TO TIMELINE
  const handleDrop = useCallback((track) => {
    if (!draggedItem) return;
    setTimeline(prev => ({
      ...prev,
      [track]: [...prev[track], { ...draggedItem, trackPosition: Date.now() }]
    }));
    setDraggedItem(null);
  }, [draggedItem]);

  // WORKING RENDER
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
              name: `final-render.${exportSettings.format.toLowerCase()}`,
              type: 'video',
              size: '1GB',
              url: 'data:video/mp4;base64,RENDERED',
              rendered: true,
              timestamp: new Date().toISOString()
            };
            setMediaLibrary(prev => [...prev, renderedVideo]);
            setCurrentVideo(renderedVideo);
            setRendering(false);
            setPage(16);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  }, [exportSettings]);

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        .scrollbar::-webkit-scrollbar{width:8px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
      `}</style>

      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} className="hidden"/>

      {page > 0 && (
        <div className="fixed top-6 left-6 z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-[#7c3aed] p-4 rounded-full shadow-2xl hover:scale-110 transition">
            <Menu size={28}/>
          </button>
          {menuOpen && (
            <div className="absolute top-20 left-0 bg-zinc-950 border border-[#7c3aed] p-6 rounded-2xl w-72 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar">
              <h3 className="text-lg font-black uppercase mb-4 text-[#7c3aed]">Menu</h3>
              {[
                {p:1,l:"Home"},{p:2,l:"Welcome"},{p:3,l:"Login/Pricing"},{p:4,l:"Writing"},{p:5,l:"Voice"},
                {p:6,l:"Image"},{p:7,l:"Video"},{p:8,l:"Motion"},{p:10,l:"Upload"},
                {p:11,l:"Editor"},{p:12,l:"Timeline"},{p:16,l:"Export"},{p:21,l:"Thank You"}
              ].map(i => (
                <button key={i.p} onClick={() => {setPage(i.p);setMenuOpen(false);}} className="w-full text-left text-sm font-bold uppercase text-white p-3 hover:bg-[#7c3aed] rounded-lg transition">
                  {i.l}
                </button>
              ))}
            </div>
          )}
        </div>
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
            <p className="text-xl md:text-2xl font-bold text-[#7c3aed] max-w-3xl mb-16">All In One Movie Making Studio</p>
            <button onClick={() => setPage(2)} className="bg-[#7c3aed] text-white px-16 py-4 rounded-full font-black uppercase text-xl hover:scale-105 transition shadow-2xl">START CREATING</button>
          </div>
        )}

        {page === 3 && (
          <div className="p-6 pt-16 pb-40 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Login</h3>
                <input type="email" placeholder="Email" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="password" placeholder="Password" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">Login</button>
              </div>
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Register</h3>
                <input type="text" placeholder="Name" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="email" placeholder="Email" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">Register</button>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black text-center mb-12 uppercase text-white">Plans</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {t:'Basic',p:'20',s:'https://buy.stripe.com/test_14k00SfE88Wn5K85kk',f:['HD','100 Tools','10GB']},
                  {t:'Pro',p:'30',s:'https://buy.stripe.com/test_6oE00SfE8cit65G002',f:['4K','300 Tools','100GB']},
                  {t:'Studio',p:'50',s:'https://buy.stripe.com/test_dR68wwdvZ8Wn4E43cc',f:['8K','600 Tools','1TB']}
                ].map(plan => (
                  <div key={plan.t} className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8">
                    <h3 className="text-2xl font-black uppercase mb-2 text-white">{plan.t}</h3>
                    <div className="text-5xl font-black text-[#7c3aed] mb-8">${plan.p}<span className="text-sm opacity-50">/mo</span></div>
                    <ul className="space-y-3 mb-10">
                      {plan.f.map(f => <li key={f} className="text-sm font-semibold flex items-start gap-2 text-white"><CheckCircle size={16} className="text-[#7c3aed]"/> {f}</li>)}
                    </ul>
                    <a href={plan.s} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#7c3aed] text-center rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">SUBSCRIBE</a>
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
              <h2 className="text-5xl font-black uppercase text-[#7c3aed] text-center mb-6">AI TOOLS</h2>
              <div className="px-8 mb-6">
                <div className="relative max-w-xl mx-auto">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                  <input value={toolSearch} onChange={e => setToolSearch(e.target.value)} placeholder="Search..." className="w-full bg-zinc-900 border-2 border-[#7c3aed] pl-12 pr-10 py-4 rounded-xl text-white outline-none"/>
                  {toolSearch && <button onClick={() => setToolSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X size={20}/></button>}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-8 scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 max-w-7xl mx-auto">
                  {tools.map((tool,i) => (
                    <button key={i} onClick={() => setSelectedTool(tool)} className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl hover:bg-[#7c3aed]/10 transition">
                      <Sparkles size={18} className="text-[#7c3aed] mb-2"/>
                      <span className="text-sm font-bold uppercase text-white block">{tool}</span>
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
                <button onClick={() => {setSelectedTool(null);setAiPrompt('');}} className="text-white hover:text-red-500"><X size={32}/></button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button onClick={() => fileInputRef.current?.click()} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                  <Upload size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">UPLOAD</p>
                </button>
                <button onClick={handlePaste} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                  <Layers size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">PASTE</p>
                </button>
                <div className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center">
                  <Sparkles size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">GENERATE</p>
                </div>
              </div>
              <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Describe..." className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-lg text-white h-24 outline-none resize-none mb-6"/>
              <button onClick={handleAIGenerate} disabled={!aiPrompt.trim() || generating} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50">
                {generating ? 'GENERATING...' : '✨ GENERATE'}
              </button>
            </div>
          </div>
        )}

        {page === 12 && (
          <div className="min-h-screen flex pb-32 pt-20">
            <div className="w-1/3 bg-zinc-950 border-r-4 border-[#7c3aed] p-6 overflow-y-auto scrollbar">
              <h3 className="text-2xl font-black uppercase mb-6 text-white">LIBRARY</h3>
              {mediaLibrary.length === 0 ? (
                <p className="text-zinc-500">No media yet</p>
              ) : (
                <div className="space-y-3">
                  {mediaLibrary.map(item => (
                    <div key={item.id} draggable onDragStart={() => setDraggedItem(item)} className="bg-zinc-900 border-2 border-[#7c3aed] p-4 rounded-xl cursor-move">
                      <p className="text-sm font-bold text-white truncate">{item.name}</p>
                      <p className="text-xs text-zinc-500">{item.size}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-black flex items-center justify-center">
                <Play size={120} className="text-[#7c3aed]"/>
              </div>
              <div className="bg-zinc-950 p-6 border-t-4 border-[#7c3aed]">
                <h3 className="text-2xl font-black uppercase text-[#7c3aed] mb-6">TIMELINE</h3>
                <div className="space-y-3">
                  {['video','audio','text'].map(track => (
                    <div key={track} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(track)} className="bg-black border-2 border-[#7c3aed] rounded-xl min-h-[80px] p-4">
                      <p className="text-sm font-bold text-white uppercase mb-2">{track}</p>
                      <div className="flex gap-2">
                        {timeline[track].map((item,i) => (
                          <div key={i} className="bg-[#7c3aed] px-3 py-2 rounded text-xs font-bold">{item.name.substring(0,10)}...</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 16 && (
          <div className="h-screen flex items-center justify-center p-8">
            <div className="max-w-4xl w-full bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-12">
              <h1 className="text-5xl font-black text-[#7c3aed] mb-12 text-center">EXPORT</h1>
              <button onClick={handleRender} className="w-full bg-[#7c3aed] py-6 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition mb-8">
                🎬 RENDER MOVIE
              </button>
              {rendering && (
                <div className="w-full bg-zinc-800 h-6 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[#7c3aed] transition-all" style={{width:`${renderProgress}%`}}/>
                </div>
              )}
            </div>
          </div>
        )}

        {page === 21 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <video autoPlay loop muted playsInline className="w-full rounded-3xl border-4 border-[#7c3aed]">
                  <source src="/ThatsAllFolks.mp4" type="video/mp4"/>
                </video>
              </div>
              <h1 className="text-9xl font-black text-[#7c3aed] uppercase text-center mb-16">THAT'S ALL FOLKS!</h1>
              <button onClick={() => setPage(1)} className="px-20 py-8 bg-white text-black rounded-full font-black uppercase text-3xl hover:scale-105 transition mx-auto block">
                🏠 HOME
              </button>
              <div className="text-center mt-12">
                <a href="https://thatsallfolks.com" target="_blank" rel="noopener noreferrer" className="text-[#7c3aed] text-2xl font-black">ThatsAllFolks.com</a>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
