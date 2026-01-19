import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import { Mail, Linkedin, Github, FileText, ChevronLeft, RefreshCw, Send, CheckCircle } from 'lucide-react';

const Level6_Contact = () => {
    const { changeLevel } = useGameState();
    const [sent, setSent] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("dhawansai1@gmail.com");
        setSent(true);
        setTimeout(() => setSent(false), 2000);
    };

    return (
        <div className="w-full flex flex-col items-center justify-start p-4 pt-40 pb-40 relative min-h-screen">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full text-center z-10"
            >
                <div className="inline-block px-3 py-1 bg-game-primary/10 text-game-primary text-xs font-mono mb-6 rounded-full border border-game-primary/30">
                    FINAL LEVEL REACHED
                </div>

                <h1 className="text-5xl md:text-7xl font-black font-orbitron text-white mb-8 tracking-tighter">
                    JOIN MY PARTY?
                </h1>

                <p className="text-gray-400 mb-12 text-lg">
                    I'm currently looking for new quests in AI Engineering and Full-Stack Development.
                    Let's build something legendary together.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                    <button
                        onClick={handleCopyEmail}
                        className="px-8 py-4 bg-game-primary text-game-bg font-bold font-orbitron rounded hover:bg-white transition-colors flex items-center gap-3 relative overflow-hidden group w-full md:w-auto justify-center"
                    >
                        {sent ? <span className="flex items-center gap-2">COPIED! <CheckCircle size={20} /></span> : <span className="flex items-center gap-2"><Mail size={20} /> dhawansai1@gmail.com</span>}
                    </button>

                    <a
                        href="/updated_job_resume.pdf"
                        download="Sai_Dhawan_Resume.pdf"
                        className="px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold font-orbitron rounded hover:bg-white/5 transition-all flex items-center gap-3 w-full md:w-auto justify-center"
                    >
                        <FileText size={20} /> DOWNLOAD RESUME
                    </a>
                </div>

                <div className="flex gap-8 justify-center mb-12">
                    <a href="https://github.com/07Dha1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                        <Github size={32} />
                    </a>
                    <a href="https://linkedin.com/in/sai-dhawan-80a22321a" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-game-primary hover:scale-110 transition-all">
                        <Linkedin size={32} />
                    </a>
                </div>

                <div className="w-full border-t border-white/10 pt-8 mt-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono text-gray-500 text-left">
                        <div className="space-y-2">
                            <div className="text-gray-300 font-bold mb-2 flex items-center gap-2 tracking-wider">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                SYSTEM STATUS
                            </div>
                            <p className="opacity-80">VERSION: 1.0.0 (STABLE)</p>
                            <p className="opacity-80">SERVER: ONLINE (Local)</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-gray-300 font-bold mb-2 tracking-wider">CREDITS</div>
                            <p className="opacity-80">DESIGN: SAI SATHYA DHAWAN</p>
                            <p className="opacity-80">DEV: SAI SATHYA DHAWAN</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-gray-300 font-bold mb-2 tracking-wider">ENGINE</div>
                            <p className="opacity-80">REACT // TAILWIND // FRAMER</p>
                            <p className="opacity-80">AUDIO: WEB AUDIO API + HOWLER</p>
                        </div>
                    </div>
                </div>

            </motion.div>

            {/* Navigation */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20 w-max">
                <button
                    onClick={() => changeLevel(4)}
                    className="p-3 bg-game-dark/50 hover:bg-white/10 border border-white/20 rounded-full transition-colors flex items-center gap-2 group text-sm text-gray-400 hover:text-white"
                >
                    <ChevronLeft size={20} /> ACHIEVEMENTS
                </button>
                <button
                    onClick={() => changeLevel(0)}
                    className="p-3 bg-game-accent/10 hover:bg-game-accent/20 border border-game-accent/30 text-game-accent rounded-full transition-colors flex items-center gap-2 group text-sm"
                >
                    <RefreshCw size={20} /> RESTART GAME
                </button>
            </div>
        </div>
    );
};

export default Level6_Contact;
