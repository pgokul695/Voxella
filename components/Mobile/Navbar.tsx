import { IconPlus } from '@tabler/icons-react';
import { FC } from 'react';

import { Conversation } from '@/types/chat';

interface Props {
  selectedConversation: Conversation;
  onNewConversation: () => void;
}

export const Navbar: FC<Props> = ({
  selectedConversation,
  onNewConversation,
}) => {
 return (
   <nav className="flex w-full justify-between bg-[#202123] py-3 px-4">
     <div className="flex-1" />
 
     <div className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
       {selectedConversation.name}
     </div>
 
     <button
       className="cursor-pointer hover:text-neutral-400"
       onClick={onNewConversation}
     >
       <IconPlus />
     </button>
   </nav>
 );
};  
