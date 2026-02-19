import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search } from 'lucide-react';

// 799 AI TOOLS
const AI_TOOLS = {
  "Text to Video": ["Text to Cinematic Scene","Prompt to Movie Clip","Description to Visual Story","Text to Action Sequence","Prompt to Drama Scene","Text to Comedy Sketch","Description to Thriller Scene","Prompt to Romance Moment","Text to Sci-Fi World","Description to Fantasy Realm","Prompt to Horror Atmosphere","Text to Documentary Style","Description to Music Video Scene","Prompt to Commercial Spot","Text to Movie Trailer","Description to Short Film","Prompt to Animation Style","Text to Stop Motion Scene","Description to Time Lapse Video","Prompt to Montage Sequence","Text to B-Roll Footage","Description to Establishing Shot","Prompt to Aerial View","Text to POV Perspective","Description to Close-Up Detail","Prompt to Wide Landscape","Text to Reaction Shot","Description to Insert Detail","Prompt to Cutaway Shot","Text to Match Cut","Description to Jump Cut","Prompt to Cross Cut","Text to Dissolve Transition","Description to Fade Scene","Prompt to Wipe Effect","Text to Split Screen","Description to Picture in Picture","Prompt to Flashback Sequence","Text to Flash Forward","Description to Dream Sequence","Prompt to Parallel Action","Text to Slow Motion Drama","Description to Speed Ramp Effect","Prompt to Reverse Shot","Text to Dutch Angle","Description to Crane Shot","Prompt to Dolly Zoom","Text to Tracking Shot","Description to Steadicam Move","Prompt to Handheld Energy","Text to Whip Pan","Description to Rack Focus","Prompt to Deep Focus Shot","Text to Shallow Depth","Description to Bokeh Background","Prompt to Lens Flare","Text to God Rays","Description to Volumetric Light","Prompt to Cinematic Grain","Text to Film Look","Description to Color Grade","Prompt to LUT Apply","Text to Vintage Film","Description to Modern Digital","Prompt to IMAX Style","Text to Anamorphic Look","Description to Widescreen Format","Prompt to Vertical Video","Text to Square Format","Description to 16x9 Standard","Prompt to 4x3 Classic","Text to Ultra Wide","Description to Panoramic View","Prompt to 360 Video","Text to VR Scene","Description to AR Element","Prompt to Hologram Effect","Text to Glitch Art","Description to Cyberpunk Style","Prompt to Retro 80s Look","Text to Film Noir","Description to Golden Age Cinema","Prompt to New Wave Style","Text to Documentary Realism","Description to Found Footage","Prompt to Screen Recording","Text to Split Timeline","Description to Nonlinear Edit","Prompt to Anthology Format","Text to Vignette Style","Description to Parallel Story","Prompt to Frame Story","Text to Nested Narrative","Description to Multiple POV","Prompt to Unreliable Narrator","Text to Breaking Fourth Wall","Description to Meta Commentary","Prompt to Experimental Film","Text to Abstract Visual","Description to Surreal Scene","Prompt to Magical Realism","Text to Heightened Reality","Description to Stylized Action","Prompt to Fight Choreography","Text to Car Chase","Description to Explosion Scene","Prompt to Destruction Sequence","Text to Natural Disaster","Description to Crowd Scene","Prompt to Intimate Moment","Text to Emotional Beat","Description to Character Study","Prompt to Tension Build","Text to Climax Scene","Description to Resolution","Prompt to Denouement","Text to Opening Credits","Description to Title Card","Prompt to End Credits","Text to Post Credits Scene","Description to Teaser Hook","Prompt to Cold Open","Text to Stinger Ending","Description to Cliffhanger"],
  "Image to Video": ["Photo to Motion","Still to Animation","Image to Cinematic","Portrait to Scene","Landscape to Flythrough","Artwork to Living Painting","Sketch to Rendered Scene","Drawing to Animated Story","Painting to Motion Art","Illustration to Movie Scene","Concept Art to Preview","Storyboard to Animatic","Comic Panel to Motion","Manga to Anime Style","Poster to Trailer","Album Art to Music Video","Book Cover to Teaser","Product Photo to Commercial","Food Photo to Recipe Video","Fashion Photo to Runway","Architecture Photo to Tour","Interior Photo to Walkthrough","Nature Photo to Documentary","Wildlife Photo to Scene","Pet Photo to Character","Baby Photo to Memory Film","Wedding Photo to Highlight","Travel Photo to Journey","Selfie to Reaction Video","Group Photo to Story","Historical Photo to Reenactment","Vintage Photo to Colorized","Black White to Color Motion","Sepia Tone to Modern","Polaroid to Retro Clip","Film Strip to Montage","Negative to Positive Motion","Scan to Digital Animation","Screenshot to Tutorial","Meme to Video Meme","Infographic to Explainer","Chart to Data Viz","Graph to Animated Stats","Map to Journey Animation","Blueprint to 3D Walk","Floor Plan to Virtual Tour","Diagram to Technical Demo","Logo to Brand Video","Icon to UI Animation","Emoji to Expression","Avatar to Character","Profile Pic to Intro","Thumbnail to Full Video","Preview to Extended Cut","Promo Image to Commercial","Banner to Video Ad","Header to Hero Video","Background to Parallax","Texture to Material Demo","Pattern to Hypnotic Loop","Gradient to Color Flow","Bokeh to Dreamy Scene","Silhouette to Reveal","Shadow to Mystery","Reflection to Mirror World","Refraction to Prism","Transparency to Glass","Overlay to Composite","Mask to Cutout Animation","Layer to Depth Motion","Collage to Stop Motion","Mosaic to Particle Reveal","Pixelation to Retro Game","Vector to Clean Motion","Raster to Pixel Art","Upscale to 4K Motion","Downscale to Lo-Fi","Crop to Reframe","Rotate to Spin Effect","Flip to Mirror","Distort to Warp","Stretch to Aspect Change","Squeeze to Compression","Bulge to Fish Eye","Pinch to Vortex","Twirl to Spiral","Ripple to Water","Wave to Ocean Motion","Shake to Earthquake","Vibrate to Intensity","Pulse to Heartbeat","Glow to Neon Sign","Shine to Sparkle","Blur to Focus Pull","Sharpen to Clarity","Soften to Dreamy Haze","Harden to Sharp Contrast","Desaturate to BW","Saturate to Color Pop","Hue Shift to Color Change","Temperature to Mood Shift","Tint to Filter Effect","Exposure to Brightness Flow","Contrast to Dramatic Look","Highlights to Bloom","Shadows to Crush Black","Midtones to Balance","Whites to Pure Bright","Blacks to Deep Dark","Clarity to Detail Enhance","Vibrance to Natural Pop","Saturation Boost","Dehaze to Clear","Structure to Texture","Grain to Film Look","Noise to Authentic Feel"],
  "Script to Movie": ["Screenplay to Video","Dialogue to Acted Scene","Action Line to Movement","Scene Heading to Location","Character Desc to Design","Stage Direction to Visual","Parenthetical to Performance","Transition to Edit","Slug Line to Shot Setup","INT to Interior Scene","EXT to Exterior Scene","DAY to Daytime Lighting","NIGHT to Nighttime Mood","DAWN to Morning Glow","DUSK to Evening Atmosphere","CONTINUOUS to Seamless","LATER to Time Jump","FLASHBACK to Memory","MONTAGE to Sequence","INTERCUT to Cross Cutting","VO to Voiceover","OS to Off Screen","BG to Background Action","FG to Foreground Focus","CLOSE UP to Tight Shot","WIDE SHOT to Establishing","MEDIUM SHOT to Standard","TWO SHOT to Dual Character","OVER SHOULDER to Conversation","POV to Point of View","INSERT to Detail Shot","ANGLE ON to Specific Focus","REVERSE to Opposite View","CRANE UP to Rising Shot","CRANE DOWN to Descending","DOLLY IN to Push In","DOLLY OUT to Pull Back","TRACK LEFT to Side Move","TRACK RIGHT to Lateral Slide","PAN LEFT to Horizontal Sweep","PAN RIGHT to Panoramic Turn","TILT UP to Upward Angle","TILT DOWN to Downward View","ZOOM IN to Magnify","ZOOM OUT to Reveal Context","RACK FOCUS to Shift Depth","FOLLOW to Tracking Character","CIRCLE to Orbit Shot","AERIAL to Birds Eye","LOW ANGLE to Power Shot","HIGH ANGLE to Vulnerable View","DUTCH ANGLE to Unease","HANDHELD to Raw Energy","STEADICAM to Smooth Glide","WHIP PAN to Fast Transition","CRASH ZOOM to Shock","FREEZE FRAME to Still","SLOW MOTION to Drama","SPEED RAMP to Dynamic","TIME LAPSE to Passage","REVERSE MOTION to Rewind","MATCH CUT to Visual Link","JUMP CUT to Jarring Edit","CROSS DISSOLVE to Blend","FADE IN to Scene Start","FADE OUT to Scene End","FADE BLACK to Dramatic","FADE WHITE to Ethereal","WIPE to Stylized","IRIS IN to Focus","IRIS OUT to Vintage","SMASH CUT to Shocking","L CUT to Audio Lead","J CUT to Audio Trail","CROSSFADE to Smooth Audio","HARD CUT to Abrupt","SOFT CUT to Gentle","INVISIBLE CUT to Seamless","GRAPHIC MATCH to Echo","SOUND BRIDGE to Connect","PARALLEL EDIT to Simultaneous","SPLIT SCREEN to Dual","PIP to Inset View","SUPERIMPOSE to Overlay","DOUBLE EXPOSURE to Blend","GHOST IMAGE to Transparent","MIRROR to Symmetry","KALEIDOSCOPE to Pattern","STROBE to Flash","BEAT to Pause Moment","ACTION to Start","CUT to Stop","PRINT to Good Take","HOLD to Maintain","RESET to Return","CLEAR FRAME to Empty","FRAME UP to Compose","ROLLING to Recording","SPEED to Ready","MARKER to Slate","TAIL SLATE to End Mark","CHECKING GATE to Verify","MOVING ON to Next Setup","MARTINI SHOT to Last","WRAP to Complete"],
  "Voice Creator": ["Text to Natural Voice","Voice Clone from Sample","AI Narrator Professional","Character Voice Creator","Regional Accent Generator","Emotion Happy Voice","Emotion Sad Voice","Emotion Angry Voice","Emotion Excited Voice","Emotion Calm Voice","Emotion Scared Voice","Emotion Surprised Voice","Age Child Voice","Age Teen Voice","Age Young Adult","Age Middle Age","Age Elderly Voice","Gender Male Voice","Gender Female Voice","Gender Neutral Voice","Pitch High Control","Pitch Low Control","Speed Fast Control","Speed Slow Control","Tone Formal Voice","Tone Casual Voice","Style Conversational","Style Dramatic","Style Documentary","Style Audiobook","Style Commercial Voice","Style Trailer Voice","Voice Echo Effect","Voice Reverb Hall","Voice Distortion","Voice Robot Mod","Lip Sync Auto Match","Multi Voice Dialogue","Laugh Generation","Cry Emotional","Scream Intense","Whisper Quiet"],
  "Audio Studio": ["Background Music","Film Score Compose","Sound Effect Create","Foley Generator","Dialogue Cleanup","Noise Reduction","Volume Normalize","Stereo Mix","Surround 51 Mix","Bass Boost","Treble Enhance","Echo Chamber","Reverb Hall","Delay Effect","Chorus FX","Hip Hop Beat","Cinematic Epic","Trailer Music","Tension Builder","EDM Drop","LoFi Beats","Jazz Swing","Rock Power","Classical Orchestra"],
  "VFX Magic": ["Remove Background","Green Screen Key","Motion Track","Color Grade Cinematic","Film Grain","Lens Flare","Smoke Effect","Fire Simulation","Explosion Particle","Rain Generator","Snow Fall","Lightning Strike","Sky Replacement","Glow Aura","Hologram Project","3D Text Extrude","Transition Wipe","Glitch Digital","Time Freeze","Speed Ramp"]
};

