"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface VoiceInputOptions {
  onFinalTranscript: (transcript: string) => void;
  language?: string;
}

export function useVoiceInput({ onFinalTranscript, language = "en-US" }: VoiceInputOptions) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const callbackRef = useRef(onFinalTranscript);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    callbackRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  useEffect(() => {
    setIsSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => recognitionRef.current?.abort();
  }, []);

  const start = useCallback(() => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setError("Voice input is not supported in this browser. You can still describe your site below.");
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.onresult = (event) => {
      let interim = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript.trim();
        if (!transcript) continue;
        if (result.isFinal) callbackRef.current(transcript);
        else interim += `${transcript} `;
      }
      setInterimTranscript(interim.trim());
    };
    recognition.onerror = (event) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        setError("We couldn’t capture that. Check microphone access or continue with text.");
      }
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    setError(null);
    setIsListening(true);
    recognition.start();
  }, [language]);

  const stop = useCallback(() => recognitionRef.current?.stop(), []);

  return { error, interimTranscript, isListening, isSupported, start, stop };
}
