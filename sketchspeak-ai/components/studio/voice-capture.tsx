"use client";

import { AudioLines, Mic, MicOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useVoiceInput } from "@/hooks/use-voice-input";

interface VoiceCaptureProps {
  disabled?: boolean;
  onTranscript: (transcript: string) => void;
}

export function VoiceCapture({ disabled = false, onTranscript }: VoiceCaptureProps) {
  const { error, interimTranscript, isListening, isSupported, start, stop } = useVoiceInput({ onFinalTranscript: onTranscript });

  if (!isSupported) {
    return <div className="voice-capture voice-capture--fallback"><AudioLines size={14} aria-hidden="true" /><span>Voice input isn&apos;t available here. Describe your site in text.</span></div>;
  }

  return (
    <div className={`voice-capture${isListening ? " voice-capture--listening" : ""}`}>
      <Button
        variant={isListening ? "primary" : "quiet"}
        size="icon"
        aria-label={isListening ? "Stop voice input" : "Start voice input"}
        aria-pressed={isListening}
        disabled={disabled}
        onClick={isListening ? stop : start}
      >
        {isListening ? <MicOff size={14} aria-hidden="true" /> : <Mic size={14} aria-hidden="true" />}
      </Button>
      <span className="voice-capture__copy">
        {isListening ? <><i className="voice-wave" aria-hidden="true" /> Listening{interimTranscript ? ` · “${interimTranscript}”` : "..."}</> : "Describe it aloud"}
      </span>
      {error ? <span className="voice-capture__error" role="status">{error}</span> : null}
    </div>
  );
}
