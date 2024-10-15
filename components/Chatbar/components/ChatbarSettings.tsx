import { IconFileExport, IconSettings } from '@tabler/icons-react';
import { useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);

  const {
    state: {
      lightMode,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
  } = useContext(ChatbarContext);

    return (
        <div className="flex flex-col items-center space-y-4 border-t border-neutral-700 pt-4 text-sm">
            {conversations.length > 0 && (
                <ClearConversations onClearConversations={handleClearConversations} />
            )}

            <Import onImport={handleImportConversations} />

            <SidebarButton
                text={t('Export data')}
                icon={<IconFileExport size={18} />}
                onClick={handleExportData}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />

            <SidebarButton
                text={t('Settings')}
                icon={<IconSettings size={18} />}
                onClick={() => setIsSettingDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />

            <SettingDialog
                open={isSettingDialogOpen}
                onClose={() => setIsSettingDialog(false)}
            />
        </div>
    );

};
