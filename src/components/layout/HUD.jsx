import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import AudioToggle from '../audio/AudioToggle';
import { motion } from 'framer-motion';

const HUD = () => {
    const { playerStats, currentLevel } = useGameState();

    return (
        <div className="fixed inset-0 pointer-events-none z-40 p-6 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 bg-game-dark/80 backdrop-blur-md p-3 rounded-br-2xl border-l-4 border-b border-game-primary border-t-0 border-r-0"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-game-primary to-game-secondary flex items-center justify-center font-bold text-xl border-2 border-white shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                            {playerStats.level}
                        </div>
                        <div>
                            <div className="text-xs text-game-primary font-orbitron tracking-widest">PLAYER</div>
                            <div className="text-white font-bold text-lg leading-none">SAI DHAWAN</div>
                            {/* XP Bar */}
                            <div className="w-32 h-1.5 bg-game-bg mt-1 rounded-full overflow-hidden border border-white/20">
                                <motion.div
                                    className="h-full bg-game-success"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(playerStats.xp / playerStats.maxXp) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="pointer-events-auto">
                    <AudioToggle />
                </div>
            </div>

            {/* Bottom Bar / Level Indicator */}
            <div className="flex justify-between items-end">
                <motion.div
                    className="text-game-primary font-orbitron text-xs tracking-[0.3em] opacity-70"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    SYS.ONLINE // PORTFOLIO_V1.0
                </motion.div>

                <div className="text-right">
                    <div className="text-game-accent font-orbitron text-sm">CURRENT LEVEL</div>
                    <div className="text-4xl font-bold font-orbitron text-white text-glow">
                        {currentLevel < 10 ? `0${currentLevel}` : currentLevel}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HUD;
