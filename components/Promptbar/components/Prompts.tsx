import { FC } from 'react';

import { Prompt } from '@/types/prompt';

import { PromptComponent } from './Prompt';

interface Props {
  prompts: Prompt[];
}

export const Prompts: FC<Props> = ({ prompts }) => {
    return (
        <div className="flex w-full flex-col gap-1">
            {prompts?.slice().reverse().map((prompt) => (
                <PromptComponent key={prompt.id || prompt.name} prompt={prompt} />
            ))}
        </div>
    );

};
