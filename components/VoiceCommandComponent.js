import React, { useEffect, useState } from 'react';

const VoiceCommandComponent = ({ handleVoiceCommand }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');

    // Check for browser support and initialize SpeechRecognition
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (recognition) {
            recognition.continuous = true; // Keep listening until explicitly stopped
            recognition.interimResults = false; // Only capture final results
            recognition.lang = 'en-US'; // Set language

            recognition.onstart = () => {
                console.log('Voice recognition activated.');
            };

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptResult = event.results[current][0].transcript;
                setTranscript(transcriptResult);
                handleVoiceCommand(transcriptResult.toLowerCase().trim());
            };

            recognition.onerror = (event) => {
                setError(`Error occurred in recognition: ${event.error}`);
                console.error(event.error);
            };

            recognition.onend = () => {
                console.log('Voice recognition stopped.');
                setIsListening(false);
            };
        }
    }, [recognition, handleVoiceCommand]);

    const toggleListening = () => {
        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    return (
        <div className="voice-command-component">
            <button
                onClick={toggleListening}
                className="mb-4 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
            >
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>

            <div className="transcript-output">
                <h3 className="text-lg text-gray-200">Transcript:</h3>
                <p className="text-gray-400">{transcript}</p>
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default VoiceCommandComponent;

