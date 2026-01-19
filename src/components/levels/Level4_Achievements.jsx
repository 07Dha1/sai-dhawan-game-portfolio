import React from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import { ChevronRight, ChevronLeft, Award, Lock, Trophy, Star, Brain, Eye, Code, Zap, MessageSquare, Github } from 'lucide-react';

const badges = [
    { id: 1, name: "AI/ML Core Student", icon: Brain, unlocked: true, desc: "Mastered the fundamentals of AI." },
    { id: 2, name: "Computer Vision Builder", icon: Eye, unlocked: true, desc: "Built advanced vision systems." },
    { id: 3, name: "Full-Stack Dev", icon: Code, unlocked: true, desc: "Bridge between backend and frontend." },
    { id: 4, name: "Motion UI Creator", icon: Zap, unlocked: true, desc: "Crafting fluid user interfaces." },
    { id: 5, name: "Communicator", icon: MessageSquare, unlocked: true, desc: "Conveying complex ideas clearly." },
    { id: 6, name: "Open Source Contributor", icon: Github, unlocked: false, desc: "Coming soon..." },
];

const AchievementCard = ({ badge, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative p-6 rounded-xl border flex flex-col items-center text-center gap-3 transition-all duration-300
        ${badge.unlocked
                ? 'bg-game-card/80 border-game-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:border-game-primary hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                : 'bg-game-dark/50 border-white/5 opacity-50 grayscale'}`}
    >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2
             ${badge.unlocked ? 'bg-gradient-to-br from-game-primary/20 to-game-secondary/20 text-game-primary' : 'bg-white/5 text-gray-500'}`}>
            {badge.unlocked ? <badge.icon size={32} /> : <Lock size={32} />}
        </div>

        <h3 className="font-orbitron font-bold text-white text-sm">{badge.name}</h3>
        <p className="text-xs text-gray-400">{badge.desc}</p>

        {badge.unlocked && (
            <div className="absolute top-3 right-3 text-yellow-500">
                <Star size={12} fill="currentColor" />
            </div>
        )}
    </motion.div>
);

const Level4_Achievements = () => {
    const { changeLevel, playerStats } = useGameState();

    return (
        <div className="w-full flex flex-col items-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-2 text-game-warning">
                    <Trophy className="text-yellow-500" size={32} />
                    <h2 className="text-4xl font-orbitron font-bold text-white">TROPHY CASE</h2>
                    <Trophy className="text-yellow-500" size={32} />
                </div>
                <p className="text-game-primary font-mono text-sm">TOTAL XP: {playerStats.xp} / {playerStats.maxXp}</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-20">
                {badges.map((badge, i) => (
                    <AchievementCard key={badge.id} badge={badge} index={i} />
                ))}
            </div>

            {/* Navigation */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20 w-max">
                <button
                    onClick={() => changeLevel(5)} // Back to Boss if needed, or Quests
                    className="p-3 bg-game-dark/50 hover:bg-white/10 border border-white/20 rounded-full transition-colors flex items-center gap-2 group text-sm text-gray-400 hover:text-white"
                >
                    <ChevronLeft size={20} /> BOSS LOG
                </button>
                <button
                    onClick={() => changeLevel(6)}
                    className="px-6 py-3 bg-game-primary text-game-bg font-bold font-orbitron rounded-full hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
                >
                    CONTACT <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Level4_Achievements;
