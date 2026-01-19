import React from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../../context/GameStateContext';
import { useAudio } from '../../context/AudioContext';

const Level0_Start = () => {
    const { changeLevel } = useGameState();
    const { playBgm } = useAudio();

    const handleStart = () => {
        playBgm();
        changeLevel(1);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-10"
            >
                <motion.h1
                    className="text-6xl md:text-8xl font-orbitron font-black text-white mb-4 tracking-tighter"
                    animate={{ textShadow: ["0 0 10px #00f0ff", "0 0 20px #00f0ff", "0 0 10px #00f0ff"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    SAI DHAWAN
                </motion.h1>
                <div className="text-xl md:text-2xl text-game-primary font-mono mb-12 tracking-widest">
                    AI ENGINEER // FULL STACK
                </div>

                <motion.button
                    onClick={handleStart}
                    className="px-12 py-4 bg-transparent border-2 border-game-primary text-game-primary font-orbitron text-xl uppercase hover:bg-game-primary hover:text-game-bg transition-all duration-300 relative group overflow-hidden"
                    whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="relative z-10">Start Game</span>
                    <div className="absolute inset-0 bg-game-primary/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Level0_Start;
