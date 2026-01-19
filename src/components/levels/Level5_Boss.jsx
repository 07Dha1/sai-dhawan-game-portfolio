import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import { ChevronRight, ChevronLeft, Github, Play, AlertTriangle, CheckCircle, Zap, Trophy } from 'lucide-react';

const Level5_Boss = () => {
    const { changeLevel } = useGameState();
    const [phase, setPhase] = useState('intro');
    const [showBackBtn, setShowBackBtn] = useState(false);

    // Scroll Observer to detect when user scrolls down
    const scrollTriggerRef = React.useCallback(node => {
        if (node !== null) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    // If top is NOT intersecting (scrolled past), show button
                    setShowBackBtn(!entry.isIntersecting);
                },
                { threshold: 0 }
            );
            observer.observe(node);
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-start text-white p-4 pt-40 pb-40 relative min-h-screen">
            {/* Scroll Trigger (Invisible watcher at the top) */}
            <div ref={scrollTriggerRef} className="absolute top-0 w-full h-10 pointer-events-none" />

            {/* Boss Health Bar / Project Progress */}
            <div className="w-full max-w-3xl px-8 z-20 mb-8 mt-4">
                <div className="flex justify-between text-xs font-bold font-orbitron text-game-accent mb-1 uppercase tracking-widest">
                    <span>Boss: Gesture AI Shopping System</span>
                    <span>DIFFICULTY: HARD</span>
                </div>
                <div className="h-4 bg-game-dark border border-game-accent/50 rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,0,60,0.3)]">
                    <motion.div
                        className="h-full bg-game-accent"
                        initial={{ width: "100%" }}
                        animate={{ width: phase === 'intro' ? "100%" : phase === 'battle' ? "50%" : "0%" }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {phase === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="text-center z-10 max-w-4xl"
                    >
                        <motion.div
                            className="inline-block px-4 py-1 border border-game-accent text-game-accent font-bold mb-6 rounded uppercase tracking-widest"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            Warning: Boss Approaching
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black font-orbitron text-white mb-6 leading-tight drop-shadow-lg">
                            SMART SHOPPING<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-accent to-purple-600">GESTURE AI</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                            A revolutionary computer vision system that allows contactless interaction with shopping interfaces using simple hand gestures.
                        </p>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-game-accent to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <button
                                onClick={() => setPhase('battle')}
                                className="relative px-12 py-5 bg-game-bg border border-game-accent text-white font-bold font-orbitron text-2xl rounded-lg hover:bg-game-accent/10 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,60,0.4)] hover:shadow-[0_0_50px_rgba(255,0,60,0.6)] hover:scale-105 mb-24 flex items-center gap-4 mx-auto"
                            >
                                <Play className="fill-current" /> ENGAGE PROJECT
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === 'battle' && (
                    <motion.div
                        key="battle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10 mt-12"
                    >
                        {/* Phase 1: Problem */}
                        <div className="bg-game-card/90 border border-game-accent/30 p-6 rounded-xl backdrop-blur-md">
                            <div className="w-12 h-12 rounded-full bg-game-accent/20 flex items-center justify-center mb-4 text-game-accent">
                                <AlertTriangle />
                            </div>
                            <h3 className="text-xl font-bold font-orbitron mb-2">THE CHALLENGE</h3>
                            <p className="text-sm text-gray-400">
                                Touchscreens in public spaces are unhygienic, and traditional shopping experiences lack interactivity. The goal was to create a contactless, immersive interface.
                            </p>
                        </div>

                        {/* Phase 2: Solution */}
                        <div className="bg-game-card/90 border border-game-primary/30 p-6 rounded-xl backdrop-blur-md md:-translate-y-4 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                            <div className="w-12 h-12 rounded-full bg-game-primary/20 flex items-center justify-center mb-4 text-game-primary">
                                <Zap />
                            </div>
                            <h3 className="text-xl font-bold font-orbitron mb-2">THE TECH STACK</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-game-primary rounded-full"></div>MediaPipe for Hand Tracking</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-game-primary rounded-full"></div>OpenCV for Vision Processing</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-game-primary rounded-full"></div>Python Core Logic</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-game-primary rounded-full"></div>Real-time Low Latency</li>
                            </ul>
                        </div>

                        {/* Phase 3: Impact */}
                        <div className="bg-game-card/90 border border-green-500/30 p-6 rounded-xl backdrop-blur-md">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                                <CheckCircle />
                            </div>
                            <h3 className="text-xl font-bold font-orbitron mb-2">THE VICTORY</h3>
                            <p className="text-sm text-gray-400">
                                Achieved 95% gesture recognition accuracy. Successfully demoed a fully functional contactless checkout flow.
                            </p>
                        </div>

                        <div className="md:col-span-3 flex justify-center mt-8">
                            <button
                                onClick={() => setPhase('victory')}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded font-orbitron tracking-widest transition-all"
                            >
                                DEFEAT BOSS (VIEW CODE)
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === 'victory' && (
                    <motion.div
                        key="victory"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="text-center z-10"
                    >
                        <h2 className="text-5xl font-black font-orbitron text-game-success mb-6 drop-shadow-[0_0_15px_rgba(0,255,100,0.5)]">
                            MISSION COMPLETE
                        </h2>
                        <p className="text-xl text-white mb-8">
                            You have explored the depths of this project.
                        </p>

                        <div className="flex gap-6 justify-center">
                            <a
                                href="https://github.com/07Dha1/AI-Gesture-Controlled-Smart-Shopping"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600"
                            >
                                <Github /> View on GitHub
                            </a>
                            <button
                                onClick={() => changeLevel(4)} // Next level: Achievements (or contact)
                                className="flex items-center gap-3 px-6 py-3 bg-game-primary hover:bg-game-primary/80 text-game-bg font-bold rounded-lg transition-colors"
                            >
                                Claim Loot (Next Level) <ChevronRight />
                            </button>
                        </div>
                        <button onClick={() => setPhase('intro')} className="mt-8 text-gray-500 text-sm underline">Replay Boss Fight</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Overlay - Top Left for Boss Level */}
            <div className="fixed top-8 left-8 z-50">
                <button
                    onClick={() => changeLevel(3)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <div className="p-2 border border-white/20 rounded-full group-hover:bg-white/10 transition-colors">
                        <ChevronLeft size={20} />
                    </div>
                    <span className="font-orbitron text-xs tracking-widest hidden md:block">RETREAT</span>
                </button>
            </div>

            {/* Scroll-activated Back Button (To Level 4) */}
            <AnimatePresence>
                {showBackBtn && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <button
                            onClick={() => changeLevel(4)}
                            className="flex items-center gap-2 px-6 py-3 bg-game-card/90 backdrop-blur border border-white/30 rounded-full hover:bg-white/20 transition-all font-orbitron text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                            <Trophy size={18} className="text-yellow-400" />
                            <span>TROPHY ROOM</span>
                            <ChevronRight size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Level5_Boss;
