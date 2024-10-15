import {
  IconArrowDown,
  IconPlayerStop,
  IconSend,
  IconMicrophone,
} from '@tabler/icons-react';
import {
  KeyboardEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'next-i18next';
import HomeContext from '@/pages/api/home/home.context';

interface Props {
  onSend: (message: any) => void;
  onScrollDownClick: () => void;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  showScrollDownButton: boolean;
}

export const ChatInput = ({
  onSend,
  onScrollDownClick,
  textareaRef,
  showScrollDownButton,
}: Props) => {
  const { t } = useTranslation('chat');
  const {
    state: { messageIsStreaming },
  } = useContext(HomeContext);

  const [content, setContent] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSend = () => {
    if (messageIsStreaming) return;
    if (!content.trim()) {
      alert(t('Please enter a message'));
      return;
    }

    onSend({ role: 'user', content });
    setContent('');

    if (window.innerWidth < 640 && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const startRecognition = () => {
  if (!recognitionRef.current || isListening) return;

  // Check if navigator.mediaDevices and getUserMedia are available
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        try {
          setIsListening(true);
          recognitionRef.current.start();
        } catch (error) {
          console.error('Error starting speech recognition:', error);
          alert(t('Could not start speech recognition.'));
        }
      })
      .catch((error) => {
        console.error('Microphone permission denied:', error);
        alert(t('Microphone permission denied. Please allow access.'));
      });
  } else {
    console.error('getUserMedia is not supported in this browser.');
    alert(t('Your browser does not support microphone access.'));
  }
};


  const stopRecognition = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setContent((prevContent) => prevContent + ' ' + transcript);
      stopRecognition(); // Stop recognition after getting the result
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      alert(t('Speech recognition error: ') + event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop(); // Cleanup to stop recognition on unmount
      }
    };
  }, [t]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.overflow = `${
        textareaRef.current.scrollHeight > 400 ? 'auto' : 'hidden'
      }`;
    }
  }, [content, textareaRef]);

  return (
    <div className="absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-[#111111] to-[#111111] pt-6 dark:border-white/20 dark:via-[#222222] dark:to-[#222222] md:pt-2">
      <div className="stretch mx-2 mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 md:mt-[52px] md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        {messageIsStreaming && (
          <button
            className="absolute top-0 left-0 right-0 mx-auto mb-3 flex w-fit items-center gap-3 border border-transparent bg-[#121212] py-2 px-3 text-white transition-opacity duration-200 ease-in-out hover:opacity-80 dark:bg-[#1b1b1b] dark:text-white shadow-lg"
            onClick={stopRecognition}
          >
            <IconPlayerStop size={16} /> {t('Stop')}
          </button>
        )}

        <div className="relative flex w-full flex-grow flex-col rounded-md border border-transparent bg-[#222222] shadow-md dark:border-black/30 dark:bg-[#111111] dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <textarea
            ref={textareaRef}
            className="w-full resize-none border-0 bg-transparent p-0 py-2 pr-8 pl-10 text-white dark:bg-transparent dark:text-white md:py-3"
            placeholder={t('Type a message') || ''}
            value={content}
            rows={1}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="absolute right-2 top-2 p-1 text-neutral-400 hover:text-gray-200 dark:text-neutral-200 dark:hover:text-neutral-300"
            onClick={handleSend}
          >
            <IconSend size={18} />
          </button>

          <button
            className="absolute right-8 top-2 p-1 text-neutral-400 hover:text-gray-200 dark:text-neutral-200 dark:hover:text-neutral-300"
            onClick={startRecognition}
          >
            {isListening ? (
              <IconPlayerStop size={18} />
            ) : (
              <IconMicrophone size={18} />
            )}
          </button>
        </div>

        {showScrollDownButton && (
          <div className="absolute bottom-12 right-0 lg:bottom-0 lg:-right-10">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-600 text-gray-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-neutral-200"
              onClick={onScrollDownClick}
            >
              <IconArrowDown size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="px-3 pt-2 pb-3 text-center text-[12px] text-gray-300 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        <a
          href="https://www.prayag24.live/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Prayag 24
        </a>
        . {t('This project is made by Gokul P, Nima Fathima, Sakhil N Maju (S3CSEAI). AI can make mistakes; verify important info.')}
      </div>
    </div>
  );
};

