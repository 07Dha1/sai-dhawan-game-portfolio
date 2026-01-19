import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import {
    ChevronRight, ChevronLeft, Cpu, Database, Layout, PenTool, Code, Server, Globe,
    Cpu as CpuIcon, Terminal, Brain, Type
} from 'lucide-react';

const skills = {
    frontend: [
        { name: "React", level: 5, icon: Code },
        { name: "Tailwind", level: 5, icon: Layout },
        { name: "Three.js", level: 3, icon: Globe },
        { name: "JavaScript", level: 5, icon: Code },
    ],
    backend: [
        { name: "Node.js", level: 4, icon: Server },
        { name: "Python", level: 4, icon: Terminal },
        { name: "MongoDB", level: 3, icon: Database },
    ],
    ai_ml: [
        { name: "OpenCV", level: 4, icon: CpuIcon },
        { name: "MediaPipe", level: 4, icon: CpuIcon },
        { name: "PyTorch", level: 3, icon: Brain },
        { name: "NLP", level: 3, icon: Type },
    ]
};


const SkillNode = ({ skill, category, delay, onSelect, isSelected }) => (
    <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: "spring" }}
        onClick={() => onSelect(skill)}
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 group
        ${isSelected
                ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110'
                : 'border-white/20 bg-game-dark/50 hover:border-game-primary hover:bg-game-primary/10'
            }`}
    >
        <skill.icon className={`w-8 h-8 mb-1 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-game-primary'}`} />
        <span className="text-[10px] md:text-xs font-mono text-center opacity-70 group-hover:opacity-100">{skill.name}</span>

        {/* Connection Lines simulation (visual only) */}
        <div className="absolute top-1/2 left-full w-8 h-0.5 bg-white/10 -z-10 group-hover:bg-game-primary/50 transition-colors hidden md:block" />
    </motion.button>
);

const Level2_Skills = () => {
    const { changeLevel } = useGameState();
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <div className="w-full flex flex-col items-center p-4">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-primary to-game-secondary mb-12 text-center"
            >
                SKILL MATRIX
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl relative">

                {/* Categories */}
                {Object.entries(skills).map(([category, items], catIndex) => (
                    <div key={category} className="flex flex-col items-center gap-6">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + catIndex * 0.2 }}
                            className="font-orbitron text-xl text-game-primary uppercase tracking-widest border-b border-game-primary/30 pb-2 w-full text-center"
                        >
                            {category.replace('_', ' / ')}
                        </motion.h3>

                        <div className="flex flex-wrap justify-center gap-4">
                            {items.map((skill, index) => (
                                <SkillNode
                                    key={skill.name}
                                    skill={skill}
                                    delay={0.8 + index * 0.1 + catIndex * 0.2}
                                    onSelect={setSelectedSkill}
                                    isSelected={selectedSkill?.name === skill.name}
                                />
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            {/* Detail View Overlay / Modal simulation at bottom */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-game-card/90 backdrop-blur-xl p-6 rounded-2xl border border-game-primary/30 shadow-2xl z-20 flex items-center gap-6"
                    >
                        <div className="p-4 bg-game-dark rounded-xl border border-white/10">
                            <selectedSkill.icon className="w-12 h-12 text-game-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold font-orbitron text-white mb-2">{selectedSkill.name}</h3>
                            <div className="w-full h-2 bg-game-dark rounded-full overflow-hidden border border-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-game-primary to-game-secondary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(selectedSkill.level / 5) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
                                <span>PROFICIENCY</span>
                                <span>{selectedSkill.level}/5</span>
                            </div>
                        </div>
                        <button onClick={() => setSelectedSkill(null)} className="text-gray-500 hover:text-white">close</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10 w-max">
                <button
                    onClick={() => changeLevel(1)}
                    className="p-3 bg-game-dark/50 hover:bg-white/10 border border-white/20 rounded-full transition-colors flex items-center gap-2 group text-sm text-gray-400 hover:text-white"
                >
                    <ChevronLeft size={20} /> PROFILE
                </button>
                <button
                    onClick={() => changeLevel(3)}
                    className="px-6 py-3 bg-game-primary text-game-bg font-bold font-orbitron rounded-full hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
                >
                    QUESTS (Projects) <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Level2_Skills;
