import React from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import { User, Cpu, Code, Brain, Terminal, ChevronRight } from 'lucide-react';

const StatRow = ({ label, value, icon: Icon, color }) => {
    // Explicit color mapping for Tailwind to detect and bundle the classes correctly
    const colorMap = {
        'game-primary': {
            bg: 'bg-game-primary',
            text: 'text-game-primary',
            border: 'border-game-primary/50',
            bgOp: 'bg-game-primary/10'
        },
        'game-secondary': {
            bg: 'bg-game-secondary',
            text: 'text-game-secondary',
            border: 'border-game-secondary/50',
            bgOp: 'bg-game-secondary/10'
        },
        'game-accent': {
            bg: 'bg-game-accent',
            text: 'text-game-accent',
            border: 'border-game-accent/50',
            bgOp: 'bg-game-accent/10'
        },
        'game-success': {
            bg: 'bg-game-success',
            text: 'text-game-success',
            border: 'border-game-success/50',
            bgOp: 'bg-game-success/10'
        }
    };

    const styles = colorMap[color] || colorMap['game-primary'];

    return (
        <div className="flex items-center gap-4 mb-4">
            <div className={`p-2 rounded-lg ${styles.bgOp} border ${styles.border}`}>
                <Icon className={`w-5 h-5 ${styles.text}`} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 font-mono">{label}</span>
                    <span className={`${styles.text} font-bold`}>{value}/5</span>
                </div>
                <div className="h-2 bg-game-dark border border-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full ${styles.bg}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(value / 5) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
            </div>
        </div>
    );
};

const Level1_Profile = () => {
    const { playerStats, changeLevel } = useGameState();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="w-full min-h-min flex items-center justify-center p-4">
            <motion.div
                className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Character Card - Left Col */}
                <motion.div
                    className="lg:col-span-4 bg-game-card/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 relative overflow-hidden group"
                    variants={itemVariants}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-game-primary/5 to-game-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Avatar Placeholder */}
                    <div className="w-full aspect-square bg-game-dark rounded-xl mb-6 relative overflow-hidden border-2 border-game-primary/30">
                        {/* In a real app, this would be a photo */}
                        <div className="absolute inset-0 flex items-center justify-center text-game-primary/20">
                            <User size={100} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-game-bg to-transparent p-4">
                            <h2 className="text-2xl font-orbitron font-bold text-white">SAI DHAWAN</h2>
                            <p className="text-game-primary font-mono text-sm">LVL {playerStats.level} AI ENGINEER</p>
                        </div>
                    </div>

                    <div className="space-y-4 font-mono text-sm text-gray-400">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>CLASS</span>
                            <span className="text-white">Technomancer</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>ORIGIN</span>
                            <span className="text-white">India</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>GUILD</span>
                            <span className="text-white">Open To Work</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Stats - Middle Col */}
                <motion.div
                    className="lg:col-span-5 flex flex-col justify-center"
                    variants={itemVariants}
                >
                    <h3 className="text-3xl font-orbitron font-bold text-white mb-8 border-l-4 border-game-primary pl-4">
                        PLAYER STATS
                    </h3>

                    <div className="space-y-2">
                        <StatRow label="AI / MACH. LEARNING" value={playerStats.ai_ml} icon={Brain} color="game-primary" />
                        <StatRow label="FRONTEND DEV" value={playerStats.frontend} icon={Code} color="game-secondary" />
                        <StatRow label="COMPUTER VISION" value={playerStats.computer_vision} icon={Cpu} color="game-accent" />
                        <StatRow label="BACKEND OPS" value={playerStats.backend} icon={Terminal} color="game-success" />
                    </div>

                    <div className="mt-8 p-4 bg-game-primary/10 rounded-lg border border-game-primary/20">
                        <h4 className="text-game-primary font-bold mb-2 flex items-center gap-2">
                            <Terminal size={16} />
                            BIO_LOG.txt
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Specialized in bridging the gap between advanced AI models and intuitive user interfaces.
                            Passionate about Computer Vision and crafting "Game-feel" web experiences.
                        </p>
                    </div>
                </motion.div>

                {/* Actions - Right Col */}
                <motion.div
                    className="lg:col-span-3 flex flex-col justify-end gap-4"
                    variants={itemVariants}
                >
                    <button
                        onClick={() => changeLevel(2)}
                        className="w-full p-6 bg-game-card hover:bg-game-primary/20 border border-game-primary/30 hover:border-game-primary transition-all group text-left rounded-xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-game-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="text-xs text-game-primary font-mono mb-1">NEXT MISSION</div>
                            <div className="text-xl font-orbitron font-bold text-white flex items-center justify-between">
                                SKILL TREE <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => changeLevel(3)} // Jump to quests
                        className="w-full p-4 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left rounded-xl"
                    >
                        <div className="text-xs text-gray-500 font-mono mb-1">JUMP TO</div>
                        <div className="text-lg font-orbitron text-gray-300">QUEST BOARD</div>
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Level1_Profile;
