import React from 'react';
import HUD from './HUD';
import { useGameState } from '../../context/GameStateContext';
// Levels will be imported here
import Level0_Start from '../levels/Level0_Start';
import Level1_Profile from '../levels/Level1_Profile';
import Level2_Skills from '../levels/Level2_Skills';
import Level3_Quests from '../levels/Level3_Quests';
import Level4_Achievements from '../levels/Level4_Achievements';
import Level5_Boss from '../levels/Level5_Boss';
import Level6_Contact from '../levels/Level6_Contact';

const GameContainer = () => {
    const { currentLevel } = useGameState();

    // Mapping levels to components
    const renderLevel = () => {
        switch (currentLevel) {
            case 0: return <Level0_Start />;
            case 1: return <Level1_Profile />;
            case 2: return <Level2_Skills />;
            case 3: return <Level3_Quests />;
            case 4: return <Level4_Achievements />;
            case 5: return <Level5_Boss />;
            case 6: return <Level6_Contact />;
            default: return <div className="flex items-center justify-center h-full">Level {currentLevel} Under Construction</div>;
        }
    };

    return (
        <div className="w-full h-full relative font-sans text-white">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-game-bg -z-20"></div>
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-20 -z-10 pointer-events-none perspective-origin-center transform-gpu"></div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a12_100%)] pointer-events-none -z-10"></div>

            {currentLevel > 0 && <HUD />}

            <main className="w-full h-full relative z-0 overflow-y-auto overflow-x-hidden">
                {renderLevel()}
            </main>
        </div>
    );
};

export default GameContainer;
