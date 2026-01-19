import React, { createContext, useContext, useState, useEffect } from 'react';

const GameStateContext = createContext();

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};

export const GameStateProvider = ({ children }) => {
    const [currentLevel, setCurrentLevel] = useState(0); // 0: Start, 1: Profile, 2: Skills, etc.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Player Stats (RPG Style)
    const [playerStats, setPlayerStats] = useState({
        frontend: 4,
        backend: 3,
        ai_ml: 4, // Boosted due to specialization
        computer_vision: 3,
        creativity: 5,
        level: 1,
        xp: 0,
        maxXp: 100
    });

    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [visitedLevels, setVisitedLevels] = useState([0]);

    // Initial load simulation
    const [isGameLoaded, setIsGameLoaded] = useState(false);

    useEffect(() => {
        // Simulate initial asset loading
        const timer = setTimeout(() => {
            setIsGameLoaded(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const changeLevel = (levelIndex) => {
        setCurrentLevel(levelIndex);
        if (!visitedLevels.includes(levelIndex)) {
            setVisitedLevels(prev => [...prev, levelIndex]);
            gainXp(10); // Exploration XP
        }
    };

    const gainXp = (amount) => {
        setPlayerStats(prev => {
            const newXp = prev.xp + amount;
            if (newXp >= prev.maxXp) {
                return {
                    ...prev,
                    level: prev.level + 1,
                    xp: newXp - prev.maxXp,
                    maxXp: Math.floor(prev.maxXp * 1.5)
                };
            }
            return { ...prev, xp: newXp };
        });
    };

    const unlockAchievement = (id) => {
        if (!unlockedAchievements.includes(id)) {
            setUnlockedAchievements(prev => [...prev, id]);
            gainXp(50);
            // In a real app, trigger a toast notification here
        }
    };

    const value = {
        currentLevel,
        changeLevel,
        isMenuOpen,
        setIsMenuOpen,
        playerStats,
        gainXp,
        unlockedAchievements,
        unlockAchievement,
        visitedLevels,
        isGameLoaded
    };

    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    );
};
