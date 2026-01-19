import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import { ChevronRight, ChevronLeft, ExternalLink, Github, Star, Sword, Shield, Lock } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "AI Excuse Generator",
        type: "Full-Stack Web App",
        difficulty: "Medium",
        xp: 1500,
        status: "Completed",
        link: "https://ai-excuse-generator-sigma.vercel.app",
        tags: ["React", "AI", "PDF Gen"],
        description: "A dynamic excuse generator using generative AI. Features authentication, PDF export, and seamless email delivery."
    },
    {
        id: 2,
        title: "Gesture Smart Cloud", // Renamed for fit
        type: "AI / Computer Vision",
        difficulty: "Hard", // Boss Level material
        xp: 3000,
        status: "Completed",
        link: "https://github.com/07Dha1/AI-Gesture-Controlled-Smart-Shopping",
        tags: ["MediaPipe", "OpenCV", "Python"],
        description: "Control shopping interfaces with hand gestures. Implements complex computer vision pipelines for real-time interaction."
    },
    {
        id: 3,
        title: "Portfolio World_V1",
        type: "Interactive Web",
        difficulty: "Hard",
        xp: 2000,
        status: "In Progress",
        link: "#",
        tags: ["React", "Game UI", "Tailwind"],
        description: "The very world you are currently exploring. A gamified professional portfolio."
    }
];

const DifficultyBadge = ({ level }) => {
    const colors = {
        Easy: "bg-green-500/20 text-green-400 border-green-500/50",
        Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        Hard: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[level] || colors.Medium}`}>
            {level.toUpperCase()}
        </span>
    );
};

const QuestCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-game-card/80 backdrop-blur-sm border border-white/10 hover:border-game-primary/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-game-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">QUEST #{project.id}</span>
                    <DifficultyBadge level={project.difficulty} />
                </div>
                <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-game-primary transition-colors">
                    {project.title}
                </h3>
            </div>
            {project.status === "Completed" ? (
                <Star className="text-game-primary w-5 h-5 fill-game-primary/20" />
            ) : (
                <Lock className="text-gray-500 w-5 h-5" />
            )}
        </div>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
            {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/5">
                    {tag}
                </span>
            ))}
        </div>

        <div className="flex items-center justify-between mt-auto relative z-10 border-t border-white/5 pt-4">
            <div className="text-xs text-game-success font-bold flex items-center gap-1">
                <span className="text-yellow-400">+</span> {project.xp} XP
            </div>

            <div className="flex gap-2">
                {project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white" aria-label="View Project">
                        {project.link.includes('github') ? <Github size={18} /> : <ExternalLink size={18} />}
                    </a>
                )}
                <button className="px-4 py-1.5 bg-game-primary/10 hover:bg-game-primary text-game-primary hover:text-game-bg font-bold text-xs uppercase rounded transition-colors border border-game-primary/20">
                    Details
                </button>
            </div>
        </div>
    </motion.div>
);

const Level3_Quests = () => {
    const { changeLevel } = useGameState();

    return (
        <div className="w-full flex flex-col items-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl mb-8 flex justify-between items-end border-b border-white/10 pb-4"
            >
                <div>
                    <h2 className="text-4xl font-orbitron font-bold text-white">QUEST BOARD</h2>
                    <p className="text-game-primary font-mono text-sm mt-1">AVAILABLE MISSIONS & ARCHIVES</p>
                </div>
                <div className="hidden md:flex gap-4">
                    {/* Fake Filter Tabs */}
                    {['ALL', 'WEB', 'AI/ML', 'COMPLETE'].map(filter => (
                        <button key={filter} className="text-xs font-bold text-gray-500 hover:text-white transition-colors px-2 py-1">
                            {filter}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {projects.map((p, i) => (
                    <QuestCard key={p.id} project={p} index={i} />
                ))}
            </div>

            {/* Navigation */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20 w-max">
                <button
                    onClick={() => changeLevel(2)}
                    className="p-3 bg-game-dark/50 hover:bg-white/10 border border-white/20 rounded-full transition-colors flex items-center gap-2 group text-sm text-gray-400 hover:text-white"
                >
                    <ChevronLeft size={20} /> SKILLS
                </button>
                <button
                    onClick={() => changeLevel(5)} // Jumping to Boss level (Special project view)
                    className="px-6 py-3 bg-game-accent text-white font-bold font-orbitron rounded-full hover:shadow-[0_0_20px_rgba(255,0,60,0.4)] transition-all flex items-center gap-2"
                >
                    <Sword size={20} /> BOSS BATTLE
                </button>
            </div>
        </div>
    );
};

export default Level3_Quests;