const PAGES = ['Welcome','About','Login','Text to Video','Image to Video','Script to Movie','Voice Creator','Audio Studio','VFX Magic','Upload','Editor','Library','Enhancement','Audio Mixer','Preview','Export','Tutorials','Terms','Agent Grok','Community','Thank You'];

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
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
  const [spinnerMsg, setSpinnerMsg] = useState('');
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
  const [toolSearch, setToolSearch] = useState('');
  const [userPlan] = useState('Studio');
  const [loggedInUser] = useState('woolleya129@gmail.com');

  const fileInputRef = useRef(null);

  const Spinner = ({ message }) => (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-[#7c3aed]/30"/>
        <div className="absolute inset-0 rounded-full border-8 border-t-[#7c3aed] border-r-transparent border-b-transparent border-l-transparent" style={{animation:'spin 1s linear infinite'}}/>
        <Sparkles className="absolute inset-0 m-auto text-[#7c3aed]" size={48}/>
      </div>
      <p className="text-2xl font-black text-white text-center px-8">{message}</p>
      {rendering && (
        <div className="mt-6 w-80">
          <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-full transition-all duration-300" style={{width:`${renderProgress}%`}}/>
          </div>
          <p className="text-center text-[#7c3aed] font-black text-2xl mt-2">{renderProgress}%</p>
        </div>
      )}
    </div>
  );

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setGenerating(true);
    setSpinnerMsg('📁 Uploading...');
    let loaded = 0;
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
        loaded++;
        if (loaded === files.length) {
          setGenerating(false);
          setSpinnerMsg('');
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setSpinnerMsg(`🤖 Generating "${selectedTool}"...`);
    setTimeout(() => {
      setMediaLibrary(prev => [...prev, {
        id: Date.now(),
        name: `AI-${selectedTool.replace(/\s+/g,'-').toLowerCase()}.mp4`,
        type: 'video',
        size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
        url: `data:video/mp4;base64,AI_GENERATED`,
        aiGenerated: true,
        timestamp: new Date().toISOString()
      }]);
      setGenerating(false);
      setSpinnerMsg('');
      setAiPrompt('');
      setSelectedTool(null);
    }, 3000);
  }, [aiPrompt, selectedTool]);

  const handleDrop = useCallback((track) => {
    if (!draggedItem) return;
    setTimeline(prev => ({ ...prev, [track]: [...prev[track], { ...draggedItem, trackPosition: Date.now() }] }));
    setDraggedItem(null);
  }, [draggedItem]);

  const removeFromTimeline = useCallback((track, index) => {
    setTimeline(prev => ({ ...prev, [track]: prev[track].filter((_, i) => i !== index) }));
  }, []);

  const deleteFromLibrary = useCallback((id) => {
    setMediaLibrary(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleRender = useCallback(() => {
    setRendering(true);
    setRenderProgress(0);
    setSpinnerMsg(`🎬 Rendering ${exportSettings.quality}...`);
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setMediaLibrary(prev => [...prev, {
              id: Date.now(),
              name: `mandastrong-${Date.now()}.${exportSettings.format.toLowerCase()}`,
              type: 'video',
              size: (Math.random() * 1000 + 500).toFixed(2) + 'MB',
              url: `data:video/mp4;base64,RENDERED`,
              rendered: true,
              timestamp: new Date().toISOString()
            }]);
            setCurrentVideo({id: Date.now(), name: `movie-${Date.now()}.mp4`});
            setRendering(false);
            setRenderProgress(0);
            setSpinnerMsg('');
            setPage(16);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
  }, [exportSettings]);

  const handleDownload = useCallback((asset) => {
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleLike = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? {...p, likes: p.likes + 1} : p));
  }, []);

  const handleLove = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? {...p, loves: p.loves + 1} : p));
  }, []);

  const handleComment = useCallback((postId) => {
    const comment = newComment[postId];
    if (!comment?.trim()) return;
    setCommunityPosts(prev => prev.map(p => p.id === postId ? {...p, comments: [...(p.comments||[]), {id:Date.now(), text:comment, user: loggedInUser, timestamp: new Date().toISOString()}]} : p));
    setNewComment(prev => ({...prev, [postId]: ''}));
  }, [newComment, loggedInUser]);

  const filteredTools = (category) => {
    const tools = AI_TOOLS[category] || [];
    if (!toolSearch) return tools;
    return tools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>{`
        [data-bolt-badge],[class*="bolt"],[id*="bolt"],a[href*="bolt"]{display:none!important;}
        .scrollbar::-webkit-scrollbar{width:6px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes wave{0%,100%{transform:scaleY(0.5)}50%{transform:scaleY(1)}}
      `}</style>

      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} className="hidden"/>

      {(generating || rendering) && <Spinner message={spinnerMsg}/>}

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b-2 border-[#7c3aed] px-6 py-4 flex items-center justify-between">
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-3 bg-[#7c3aed] px-4 py-2 rounded-xl hover:bg-[#6d28d9] transition">
            <Menu size={24}/><span className="font-black text-sm uppercase">Menu</span>
          </button>
          {menuOpen && (
            <div className="absolute top-14 left-0 bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl w-72 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar z-50">
              <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] p-4 rounded-t-xl text-center">
                <div className="text-xs font-bold text-white/70 mb-1">CURRENT PLAN</div>
                <div className="text-xl font-black text-white">{userPlan}</div>
                <div className="text-xs text-white/80 mt-1">{loggedInUser}</div>
              </div>
              <div className="p-4 space-y-1">
                {PAGES.map((p, i) => (
                  <button key={i} onClick={() => { setPage(i+1); setMenuOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition ${page===i+1?'bg-[#7c3aed] text-white':'text-zinc-300 hover:bg-[#7c3aed]/20'}`}>
                    {i+1}. {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center cursor-pointer" onClick={() => setPage(1)}>
          <div className="text-2xl font-black text-[#7c3aed] uppercase">MANDASTRONG</div>
          <div className="text-xs text-zinc-400 uppercase">AI Movie Studio</div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setPage(p => Math.max(1, p-1))} className="bg-zinc-800 p-2 rounded-lg hover:bg-[#7c3aed] transition"><ChevronLeft size={20}/></button>
          <button onClick={() => setPage(p => Math.min(21, p+1))} className="bg-[#7c3aed] p-2 rounded-lg hover:bg-[#6d28d9] transition"><ChevronRight size={20}/></button>
        </div>
      </header>

      <main className="pt-20 pb-32 min-h-screen overflow-y-auto scrollbar">

        {/* PAGE 1 */}
        {page === 1 && (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
            <div className="w-40 h-40 rounded-full bg-[#7c3aed]/20 border-4 border-[#7c3aed] flex items-center justify-center mb-8 animate-pulse">
              <Film size={80} className="text-[#7c3aed]"/>
            </div>
            <h1 className="text-8xl font-black uppercase text-[#7c3aed] mb-4 leading-none">MANDA<br/>STRONG</h1>
            <p className="text-3xl font-bold text-white mb-2">AI Movie Studio</p>
            <p className="text-zinc-400 text-xl mb-12 max-w-3xl">Welcome To The All In One Make Your Own Longer Movies App!</p>
            <button onClick={() => setPage(3)} className="px-16 py-6 bg-[#7c3aed] rounded-full font-black text-2xl uppercase hover:bg-[#6d28d9] transition shadow-2xl">🎬 START CREATING</button>
          </div>
        )}

        {/* PAGES 4-9 - AI TOOLS WITH SEARCH */}
        {[4,5,6,7,8,9].includes(page) && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            {/* SEARCH BAR - TOP LEFT */}
            <div className="max-w-7xl mx-auto mb-8">
              <div className="relative max-w-xl">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                <input value={toolSearch} onChange={e => setToolSearch(e.target.value)} placeholder="🔍 Search AI Tools..." className="w-full bg-zinc-900 border-2 border-[#7c3aed] pl-12 pr-10 py-4 rounded-xl text-white outline-none text-lg font-bold"/>
                {toolSearch && <button onClick={() => setToolSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"><X size={20}/></button>}
              </div>
            </div>

            {[['Text to Video',4],['Image to Video',5],['Script to Movie',6],['Voice Creator',7],['Audio Studio',8],['VFX Magic',9]].map(([cat, pg]) => page === pg && (
              <div key={cat} className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black uppercase text-[#7c3aed] mb-12 text-center">{cat.toUpperCase()}</h1>
                <div className="grid grid-cols-4 gap-4">
                  {filteredTools(cat).map(tool => (
                    <button key={tool} onClick={() => setSelectedTool(tool)} className="bg-zinc-950 border-2 border-zinc-800 p-5 rounded-2xl hover:border-[#7c3aed] hover:bg-[#7c3aed]/10 transition text-left group">
                      <Sparkles size={24} className="text-[#7c3aed] mb-3 group-hover:scale-110 transition-transform"/>
                      <h3 className="text-sm font-bold text-white leading-tight">{tool}</h3>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* TOOL MODAL WITH PASTE */}
            {selectedTool && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
                <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-10 max-w-2xl w-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black uppercase text-[#7c3aed]">{selectedTool}</h2>
                    <button onClick={() => {setSelectedTool(null);setAiPrompt('');}} className="text-white hover:text-red-500"><X size={32}/></button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button onClick={() => fileInputRef.current?.click()} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                      <Upload size={48} className="text-[#7c3aed] mb-2"/>
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
                        alert('❌ Clipboard denied');
                      }
                    }} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                      <Layers size={48} className="text-[#7c3aed] mb-2"/>
                      <p className="font-black text-white text-sm">PASTE</p>
                    </button>

                    <div className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center">
                      <Sparkles size={48} className="text-[#7c3aed] mb-2"/>
                      <p className="font-black text-white text-sm">GENERATE</p>
                    </div>
                  </div>

                  <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Describe what you want..." className="w-full bg-black border-2 border-[#7c3aed] p-5 rounded-xl text-white text-lg outline-none resize-none h-32 mb-6"/>
                  <button onClick={handleAIGenerate} disabled={!aiPrompt.trim()} className="w-full py-4 bg-[#7c3aed] rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50">
                    <Sparkles size={20} className="inline mr-2"/>GENERATE
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 18 - TERMS OF SERVICE */}
        {page === 18 && (
          <div className="min-h-screen p-8 pt-20 pb-40 max-w-5xl mx-auto overflow-y-auto scrollbar">
            <h1 className="text-5xl font-black uppercase mb-12 text-white text-center">TERMS OF SERVICE & DISCLAIMER</h1>
            <div className="bg-[#7c3aed] rounded-3xl p-10 text-center mb-10">
              <Shield size={64} className="mx-auto mb-4"/>
              <h2 className="text-3xl font-black mb-2">Legal Agreement</h2>
              <p className="text-white/90">Last updated: February 2026 • Effective immediately</p>
            </div>
            {[
              {title:'1. ACCEPTANCE OF TERMS',content:'By accessing, browsing, or using MandaStrong Studio ("Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, you must not access or use the Service. Your continued use constitutes ongoing acceptance.'},
              
              {title:'2. SERVICE DESCRIPTION',content:'MandaStrong Studio provides an AI-powered video creation platform featuring 799+ artificial intelligence generation tools, media upload capabilities, multi-track editing, professional enhancement features, and export functionality supporting resolutions up to 8K. Features may vary by subscription tier.'},
              
              {title:'3. USER ACCOUNTS & REGISTRATION',content:'You must create an account to access certain features. You are responsible for maintaining confidentiality of your credentials and all activities under your account. You must provide accurate information and be at least 18 years old or have parental consent. We reserve the right to suspend or terminate accounts violating these Terms.'},
              
              {title:'4. USER CONTENT & INTELLECTUAL PROPERTY',content:'You retain all ownership rights to content you create ("User Content"). By posting to Community Hub, you grant MandaStrong a non-exclusive, worldwide, royalty-free license to display your content solely for operating the Service. You represent that you own or have necessary rights to all User Content.'},
              
              {title:'5. PROHIBITED CONDUCT',content:'You agree not to: (a) create illegal, harmful, threatening, abusive, harassing, or defamatory content; (b) infringe intellectual property rights; (c) impersonate others; (d) interfere with or disrupt the Service; (e) attempt unauthorized access; (f) distribute malware; (g) harvest user data; (h) violate applicable laws.'},
              
              {title:'6. SUBSCRIPTIONS, BILLING & PAYMENTS',content:'Subscriptions auto-renew monthly. You authorize charging your payment method each billing cycle. Cancel anytime through account settings, effective at end of current period. Refunds provided at our discretion within 14 days of initial purchase only. Stripe processes all payments. Price changes take effect next billing cycle with 30 days notice.'},
              
              {title:'7. PRIVACY & DATA PROTECTION',content:'We collect minimal data necessary for service operation including account information, usage data, uploaded content, and payment information. All data is encrypted in transit and at rest. We implement industry-standard security. We do not sell personal information. You may request data access, correction, or deletion. See Privacy Policy for details.'},
              
              {title:'8. INTELLECTUAL PROPERTY RIGHTS',content:'The Service, including software, branding, designs, and content (excluding User Content) is owned by MandaStrong Studio and protected by intellectual property laws. You receive a limited, non-exclusive license to use the Service. AI-generated content ownership transfers to users upon creation. Report copyright concerns to legal@mandastrong.com.'},
              
              {title:'9. DISCLAIMERS & WARRANTIES',content:'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE. We do not guarantee uninterrupted, secure, or error-free service. AI-generated content quality varies. You use at your own risk.'},
              
              {title:'10. LIMITATION OF LIABILITY',content:'TO THE MAXIMUM EXTENT PERMITTED BY LAW, MANDASTRONG SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR SERVICE INTERRUPTION. TOTAL LIABILITY SHALL NOT EXCEED SUBSCRIPTION FEES PAID DURING THE 12 MONTHS PRECEDING THE CLAIM.'},
              
              {title:'11. INDEMNIFICATION',content:'You agree to indemnify, defend, and hold harmless MandaStrong Studio, its officers, directors, employees from any claims, damages, losses, liabilities, and expenses (including attorneys fees) arising from: (a) your use of the Service; (b) your User Content; (c) violation of these Terms; (d) violation of any rights or laws.'},
              
              {title:'12. TERMINATION & SUSPENSION',content:'We may suspend or terminate your account immediately without notice for Terms violations, fraudulent activity, or security risks. You may terminate anytime through account settings. Upon termination: access ceases immediately; you remain liable for charges incurred; we may delete User Content per retention policy unless legally required to retain it.'},
              
              {title:'13. DISPUTE RESOLUTION & ARBITRATION',content:'Disputes shall be resolved through binding arbitration per American Arbitration Association rules, not in court. Arbitration is individual basis; CLASS ACTION WAIVER applies. Before filing, attempt informal resolution by contacting support@mandastrong.com with detailed description. If not resolved within 30 days, either party may initiate arbitration.'},
              
              {title:'14. GOVERNING LAW & JURISDICTION',content:'These Terms are governed by laws of the jurisdiction where MandaStrong Studio is incorporated, without regard to conflict of law principles. Disputes not subject to arbitration shall be brought in courts of that jurisdiction. If any provision is unenforceable, it shall be modified minimally; remaining provisions remain in effect.'},
              
              {title:'15. MODIFICATIONS TO TERMS',content:'We reserve the right to modify these Terms at any time. Material changes notified via email or Service notification 30 days before taking effect. Continued use after changes constitutes acceptance. If you disagree, stop using the Service and may terminate your account. Review Terms periodically.'},
              
              {title:'16. THIRD-PARTY SERVICES',content:'The Service may contain links to or integrate with third-party services (e.g., Stripe for payments, Supabase for storage). We are not responsible for third-party content, policies, or practices. Your use of third-party services is subject to their terms. We do not endorse third-party services.'},
              
              {title:'17. FORCE MAJEURE',content:'We are not liable for failure to perform due to circumstances beyond reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.'},
              
              {title:'18. ENTIRE AGREEMENT',content:'These Terms, together with our Privacy Policy and legal notices, constitute the entire agreement between you and MandaStrong Studio concerning the Service and supersede all prior agreements, representations, and understandings.'},
              
              {title:'19. CONTACT INFORMATION',content:'For questions about these Terms: legal@mandastrong.com or support@mandastrong.com. For payment disputes: billing@mandastrong.com. For privacy concerns: privacy@mandastrong.com. Mailing address available upon request.'},
              
              {title:'20. ACKNOWLEDGMENT',content:'BY CLICKING "ACCEPT," CREATING AN ACCOUNT, OR USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE AND ALL POLICIES REFERENCED HEREIN.'}
            ].map(section => (
              <div key={section.title} className="bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-6 mb-4">
                <h3 className="text-lg font-black text-[#7c3aed] mb-3">{section.title}</h3>
                <p className="text-zinc-300 leading-relaxed text-sm">{section.content}</p>
              </div>
            ))}
            <div className="flex gap-4 mt-8">
              <button onClick={() => setPage(1)} className="flex-1 bg-zinc-800 py-5 rounded-2xl font-black uppercase hover:bg-zinc-700 transition">DECLINE</button>
              <button onClick={() => setPage(4)} className="flex-1 bg-[#7c3aed] py-5 rounded-2xl font-black uppercase hover:bg-[#6d28d9] transition">✅ ACCEPT & CONTINUE</button>
            </div>
          </div>
        )}

        {/* PAGE 11 - EDITOR SUITE WITH DURATION SLIDER */}
        {page === 11 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-6xl font-black uppercase text-[#7c3aed] mb-12 text-center">EDITOR SUITE</h1>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-3xl p-12 mb-12 border-4 border-[#a78bfa]">
              <div className="flex items-center gap-6 mb-8">
                <Clock size={56} className="text-white"/>
                <h3 className="text-4xl font-black text-white">MOVIE DURATION</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-8xl font-black text-white">{duration}</div>
                <div className="text-2xl font-bold text-white/80 uppercase">MINUTES</div>
                <div className="text-xl text-white/60 mt-2">{Math.floor(duration/60)}h {duration%60}m</div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="180" 
                value={duration} 
                onChange={e => setDuration(Number(e.target.value))} 
                className="w-full h-4 rounded-full mb-4 cursor-pointer appearance-none bg-white/20"
                style={{accentColor:'white'}}
              />
              <div className="flex justify-between text-sm text-white/70 mb-8">
                <span>1 min</span>
                <span>30 min</span>
                <span>60 min</span>
                <span>90 min</span>
                <span>120 min</span>
                <span>180 min (3 hours)</span>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {[30,60,90,120,150,180].map(m => (
                  <button key={m} onClick={() => setDuration(m)} className={`py-4 rounded-xl font-bold text-lg transition ${duration===m?'bg-white text-[#7c3aed]':'bg-white/20 text-white hover:bg-white/30'}`}>
                    {m}min
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 21 - THANK YOU */}
        {page === 21 && (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-black via-[#7c3aed]/10 to-black">
            {/* HEADING - HALF SIZE */}
            <h1 className="text-6xl md:text-7xl font-black text-[#7c3aed] uppercase text-center mb-8 leading-tight drop-shadow-2xl">
              THAT'S ALL FOLKS!
            </h1>
            
            {/* VIDEO UNDERNEATH */}
            <div className="w-full max-w-5xl mb-8">
              <video autoPlay loop muted playsInline className="w-full rounded-3xl border-4 border-[#7c3aed] shadow-2xl">
                <source src="/ThatsAllFolks.mp4" type="video/mp4"/>
              </video>
            </div>

            {/* AUDIO PLAYER (HIDDEN) */}
            <audio autoPlay loop>
              <source src="/ThatsAllFolks.mp3" type="audio/mpeg"/>
            </audio>
            
            <p className="text-zinc-500 text-sm mt-4">♪ Audio & Video Playing ♪</p>
            
            {/* THANK YOU MESSAGE */}
            <div className="mt-12 max-w-3xl text-center">
              <p className="text-2xl text-white font-bold mb-4">Thank You For Using MandaStrong Studio!</p>
              <p className="text-zinc-400 text-lg">Your movie has been created. Share it with the world! 🎬</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
