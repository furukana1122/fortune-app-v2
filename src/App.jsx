import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  Moon, 
  Star, 
  ChevronRight,
  Lock
} from 'lucide-react';


import Kantei from './Kantei'
// import Calendar from './Calendar'

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);

  const PASS = '12345';

  const handleLogin = () => {
    if (pw === PASS) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  if (!authed) return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 w-full max-w-sm text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">鑑定システム</h1>
          <p className="text-sm text-slate-400">パスワードを入力してください</p>
        </div>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setPwError(false); }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Password"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-400 mb-3 text-center tracking-widest"
        />
        {pwError && <p className="text-red-400 text-xs mb-3">パスワードが違います</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-slate-800 text-white rounded-xl py-3 text-sm font-bold hover:bg-slate-700 transition-colors">
          入る
        </button>
      </div>
    </div>
  );

  const navigateTo = (path) => {
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] selection:bg-slate-200">
      {currentPath === '/Kantei' ? (
        <Kantei onBack={() => navigateTo('/')} />
      ) : (
        <div className="p-6 md:p-16 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-700">
          <header className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/60">
                <img 
                  src="/fortune-app-v2/cho_icon.png" 
                  alt="アイコン" 
                  className="w-12 h-12 object-contain" 
                 />
              </div>
              <div className="h-[1px] flex-grow bg-slate-200" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              鑑定システム<span className="text-slate-300 font-extralight ml-3">ポータル</span>
            </h1>
            <p className="text-slate-500 text-base tracking-wide leading-relaxed max-w-xl">
              Every man is the architect of his own fortune.
            </p>
          </header>

          <main>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 1. 鑑定ボタン (Kantei.jsを起動) */}
              <MenuButton 
                icon={<Sparkles style={{ color: '#a6b09c' }} />}
                title="Fortune Engine"
                description="命式など基本情報を出力します"
                onClick={() => navigateTo('/Kantei')}
                isActive={true}
              />

              {/* 2. メニュー2 (準備中) */}
              <MenuButton 
                icon={<Sparkles style={{ color: '#a6b09c' }} />}
                title="メニュー検討中"
                onClick={() => navigateTo('/Calendar')}
                isActive={true}
              />

              {/* 3. メニュー3 (準備中) */}
              <MenuButton 
                icon={<Star className="text-slate-400" />}
                title="メニュー検討中"
                description="開発中。"
                isActive={false}
              />
            </div>
          </main>

          <footer className="mt-32 pt-10 border-t border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] flex justify-between items-center">
            <span>© FURUKANA Garden</span>
            <span className="text-slate-300">FURUKANA Garden</span>
          </footer>
        </div>
      )}
    </div>
  );
}

function MenuButton({ icon, title, description, onClick, isActive }) {
  return (
    <button 
      onClick={isActive ? onClick : null}
      disabled={!isActive}
      className={`
        relative w-full text-left p-10 rounded-3xl border transition-all duration-500 flex flex-col h-full group
        ${isActive 
          ? 'bg-white border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-slate-300 hover:-translate-y-2' 
          : 'bg-[#F7F5F2] border-slate-200 border-dashed cursor-default opacity-60'}
      `}
    >
      {!isActive && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-slate-200/50 rounded-full flex items-center gap-1.5">
          <Lock size={10} className="text-slate-400" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Upcoming</span>
        </div>
      )}

      <div className={`
        mb-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500
        ${isActive 
          ? 'bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white' 
          : 'bg-white border border-slate-100'}
      `}>
        {React.cloneElement(icon, { size: 24, className: isActive ? 'transition-colors' : 'text-slate-200' })}
      </div>
      
      <h3 className={`text-xl font-bold mb-4 tracking-tight ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
        {title}
      </h3>
      
      <p className={`text-sm leading-relaxed mb-12 flex-grow ${isActive ? 'text-slate-400' : 'text-slate-300'}`}>
        {description}
      </p>
      
      {isActive && (
        <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">
          起動する <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </button>
  );
}