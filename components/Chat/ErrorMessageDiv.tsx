import { IconCircleX } from '@tabler/icons-react';
import { FC } from 'react';

import { ErrorMessage } from '@/types/error';

interface Props {
  error: ErrorMessage;
}

export const ErrorMessageDiv: FC<Props> = ({ error }) => {
    return (
        <div className={`mx-6 flex h-full flex-col items-center justify-center ${textColor} ${bgColor} p-4 rounded-lg shadow-md`}>
            <div className={`mb-5 ${iconColor}`}>
                <IconCircleX size={36} />
            </div>
            <div className={`mb-3 text-2xl font-medium`}>{error.title}</div>
            {error.messageLines.map((line, index) => (
                <div key={index} className="text-center">
                    {line}
                </div>
            ))}
            <div className={`mt-4 text-xs opacity-50 ${codeColor}`}>
                {error.code ? <i>Code: {error.code}</i> : ''}
            </div>
        </div>
    );
};
