import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { SidebarButton } from '@/components/Sidebar/SidebarButton';

interface Props {
  onClearConversations: () => void;
}

export const ClearConversations: FC<Props> = ({ onClearConversations }) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const { t } = useTranslation('sidebar');

  const handleClearConversations = () => {
    onClearConversations();
    setIsConfirming(false);
  };

    return isConfirming ? (
        <div className="flex w-full cursor-pointer items-center rounded-lg py-3 px-3 hover:bg-gray-600/10 transition-colors duration-200 ease-in-out">
            <IconTrash size={18} className="text-red-500" />

            <div className="ml-3 flex-1 text-left text-[13px] leading-4 text-white">
                {t('Are you sure?')}
            </div>

            <div className="flex w-[40px]">
                <IconCheck
                    className="ml-auto mr-1 min-w-[20px] text-green-400 hover:text-green-300 transition duration-200 ease-in-out"
                    size={18}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClearConversations();
                    }}
                />

                <IconX
                    className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100 transition duration-200 ease-in-out"
                    size={18}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsConfirming(false);
                    }}
                />
            </div>
        </div>
    ) : (
        <SidebarButton
            text={t('Clear conversations')}
            icon={<IconTrash size={18} className="text-neutral-400 hover:text-red-500 transition duration-200 ease-in-out" />}
            onClick={() => setIsConfirming(true)}
            className="w-full py-3 px-3 flex items-center rounded-lg hover:bg-gray-600/10 transition-colors duration-200 ease-in-out"
        />
    );

};
