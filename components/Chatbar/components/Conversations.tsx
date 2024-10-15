import { Conversation } from '@/types/chat';

import { ConversationComponent } from './Conversation';

interface Props {
  conversations: Conversation[];
}

export const Conversations = ({ conversations }: Props) => {
    return (
        <div className="flex w-full flex-col space-y-2">
            {conversations
                .filter((conversation) => !conversation.folderId)
                .slice()
                .reverse()
                .map((conversation) => (
                    <ConversationComponent key={conversation.id} conversation={conversation} />
                ))}
        </div>
    );

};
