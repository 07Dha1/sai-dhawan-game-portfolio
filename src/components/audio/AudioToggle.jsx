import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioToggle = () => {
    const { isMuted, toggleMute } = useAudio();

    return (
        <motion.button
            onClick={toggleMute}
            className="p-2 border border-game-primary/30 rounded-full bg-game-dark/80 backdrop-blur-sm hover:bg-game-primary/20 hover:border-game-primary transition-colors z-50 pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Audio"
        >
            {isMuted ? (
                <VolumeX className="w-6 h-6 text-game-accent" />
            ) : (
                <Volume2 className="w-6 h-6 text-game-primary animate-pulse" />
            )}
        </motion.button>
    );
};

export default AudioToggle;
