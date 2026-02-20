import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Settings, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search } from 'lucide-react';

// 600 TOTAL AI TOOLS - 120 PER CATEGORY
const AI_TOOLS = {
  Writing: ["Text to Video - Cinematic","Text to Video - Realistic","Text to Video - Animated","Script to Movie","Story to Video","Dialogue Writer","Plot Generator","Scene Writer","Story Outliner","Character Developer","Script Formatter","Three Act Builder","Backstory Generator","Theme Generator","Plot Twist Creator","Scene Analyzer","World Builder","Subplot Generator","Character Voice","Pacing Analyzer","Opening Hook","Climax Builder","Character Arc","Flashback Scene","Dream Sequence","Montage Script","Action Sequence","Dialogue Polish","Beat Sheet","Treatment Writer","Logline Creator","Synopsis Builder","Pitch Deck","Coverage Notes","Script Analysis","Scene Breakdown","Shot List","Storyboard Script","Animatic Plan","Voice Direction","Casting Notes","Location Scout","Set Description","Prop List","Costume Notes","Makeup Notes","FX Planning","Stunt Description","Choreography Notes","Blocking Plan","Camera Angles","Lighting Notes","Sound Design","Music Cues","Mood Board","Color Script","Visual Style","Tone Guide","Genre Blend","Subtext Layer","Theme Weave","Motif Repeat","Foreshadow","Callback Setup","Payoff Plan","Red Herring","MacGuffin","Inciting Incident","Point of No Return","Dark Night","Resolution","Denouement","Epilogue","Prologue","Cold Open","Teaser","Cliffhanger","Reveal","Twist Ending","Ambiguous End","Full Circle","Mirror Scene","Parallel Story","Nested Tale","Frame Story","Anthology","Vignette","Slice of Life","Character Study","Ensemble Cast","Dual Timeline","Nonlinear","Unreliable Narrator","Fourth Wall","Meta Comment","Experimental","Abstract","Surreal","Magical Realism","Heightened Reality","Stylized Dialogue","Natural Speech","Period Dialect","Regional Accent","Slang Generator","Jargon Builder","Technical Talk","Poetic Language","Minimalist","Verbose","Subtext Heavy","On the Nose","Show Don't Tell","Dramatic Irony","Situational Irony","Verbal Irony","Comic Relief","Dark Humor","Satire","Parody","Homage","Reference","Easter Egg","Inside Joke","Running Gag","Brick Joke"],
  Voice: ["Text to Speech Pro","Voice Clone AI","Character Voice 1","Character Voice 2","Narrator Deep","Narrator Warm","Narrator Bright","Emotion Happy","Emotion Sad","Emotion Angry","Emotion Fear","Emotion Surprise","Emotion Disgust","Emotion Neutral","Emotion Love","Emotion Hate","Emotion Jealous","Emotion Proud","Emotion Shame","Emotion Guilt","Child Voice","Teen Voice","Young Adult","Middle Age","Elderly Voice","Male Deep","Male Medium","Male Light","Female Deep","Female Medium","Female Light","Non-Binary","Androgynous","British Accent","American Accent","Australian","Irish","Scottish","Welsh","Canadian","Southern US","New York","Boston","Chicago","Texas","California","Midwest","French","German","Italian","Spanish","Portuguese","Russian","Japanese","Chinese","Korean","Indian","Arabic","Hebrew","Dutch","Swedish","Norwegian","Danish","Finnish","Polish","Czech","Greek","Turkish","Thai","Vietnamese","Indonesian","Filipino","South African","Nigerian","Kenyan","Egyptian","Formal Tone","Casual Tone","Professional","Conversational","Dramatic","Comedic","Sarcastic","Sincere","Mysterious","Energetic","Calm","Sleepy","Drunk","Sick","Crying","Laughing","Whispering","Shouting","Singing","Rapping","Chanting","Meditation","Hypnotic","ASMR","Radio DJ","News Anchor","Sports Commentator","Documentary","Audiobook","Podcast","Commercial","Trailer","Animation","Video Game","Phone Call","Intercom","PA System","Robot","Alien","Monster","Demon","Angel","Ghost","Zombie","Vampire","Werewolf","Cyborg","AI Assistant","Old Radio","Vintage Film","Modern Clear","Studio Quality"],
  Image: ["Photo to Motion","Portrait Animate","Landscape Flythrough","Still to Scene","Artwork Living","Sketch Render","Drawing Animate","Painting Motion","Illustration Video","Concept Preview","Storyboard Animatic","Comic Motion","Manga Anime","Poster Trailer","Album Video","Book Cover","Product Demo","Food Video","Fashion Show","Architecture Tour","Interior Walk","Nature Doc","Wildlife Scene","Pet Character","Baby Memory","Wedding Film","Travel Journey","Selfie Story","Group Photo","Historical Color","Vintage Restore","B&W to Color","Sepia Modern","Polaroid Style","Film Strip","Photo Negative","Scan Digital","Screenshot","Meme Video","Infographic","Chart Animate","Graph Visual","Map Journey","Blueprint 3D","Floor Plan","Diagram Tech","Logo Video","Icon Animate","Emoji Express","Avatar Create","Profile Intro","Thumbnail Expand","Preview Full","Promo Video","Banner Ad","Header Hero","Background Parallax","Texture Move","Pattern Flow","Gradient Shift","Bokeh Dream","Silhouette","Shadow Play","Mirror Effect","Prism Split","Glass Clear","Overlay Mix","Mask Cut","Layer Depth","Collage Stop","Mosaic Build","Pixel Art","Vector Clean","4K Upscale","8K Enhance","Crop Smart","Rotate Spin","Flip Mirror","Distort Warp","Stretch Wide","Squeeze Narrow","Bulge Fish","Pinch Center","Twirl Spiral","Ripple Water","Wave Ocean","Shake Earth","Vibrate Intense","Pulse Beat","Glow Neon","Shine Bright","Blur Soft","Sharp Clear","Smooth Dream","Hard Edge","Desaturate","Saturate Pop","Hue Rainbow","Temp Warm","Temp Cool","Tint Color","Exposure Bright","Contrast High","Highlight Bloom","Shadow Deep","Midtone Balance","White Pure","Black Deep","Clarity Sharp","Vibrance Natural","Dehaze Clear","Structure Detail","Grain Film","Noise Texture","Vignette Dark","Light Leak","Dust Scratch","Age Effect"],
  Video: ["Stabilize Smooth","Slow Motion AI","Speed Up Fast","Reverse Time","Loop Seamless","Trim Precision","Split Multi","Merge Clips","Transition Fade","Transition Cut","Transition Wipe","Transition Slide","Transition Zoom","Transition Spin","Transition Blur","Color Grade Cinema","Color Grade Vintage","Color Grade Modern","Color Grade Dark","Color Grade Bright","LUT Film","LUT Digital","LUT Vintage","LUT Futuristic","Green Screen","Blue Screen","Chroma Key","Motion Track","Face Track","Object Track","Camera Track 3D","Rotoscope Auto","Rotoscope Manual","Object Remove","Person Remove","Wire Remove","Blemish Fix","Wrinkle Smooth","Eye Brighten","Teeth Whiten","Skin Smooth","Color Match","Exposure Fix","White Balance","Denoise Video","Deinterlace","Upscale 4K","Upscale 8K","Downscale","Format Convert","Codec H264","Codec H265","Codec ProRes","Codec DNxHD","Bitrate High","Bitrate Medium","Bitrate Low","FPS 24","FPS 30","FPS 60","FPS 120","Aspect 16x9","Aspect 4x3","Aspect 1x1","Aspect 9x16","Aspect 21x9","Letterbox","Pillarbox","Crop Auto","Crop Manual","Zoom Digital","Pan Left","Pan Right","Tilt Up","Tilt Down","Dolly In","Dolly Out","Truck Left","Truck Right","Pedestal Up","Pedestal Down","Arc Shot","Crane Up","Crane Down","Steadicam","Handheld","POV Shot","Dutch Angle","High Angle","Low Angle","Eye Level","Bird's Eye","Worm's Eye","Over Shoulder","Two Shot","Close Up","Medium Shot","Wide Shot","Extreme Close","Extreme Wide","Master Shot","Insert Shot","Cutaway","Reaction Shot","Establishing","Tracking Shot","Following Shot","Leading Shot","Whip Pan","Rack Focus","Deep Focus","Shallow Focus","Split Focus","Tilt Shift","Time Lapse","Hyperlapse","Bullet Time","Freeze Frame","Speed Ramp"],
  Audio: ["Background Music","Theme Song","Film Score","Cinematic Orchestra","Epic Trailer","Emotional Piano","Upbeat Pop","Chill Lo-Fi","Intense Action","Suspense Tension","Horror Atmosphere","Comedy Bounce","Romance Soft","Drama Strings","Sci-Fi Synth","Fantasy Magic","Western Guitar","Noir Jazz","Retro 80s","Modern EDM","Hip Hop Beat","Trap 808","Boom Bap","Drill","Afrobeat","Reggaeton","Dancehall","House","Techno","Trance","Dubstep","Drum & Bass","Ambient","Downtempo","Chillwave","Vaporwave","Synthwave","Shoegaze","Indie Rock","Alternative","Grunge","Metal","Punk","Classical","Baroque","Romantic","Contemporary","Minimalist","Sound Effect","Foley Footstep","Foley Door","Foley Glass","Foley Metal","Foley Wood","Foley Cloth","Ambience Room","Ambience City","Ambience Nature","Ambience Space","Ambience Underwater","Rain Light","Rain Heavy","Thunder","Wind Gentle","Wind Storm","Ocean Waves","River Stream","Fire Crackle","Explosion","Gunshot","Sword Clash","Punch","Kick","Crash","Shatter","Whoosh","Swoosh","Zap","Laser","Sci-Fi UI","Magic Spell","Monster Roar","Creature","Robot","Vehicle Car","Vehicle Motorcycle","Vehicle Truck","Vehicle Train","Vehicle Plane","Vehicle Helicopter","Vehicle Spaceship","Crowd Applause","Crowd Cheer","Crowd Boo","Crowd Murmur","Dialogue Clean","Noise Remove","Audio Restore","EQ Enhance","Compression","Limiting","Normalize","Stereo Wide","Mono Mix","5.1 Surround","7.1 Surround","Atmos Mix","Bass Boost","Treble Enhance","Vocal Clarity","De-Ess","De-Breath","De-Click","De-Hum"],
  Motion: ["Remove Background","Green Key Pro","Chroma Perfect","Rotoscope AI","Motion Track Pro","Face Track AI","Object Track","Camera Solve","Planar Track","Point Track","Stabilize 2D","Stabilize 3D","Remove Object","Remove Person","Remove Wire","Clone Stamp","Heal Brush","Paint Out","Sky Replace","Cloud Add","Sun Position","Moon Phase","Stars Night","Galaxy","Nebula","Aurora","Lightning","Fire Sim","Smoke Sim","Explosion FX","Debris","Sparks","Dust","Rain Sim","Snow Sim","Water Sim","Ocean Wave","Splash","Ripple","Bubble","Mist","Fog","Haze Atmos","God Rays","Volumetric","Lens Flare","Light Leak","Glare","Glow","Shine","Sparkle","Glitter","Confetti","Balloons","Fireworks","Magic Particle","Energy Beam","Laser","Hologram","Glitch Digital","RGB Split","Chromatic","Scan Lines","VHS","Film Grain","Dust Scratch","Light Leak Vintage","Vignette","Blur Gaussian","Blur Radial","Blur Zoom","Blur Motion","Sharpen","Enhance Detail","Denoise","Despeckle","Color Grade","LUT Apply","Tint","Hue Shift","Saturation","Vibrance","Contrast","Brightness","Exposure","Highlights","Shadows","Whites","Blacks","Temperature","Tint Color","3D Text","Logo Reveal","Lower Third","Title Card","End Credits","Subtitle","Transition Wipe","Transition Push","Transition Slide","Transition Zoom","Transition Spin","Transition Cube","Transition Flip","Transition Page Peel","Kaleidoscope","Mirror","Clone","Prism","Distort","Warp","Bulge","Pinch","Twirl","Wave","Ripple"]
};

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolSearch, setToolSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [timeline, setTimeline] = useState({ video: [], audio: [], text: [] });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [selectedClip, setSelectedClip] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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
      setMediaLibrary(prev => [...prev, {
        id: Date.now(),
        name: `AI-Generated-${Date.now()}.mp4`,
        type: 'video',
        size: '250MB',
        url: `data:video/mp4;base64,SIMULATED_AI_GENERATED_CONTENT`,
        timestamp: new Date().toISOString()
      }]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
    }, 3000);
  }, [aiPrompt, selectedTool]);

  const handleRender = useCallback(() => {
    setRendering(true);
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setRendering(false);
            setPreviewUrl('data:video/mp4;base64,RENDERED_VIDEO');
            setPage(16);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .scrollbar::-webkit-scrollbar{width:6px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
      `}</style>

      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} className="hidden"/>

      {(generating || rendering) && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-8">
            <div className="absolute inset-0 rounded-full border-8 border-[#7c3aed]/30"/>
            <div className="absolute inset-0 rounded-full border-8 border-t-[#7c3aed] border-r-transparent border-b-transparent border-l-transparent" style={{animation:'spin 1s linear infinite'}}/>
            <Sparkles className="absolute inset-0 m-auto text-[#7c3aed]" size={48}/>
          </div>
          <p className="text-2xl font-black text-white">{generating ? '🤖 Generating...' : '🎬 Rendering...'}</p>
          {rendering && (
            <div className="mt-6 w-80">
              <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all" style={{width:`${renderProgress}%`}}/>
              </div>
              <p className="text-center text-[#7c3aed] font-black text-2xl mt-2">{renderProgress}%</p>
            </div>
          )}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b-2 border-[#7c3aed] px-6 py-4 flex items-center justify-between">
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-3 bg-[#7c3aed] px-4 py-2 rounded-xl hover:bg-[#6d28d9] transition">
          <Menu size={24}/><span className="font-black text-sm">MENU</span>
        </button>

        {menuOpen && (
          <div className="absolute top-14 left-0 bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl w-64 shadow-2xl max-h-[80vh] overflow-y-auto z-50 scrollbar">
            <div className="p-4 space-y-1">
              {['Welcome','About','Login','Writing','Voice','Image','Video','Audio','Motion','Upload','Library','Editor','Enhancement','Audio Mixer','Preview','Export','Tutorials','Terms','Agent Grok','Community','Thank You'].map((p, i) => (
                <button key={i} onClick={() => { setPage(i+1); setMenuOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition ${page===i+1?'bg-[#7c3aed] text-white':'text-zinc-300 hover:bg-[#7c3aed]/20'}`}>
                  {i+1}. {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center cursor-pointer" onClick={() => setPage(1)}>
          <div className="text-2xl font-black text-[#7c3aed]">MANDASTRONG</div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setPage(p => Math.max(1, p-1))} className="bg-zinc-800 p-2 rounded-lg hover:bg-[#7c3aed] transition"><ChevronLeft size={20}/></button>
          <button onClick={() => setPage(p => Math.min(21, p+1))} className="bg-[#7c3aed] p-2 rounded-lg hover:bg-[#6d28d9] transition"><ChevronRight size={20}/></button>
        </div>
      </header>

      <main className="pt-20 pb-20 min-h-screen">

        {/* PAGE 1 - WELCOME */}
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-black via-[#7c3aed]/20 to-black">
            <Film size={80} className="text-[#7c3aed] mb-8 animate-pulse"/>
            <h1 className="text-7xl md:text-9xl font-black text-[#7c3aed] mb-6">MANDASTRONG<br/>STUDIO</h1>
            <p className="text-2xl font-bold text-white max-w-3xl mb-16">Welcome To The All In One Make Your Own Longer Movies App!</p>
            <button onClick={() => setPage(3)} className="bg-[#7c3aed] px-16 py-6 rounded-full font-black text-2xl hover:scale-105 transition shadow-2xl">START CREATING</button>
          </div>
        )}

        {/* PAGE 2 - ABOUT */}
        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6">
            <Sparkles size={64} className="text-[#7c3aed] mb-8"/>
            <h1 className="text-5xl font-black text-[#7c3aed] mb-6">ABOUT MANDASTRONG</h1>
            <p className="text-xl text-zinc-300 max-w-2xl mb-8">Create professional movies with 600 AI tools. Make films up to 3 hours in stunning 8K quality.</p>
            <button onClick={() => setPage(3)} className="bg-[#7c3aed] px-12 py-4 rounded-full font-black text-xl hover:scale-105 transition">GET STARTED</button>
          </div>
        )}

        {/* PAGE 3 - LOGIN */}
        {page === 3 && (
          <div className="min-h-screen p-8 pt-24">
            <h1 className="text-5xl font-black text-[#7c3aed] text-center mb-12">GET STARTED</h1>
            <div className="max-w-md mx-auto mb-12">
              <button onClick={() => setPage(4)} className="w-full py-6 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-2xl font-black text-2xl uppercase hover:scale-105 transition shadow-2xl">
                🎬 BROWSE TOOLS FIRST
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-8 rounded-3xl">
                <h3 className="text-2xl font-black mb-6 text-white text-center">LOGIN</h3>
                <input type="email" placeholder="Email" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="password" placeholder="Password" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black hover:bg-[#6d28d9] transition">LOGIN</button>
              </div>
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-8 rounded-3xl">
                <h3 className="text-2xl font-black mb-6 text-white text-center">REGISTER</h3>
                <input type="text" placeholder="Name" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="email" placeholder="Email" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black hover:bg-[#6d28d9] transition">REGISTER</button>
              </div>
            </div>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-black text-center mb-8 text-white">PLANS</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {t:'Basic',p:'20',f:['HD Export','100 Tools','10GB']},
                  {t:'Pro',p:'30',f:['4K Export','300 Tools','100GB']},
                  {t:'Studio',p:'50',f:['8K Export','600 Tools','1TB']}
                ].map(plan => (
                  <div key={plan.t} className="bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl p-6">
                    <h3 className="text-xl font-black mb-2 text-white">{plan.t}</h3>
                    <div className="text-4xl font-black text-[#7c3aed] mb-6">${plan.p}/mo</div>
                    <ul className="space-y-2 mb-6">
                      {plan.f.map(f => <li key={f} className="text-sm text-white flex items-center gap-2"><CheckCircle size={16} className="text-[#7c3aed]"/>{f}</li>)}
                    </ul>
                    <button onClick={() => window.open('https://buy.stripe.com/test_14k00SfE88Wn5K85kk','_blank')} className="w-full py-3 bg-[#7c3aed] rounded-xl font-bold hover:bg-[#6d28d9] transition">SUBSCRIBE</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGES 4-9: AI TOOLS - 600 TOTAL */}
        {(page >= 4 && page <= 9) && (() => {
          const categories = ["Writing","Voice","Image","Video","Audio","Motion"];
          const category = categories[page-4];
          const allTools = AI_TOOLS[category] || [];
          const tools = toolSearch ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
          return (
            <div className="min-h-screen flex flex-col pt-24 pb-40">
              <h2 className="text-5xl font-black uppercase text-[#7c3aed] text-center mb-2">AI TOOL BOARD</h2>
              <p className="text-center text-zinc-400 mb-6">{category} Category • {allTools.length} Tools Available</p>
              
              <div className="px-8 mb-6">
                <div className="relative max-w-xl mx-auto">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                  <input 
                    value={toolSearch} 
                    onChange={e => setToolSearch(e.target.value)} 
                    placeholder="Search 600+ AI Tools..." 
                    className="w-full bg-zinc-900 border-2 border-[#7c3aed] pl-12 pr-10 py-4 rounded-xl text-white outline-none text-lg font-bold"
                  />
                  {toolSearch && <button onClick={() => setToolSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"><X size={20}/></button>}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-8 scrollbar">
                <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto pb-8">
                  {tools.map((tool,i) => (
                    <button key={i} onClick={() => setSelectedTool(tool)} className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl hover:bg-[#7c3aed]/10 transition group">
                      <Sparkles size={18} className="text-[#7c3aed] mb-2 group-hover:animate-spin"/>
                      <span className="text-sm font-bold uppercase text-white text-center block">{tool}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4 px-8 mt-6">
                <button onClick={() => setPage(p => Math.max(4, p-1))} className="px-8 py-3 bg-[#7c3aed] rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-2">
                  <ChevronLeft size={20}/> BACK
                </button>
                <button onClick={() => setPage(p => Math.min(9, p+1))} className="px-8 py-3 bg-[#7c3aed] rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-2">
                  NEXT <ChevronRight size={20}/>
                </button>
              </div>
            </div>
          );
        })()}

        {/* AI TOOL MODAL */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
            <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-black text-[#7c3aed]">{selectedTool}</h2>
                <button onClick={() => {setSelectedTool(null);setAiPrompt('');}} className="text-white hover:text-red-500"><X size={32}/></button>
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
                      setMediaLibrary(prev => [...prev, {id:Date.now(),name:`pasted.mp4`,type:'video',size:'0MB',url:text,timestamp:new Date().toISOString()}]);
                      setSelectedTool(null);
                    } else alert('📋 Paste a valid URL');
                  } catch {alert('❌ Clipboard denied');}
                }} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                  <Layers size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">PASTE</p>
                </button>

                <div className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center">
                  <Sparkles size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">GENERATE</p>
                </div>
              </div>

              <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Describe what you want to create..." className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white h-32 outline-none mb-6"/>
              <button onClick={handleAIGenerate} disabled={!aiPrompt.trim()} className="w-full py-4 bg-[#7c3aed] rounded-xl font-black text-xl hover:bg-[#6d28d9] transition disabled:opacity-50">
                {generating ? 'GENERATING...' : '✨ GENERATE & ADD TO LIBRARY'}
              </button>
            </div>
          </div>
        )}

        {/* PAGE 10 - UPLOAD */}
        {page === 10 && (
          <div className="min-h-screen p-8 pt-24">
            <h1 className="text-5xl font-black text-[#7c3aed] text-center mb-12">UPLOAD MEDIA</h1>
            <div className="max-w-4xl mx-auto">
              <button onClick={() => fileInputRef.current?.click()} className="w-full aspect-video bg-zinc-950 border-4 border-dashed border-[#7c3aed] rounded-3xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/10 transition cursor-pointer">
                <Upload size={80} className="text-[#7c3aed] mb-6"/>
                <p className="text-2xl font-black text-white mb-2">DRAG & DROP OR CLICK</p>
                <p className="text-zinc-400">Video, Audio, Images accepted</p>
              </button>
            </div>
          </div>
        )}

        {/* PAGE 11 - LIBRARY */}
        {page === 11 && (
          <div className="min-h-screen p-8 pt-24">
            <h1 className="text-5xl font-black text-[#7c3aed] text-center mb-12">MEDIA LIBRARY</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
              {mediaLibrary.map(item => (
                <div key={item.id} className="bg-zinc-950 border-2 border-[#7c3aed] p-4 rounded-2xl">
                  <div className="aspect-video bg-black rounded-lg mb-3 flex items-center justify-center">
                    <Film size={40} className="text-[#7c3aed]"/>
                  </div>
                  <p className="text-sm font-bold text-white truncate">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.size}</p>
                </div>
              ))}
              {mediaLibrary.length === 0 && (
                <div className="col-span-4 text-center py-20">
                  <p className="text-zinc-500 text-xl">No media yet. Upload or generate content!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 21 - THANK YOU */}
        {page === 21 && (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-black via-[#7c3aed]/10 to-black">
            <h1 className="text-8xl font-black text-[#7c3aed] uppercase text-center mb-12 leading-none">THAT'S ALL<br/>FOLKS!</h1>
            <div className="w-full max-w-5xl mb-12">
              <video autoPlay loop muted playsInline className="w-full rounded-3xl border-4 border-[#7c3aed] shadow-2xl">
                <source src="/ThatsAllFolks.mp4" type="video/mp4"/>
              </video>
            </div>
            <audio autoPlay loop><source src="/ThatsAllFolks.mp3" type="audio/mpeg"/></audio>
            <div className="max-w-3xl text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-6">💜 THANK YOU!</h2>
              <p className="text-xl text-zinc-300">Your movie is ready. Share it with the world!</p>
            </div>
            <button onClick={() => setPage(1)} className="px-12 py-4 bg-[#7c3aed] rounded-2xl font-black text-xl hover:bg-[#6d28d9] transition">🏠 HOME</button>
          </div>
        )}

      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-black/95 border-t-2 border-[#7c3aed] py-4 text-center">
        <p className="text-sm font-bold text-zinc-400">MANDASTRONG STUDIO 2025 • <a href="https://MANDASTRONG1.ETSY.COM" className="text-[#7c3aed] hover:underline">MANDASTRONG1.ETSY.COM</a></p>
      </footer>
    </div>
  );
}
