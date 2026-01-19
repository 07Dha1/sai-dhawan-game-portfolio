import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';

const AudioContext = createContext();

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within a AudioProvider');
    }
    return context;
};

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(true); // Default Muted for better UX on load until user interaction
    const [volume, setVolume] = useState(0.5);
    const [bgmPlaying, setBgmPlaying] = useState(false);

    // References to Howl instances and Synth
    const bgmRef = useRef(null);
    const synthGainRef = useRef(null); // To control volume/mute for synth
    const sfxRef = useRef({});

    const playSfx = (soundName) => {
        if (isMuted) return;
        // Placeholder for SFX logic
        console.log(`Playing SFX: ${soundName}`);
    };

    const toggleMute = () => {
        const newMuteState = !isMuted;
        setIsMuted(newMuteState);
        Howler.mute(newMuteState);

        // Handle Synth Mute
        if (synthGainRef.current) {
            synthGainRef.current.gain.setTargetAtTime(newMuteState ? 0 : 0.4, 0, 0.1);
        }

        if (!newMuteState && !bgmPlaying) {
            // Start BGM if unmuted and not playing
            playBgm(true);
        }
    };

    const playBgm = (forcePlay = false) => {
        if (bgmPlaying) return;
        if (!forcePlay && isMuted) return; // STRICT: Do not play audio if muted (unless forced).

        // Try to load external file "bgm.mp3" from public folder
        const bgm = new Howl({
            src: ['/bgm.mp3'],
            html5: true, // Force HTML5 Audio to stream large files
            loop: true,
            volume: 0.5,
            mute: forcePlay ? false : isMuted, // Ensure it inits unmuted if forced
            onload: () => {
                console.log("External BGM loaded");

                // If previously playing synth, stop it
                if (bgmRef.current && bgmRef.current.isSynth) {
                    bgmRef.current.stop();
                }

                bgm.play();
                bgmRef.current = bgm;
                setBgmPlaying(true);
            },
            onloaderror: (id, err) => {
                console.warn("External BGM failed (bgm.mp3 not found), using Interstellar Synth", err);
                playSynthBgm();
            }
        });
    };

    const playSynthBgm = () => {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        const masterGain = ctx.createGain();
        masterGain.gain.value = isMuted ? 0 : 0.4;
        masterGain.connect(ctx.destination);
        synthGainRef.current = masterGain;

        // --- Layer 1: The "Space Organ" Drone (Deep & Wide) ---
        const createDrone = (noteFreq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.value = noteFreq;

            // Lowpass filter opening and closing slowly
            filter.type = 'lowpass';
            filter.frequency.value = 200;

            // LFO for filter sweep
            const lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 0.05; // Very slow breathe
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 600;
            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);
            lfo.start();

            gain.gain.value = 0.1;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);
            osc.start();
            return { osc, lfo };
        };

        // Play A Minor Chord (A2, E3, A3, C4)
        const drones = [
            createDrone(110.00), // A2
            createDrone(164.81), // E3
            createDrone(220.00), // A3
            createDrone(261.63)  // C4
        ];

        // --- Layer 2: The "Time" Arpeggio (Crystal Plucks) ---
        // Playing notes: A4, E5, C5, E5 pattern
        const arpNotes = [440.00, 659.25, 523.25, 659.25];
        let noteIndex = 0;
        let nextNoteTime = ctx.currentTime;
        let isPlaying = true;
        let timerID;

        const scheduler = () => {
            if (!isPlaying) return;

            while (nextNoteTime < ctx.currentTime + 0.1) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.value = arpNotes[noteIndex];

                gain.gain.setValueAtTime(0.05, nextNoteTime);
                gain.gain.exponentialRampToValueAtTime(0.001, nextNoteTime + 0.5); // Pluck decay

                osc.connect(gain);
                gain.connect(masterGain);

                osc.start(nextNoteTime);
                osc.stop(nextNoteTime + 0.6);

                nextNoteTime += 0.4; // Tempo
                noteIndex = (noteIndex + 1) % arpNotes.length;
            }
            // Keep checking
            timerID = requestAnimationFrame(scheduler);
        };

        timerID = requestAnimationFrame(scheduler);

        // Store stop function
        bgmRef.current = {
            stop: () => {
                isPlaying = false;
                cancelAnimationFrame(timerID);
                drones.forEach(d => { d.osc.stop(); d.lfo.stop(); });
                ctx.close();
            },
            isSynth: true
        };

        setBgmPlaying(true);
        console.log("BGM Started (Interstellar Theme)");
    };

    useEffect(() => {
        Howler.volume(volume);
    }, [volume]);

    const value = {
        isMuted,
        toggleMute,
        volume,
        setVolume,
        playSfx,
        playBgm
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};
