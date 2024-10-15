import { IconCheck, IconClipboard, IconDownload } from '@tabler/icons-react';
import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useTranslation } from 'next-i18next';

import {
  generateRandomString,
  programmingLanguages,
} from '@/utils/app/codeblock';

interface Props {
  language: string;
  value: string;
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { t } = useTranslation('markdown');
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`;
    const fileName = window.prompt(
      t('Enter file name') || '',
      suggestedFileName,
    );

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
    return (
        <div className="codeblock relative font-sans text-[16px] bg-[#1B1C1E] rounded-lg">
            <div className="flex items-center justify-between py-2 px-4 bg-[#101112] rounded-t-lg">
                <span className="text-xs lowercase text-neutral-500">{language}</span>

                <div className="flex items-center space-x-2">
                    <button
                        className="flex items-center gap-1.5 rounded bg-[#2A2B2D] p-1.5 text-xs text-neutral-400 hover:bg-[#3B3C3E] transition duration-200 ease-in-out"
                        onClick={copyToClipboard}
                    >
                        {isCopied ? (
                            <IconCheck size={18} className="text-green-500" />
                        ) : (
                            <IconClipboard size={18} className="text-neutral-500" />
                        )}
                        <span>{isCopied ? t('Copied!') : t('Copy code')}</span>
                    </button>

                    <button
                        className="flex items-center rounded bg-[#2A2B2D] p-1.5 text-xs text-neutral-400 hover:bg-[#3B3C3E] transition duration-200 ease-in-out"
                        onClick={downloadAsFile}
                    >
                        <IconDownload size={18} className="text-neutral-500" />
                    </button>
                </div>
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{ margin: 0, padding: '16px', backgroundColor: '#1E1F21', borderRadius: '0 0 0.5rem 0.5rem' }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );


});
CodeBlock.displayName = 'CodeBlock';
