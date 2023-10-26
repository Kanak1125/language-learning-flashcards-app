import { useState, useEffect } from 'react';

export function useTextToSpeech(text) {
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const VOICE_INDEX = 2;

    useEffect(() => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const u = new SpeechSynthesisUtterance(text);
        u.voice = voices[VOICE_INDEX];
        
        setUtterance(u);
        return () => synth.cancel();
    }, [text]);
    
    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        }

        synth.speak(utterance);
        setIsPaused(false);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();
        setIsPaused(false);
    }

    return [ handlePlay, handleStop ];
}