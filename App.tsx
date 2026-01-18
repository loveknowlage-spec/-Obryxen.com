
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  User, 
  MessageCircle, 
  Play,
  Music,
  Plus,
  Bell,
  Sparkles,
  Pause
} from 'lucide-react';
import { View, UserNiche } from './types';
import Feed from './components/Feed';
import Explore from './components/Explore';
import Profile from './components/Profile';
import Reels from './components/Reels';
import Messages from './components/Messages';
import CreatePost from './components/CreatePost';
import Notifications from './components/Notifications';
import StoryBar from './components/StoryBar';
import MusicPlayer from './components/MusicPlayer';
import Auth from './components/Auth';
import { auth } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const ObryxenLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#93c5fd" />
      </linearGradient>
    </defs>
    <path 
      d="M35 15C25 15 15 22 15 30C15 38 25 45 35 45C42 45 48 40 52 35L58 25C62 20 68 15 75 15C85 15 95 22 95 30C95 38 85 45 75 45C68 45 62 40 58 35L52 25C48 20 42 15 35 15Z" 
      stroke="url(#logoGradient)" 
      strokeWidth="10" 
      strokeLinecap="round" 
    />
    <path 
      d="M52 35L58 25" 
      stroke="white" 
      strokeWidth="2" 
      strokeOpacity="0.4"
    />
  </svg>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.FEED);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userNiche, setUserNiche] = useState<UserNiche>('General');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth onSuccess={() => {}} />;
  }

  const handleNicheSelect = (niche: UserNiche) => {
    setUserNiche(niche);
    setActiveView(View.FEED);
  };

  const renderView = () => {
    switch (activeView) {
      case View.NICHE_PICKER:
        return (
          <div className="min-h-screen p-10 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-black text-center">Define Your Niche</h2>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {['General', 'Fitness', 'Business', 'Developer', 'Creator', 'Artist'].map((n) => (
                <button 
                  key={n}
                  onClick={() => handleNicheSelect(n as UserNiche)}
                  className="p-6 glass-card rounded-3xl font-bold hover:bg-white/10 transition-all flex flex-col items-center gap-2"
                >
                  <Sparkles size={20} className="text-blue-400" />
                  {n}
                </button>
              ))}
            </div>
          </div>
        );
      case View.FEED:
        return (
          <div className="pb-32">
            <StoryBar />
            <Feed onOpenCreate={() => setActiveView(View.CREATE)} activeNiche={userNiche} />
          </div>
        );
      case View.EXPLORE: return <Explore />;
      case View.REELS: return <Reels onBack={() => setActiveView(View.FEED)} />;
      case View.CREATE: return <CreatePost onCancel={() => setActiveView(View.FEED)} niche={userNiche} />;
      case View.NOTIFICATIONS: return <Notifications />;
      case View.PROFILE: return <Profile niche={userNiche} onUpdateNiche={() => setActiveView(View.NICHE_PICKER)} />;
      case View.MUSIC: return <MusicPlayer />;
      case View.MESSAGES: return <Messages onBack={() => setActiveView(View.FEED)} />;
      default: return <Feed activeNiche={userNiche} />;
    }
  };

  const showNav = activeView !== View.REELS && activeView !== View.MESSAGES && activeView !== View.CREATE && activeView !== View.NICHE_PICKER;
  const showTopBar = (activeView === View.FEED || activeView === View.EXPLORE || activeView === View.NOTIFICATIONS || activeView === View.MUSIC) && activeView !== View.NICHE_PICKER;

  return (
    <div className="min-h-screen bg-transparent text-white max-w-lg mx-auto relative overflow-hidden">
      {showTopBar && activeView !== View.PROFILE && (
        <header className={`fixed top-0 left-0 right-0 max-w-lg mx-auto z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center cursor-pointer" onClick={() => setActiveView(View.FEED)}>
                 <ObryxenLogo className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white">Obryxen</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveView(View.CREATE)} className="p-2.5 glass-card rounded-2xl"><Plus size={20} className="text-blue-400" /></button>
              <button onClick={() => setActiveView(View.MESSAGES)} className="p-2.5 glass-card rounded-2xl"><MessageCircle size={20} className="text-zinc-400" /></button>
              <button onClick={() => setActiveView(View.NOTIFICATIONS)} className="p-2.5 glass-card rounded-2xl"><Bell size={20} className="text-zinc-400" /></button>
            </div>
          </div>
        </header>
      )}

      <main className={`${(showTopBar && activeView !== View.PROFILE) ? 'pt-20' : ''}`}>
        {renderView()}
      </main>

      {/* Mini Sticky Player - Adjusted distance and removed profile image */}
      {showNav && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[45] animate-in slide-in-from-bottom-4">
           <div className="glass-nav rounded-2xl p-3 px-5 border border-white/10 flex items-center gap-3 shadow-2xl backdrop-blur-2xl">
              <div className="flex-1 min-w-0">
                 <p className="text-[11px] font-black text-white truncate uppercase tracking-widest">Mad love</p>
                 <p className="text-[9px] text-white/40 font-bold truncate">Mabel</p>
              </div>
              <div className="flex items-center gap-4 pr-1">
                 <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                 >
                    {isPlaying ? <Pause size={14} fill="white" className="text-white" /> : <Play size={14} fill="white" className="text-white ml-0.5" />}
                 </button>
                 <button className="text-white/20 hover:text-white transition-colors">
                    <Music size={14} />
                 </button>
              </div>
           </div>
        </div>
      )}

      {showNav && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-sm z-50">
          <nav className="glass-nav rounded-full py-3 px-6 flex items-center justify-between shadow-2xl border border-white/10">
            <NavIcon active={activeView === View.FEED} onClick={() => setActiveView(View.FEED)} icon={<Home size={22} />} />
            <NavIcon active={activeView === View.EXPLORE} onClick={() => setActiveView(View.EXPLORE)} icon={<Search size={22} />} />
            <button onClick={() => setActiveView(View.MUSIC)} className={`p-3.5 rounded-full transition-all ${activeView === View.MUSIC ? 'bg-white text-black scale-110' : 'bg-white/5 text-white'}`}>
              <Music size={22} strokeWidth={activeView === View.MUSIC ? 3 : 2} />
            </button>
            <NavIcon active={activeView === View.REELS} onClick={() => setActiveView(View.REELS)} icon={<Play size={22} />} />
            <NavIcon active={activeView === View.PROFILE} onClick={() => setActiveView(View.PROFILE)} icon={<User size={22} />} />
          </nav>
        </div>
      )}
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean; icon: React.ReactNode; onClick: () => void }> = ({ active, icon, onClick }) => (
  <button onClick={onClick} className={`transition-all relative p-2 ${active ? 'text-white scale-110' : 'text-zinc-500'}`}>
    {icon}
    {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-white shadow-sm" />}
  </button>
);

export default App;
