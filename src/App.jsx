import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, User, RotateCcw, Play, ChevronRight, Hash } from 'lucide-react';

const App = () => {
    const [mode, setMode] = useState(null); // 'single', 'two'
    const [step, setStep] = useState(0); // For multi-step input
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [p1, setP1] = useState({ name: '', number: '' });
    const [p2, setP2] = useState({ name: '', number: '' });

    const resetGame = () => {
        setMode(null);
        setStep(0);
        setResult(null);
        setP1({ name: '', number: '' });
        setP2({ name: '', number: '' });
    };

    const playSingle = () => {
        if (!p1.number || p1.number < 1 || p1.number > 10) return;
        setLoading(true);
        setTimeout(() => {
            const computerNumber = Math.floor(Math.random() * 10) + 1;
            const sum = parseInt(p1.number) + computerNumber;
            const isEven = sum % 2 === 0;
            const userIsEven = parseInt(p1.number) % 2 === 0;
            const userWins = isEven === userIsEven;

            setResult({
                sum,
                outcome: isEven ? 'EVEN' : 'ODD',
                winner: userWins ? (p1.name || 'Player') : 'Computer',
                p1Value: p1.number,
                p2Value: computerNumber,
                p2Name: 'Computer'
            });
            setLoading(false);
        }, 800);
    };

    const playTwo = () => {
        if (!p2.number || p2.number < 1 || p2.number > 10) return;
        setLoading(true);
        setTimeout(() => {
            const sum = parseInt(p1.number) + parseInt(p2.number);
            const isEven = sum % 2 === 0;
            const p1IsEven = parseInt(p1.number) % 2 === 0;
            const p1Wins = isEven === p1IsEven;

            setResult({
                sum,
                outcome: isEven ? 'EVEN' : 'ODD',
                winner: p1Wins ? (p1.name || 'Player 1') : (p2.name || 'Player 2'),
                p1Value: p1.number,
                p2Value: p2.number,
                p2Name: p2.name || 'Player 2'
            });
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass rounded-3xl p-8 overflow-hidden relative"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Hash size={120} />
                </div>

                <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Odd or Even
                </h1>

                <AnimatePresence mode="wait">
                    {!mode && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                        >
                            <button
                                onClick={() => setMode('single')}
                                className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                                        <User size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold">Single Player</p>
                                        <p className="text-xs text-slate-400">Challenge the CPU</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                            </button>

                            <button
                                onClick={() => setMode('two')}
                                className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                                        <Users size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold">Two Player</p>
                                        <p className="text-xs text-slate-400">Local multiplayer</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                            </button>
                        </motion.div>
                    )}

                    {mode === 'single' && !result && (
                        <motion.div
                            key="single-input"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Your Name</label>
                                <input
                                    type="text"
                                    value={p1.name}
                                    onChange={(e) => setP1({ ...p1, name: e.target.value })}
                                    placeholder="Enter name..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Choose a Number (1-10)</label>
                                <input
                                    type="number"
                                    min="1" max="10"
                                    value={p1.number}
                                    onChange={(e) => setP1({ ...p1, number: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50"
                                />
                            </div>
                            <button
                                onClick={playSingle}
                                disabled={loading || !p1.number}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                            >
                                {loading ? 'Rolling...' : 'Play Now'}
                            </button>
                        </motion.div>
                    )}

                    {mode === 'two' && !result && (
                        <motion.div
                            key="two-input"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="flex gap-2 mb-4">
                                <div className={`h-1 flex-1 rounded-full ${step === 0 ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                <div className={`h-1 flex-1 rounded-full ${step === 1 ? 'bg-emerald-500' : 'bg-white/20'}`} />
                            </div>

                            {step === 0 ? (
                                <div className="space-y-4">
                                    <h2 className="font-semibold text-emerald-400">Player 1 Settings</h2>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400">Name</label>
                                        <input
                                            type="text"
                                            value={p1.name}
                                            onChange={(e) => setP1({ ...p1, name: e.target.value })}
                                            placeholder="Player 1"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400">Secret Number (1-10)</label>
                                        <input
                                            type="password"
                                            min="1" max="10"
                                            value={p1.number}
                                            onChange={(e) => setP1({ ...p1, number: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 text-center text-2xl tracking-widest"
                                        />
                                    </div>
                                    <button
                                        onClick={() => p1.number && setStep(1)}
                                        disabled={!p1.number}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                                    >
                                        Next Player
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h2 className="font-semibold text-emerald-400">Player 2 Settings</h2>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400">Name</label>
                                        <input
                                            type="text"
                                            value={p2.name}
                                            onChange={(e) => setP2({ ...p2, name: e.target.value })}
                                            placeholder="Player 2"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400">Number (1-10)</label>
                                        <input
                                            type="number"
                                            min="1" max="10"
                                            value={p2.number}
                                            onChange={(e) => setP2({ ...p2, number: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50"
                                        />
                                    </div>
                                    <button
                                        onClick={playTwo}
                                        disabled={loading || !p2.number}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                                    >
                                        {loading ? 'Calculating...' : 'See Results'}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            key="result"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-6"
                        >
                            <div className="space-y-1">
                                <p className="text-slate-400 uppercase tracking-widest text-sm">Winner</p>
                                <div className="flex items-center justify-center gap-3">
                                    <Trophy className="text-yellow-400" size={32} />
                                    <h2 className="text-4xl font-black text-white">{result.winner}</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <p className="text-xs text-slate-500 mb-1">{p1.name || 'Player 1'}</p>
                                    <p className="text-2xl font-bold">{result.p1Value}</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <p className="text-xs text-slate-500 mb-1">{result.p2Name}</p>
                                    <p className="text-2xl font-bold">{result.p2Value}</p>
                                </div>
                            </div>

                            <div className="py-6 border-y border-white/5">
                                <div className="flex items-center justify-center gap-4 text-2xl">
                                    <span className="font-bold text-slate-300">Sum: {result.sum}</span>
                                    <span className={`px-4 py-1 rounded-full text-xs font-black ${result.outcome === 'EVEN' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                                        }`}>
                                        {result.outcome}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={resetGame}
                                className="group flex items-center justify-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors"
                            >
                                <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                Play Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <footer className="mt-8 text-slate-500 text-sm flex gap-4">
                <span>Developed with love</span>
                <span>•</span>
                <span>BVM College</span>
            </footer>
        </div>
    );
};

export default App;
