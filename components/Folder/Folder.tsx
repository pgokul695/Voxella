import {
  IconCaretDown,
  IconCaretRight,
  IconCheck,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import {
  KeyboardEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { FolderInterface } from '@/types/folder';

import HomeContext from '@/pages/api/home/home.context';

import SidebarActionButton from '@/components/Buttons/SidebarActionButton';

interface Props {
  currentFolder: FolderInterface;
  searchTerm: string;
  handleDrop: (e: any, folder: FolderInterface) => void;
  folderComponent: (ReactElement | undefined)[];
}

const Folder = ({
  currentFolder,
  searchTerm,
  handleDrop,
  folderComponent,
}: Props) => {
  const { handleDeleteFolder, handleUpdateFolder } = useContext(HomeContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRename();
    }
  };

  const handleRename = () => {
    handleUpdateFolder(currentFolder.id, renameValue);
    setRenameValue('');
    setIsRenaming(false);
  };

  const dropHandler = (e: any) => {
    if (e.dataTransfer) {
      setIsOpen(true);

      handleDrop(e, currentFolder);

      e.target.style.background = 'none';
    }
  };

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchTerm]);

    return (
        <>
            <div className="relative flex items-center">
                {isRenaming ? (
                    <div className="flex w-full items-center gap-3 rounded-lg bg-neutral-700/90 p-3 transition-all duration-200">
                        {isOpen ? (
                            <IconCaretDown size={18} className="text-neutral-400" />
                        ) : (
                            <IconCaretRight size={18} className="text-neutral-400" />
                        )}
                        <input
                            className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-none bg-transparent text-left text-sm leading-4 text-white outline-none focus:ring-2 focus:ring-neutral-100"
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={handleEnterDown}
                            autoFocus
                        />
                    </div>
                ) : (
                    <button
                        className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-neutral-700/90 ${isOpen ? 'bg-neutral-700/90' : ''
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                        onDrop={dropHandler}
                        onDragOver={allowDrop}
                        onDragEnter={highlightDrop}
                        onDragLeave={removeHighlight}
                    >
                        {isOpen ? (
                            <IconCaretDown size={18} className="text-neutral-400" />
                        ) : (
                            <IconCaretRight size={18} className="text-neutral-400" />
                        )}

                        <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-sm leading-4 text-neutral-200">
                            {currentFolder.name}
                        </div>
                    </button>
                )}

                {(isDeleting || isRenaming) && (
                    <div className="absolute right-2 z-10 flex space-x-2 text-gray-300">
                        <SidebarActionButton
                            handleClick={(e) => {
                                e.stopPropagation();
                                if (isDeleting) handleDeleteFolder(currentFolder.id);
                                else if (isRenaming) handleRename();
                                setIsDeleting(false);
                                setIsRenaming(false);
                            }}
                        >
                            <IconCheck
                                size={18}
                                className="text-neutral-400 hover:text-green-400 transition duration-200"
                            />
                        </SidebarActionButton>
                        <SidebarActionButton
                            handleClick={(e) => {
                                e.stopPropagation();
                                setIsDeleting(false);
                                setIsRenaming(false);
                            }}
                        >
                            <IconX
                                size={18}
                                className="text-neutral-400 hover:text-red-400 transition duration-200"
                            />
                        </SidebarActionButton>
                    </div>
                )}

                {!isDeleting && !isRenaming && (
                    <div className="absolute right-2 z-10 flex space-x-2 text-gray-300">
                        <SidebarActionButton
                            handleClick={(e) => {
                                e.stopPropagation();
                                setIsRenaming(true);
                                setRenameValue(currentFolder.name);
                            }}
                        >
                            <IconPencil
                                size={18}
                                className="text-neutral-400 hover:text-blue-400 transition duration-200"
                            />
                        </SidebarActionButton>
                        <SidebarActionButton
                            handleClick={(e) => {
                                e.stopPropagation();
                                setIsDeleting(true);
                            }}
                        >
                            <IconTrash
                                size={18}
                                className="text-neutral-400 hover:text-red-400 transition duration-200"
                            />
                        </SidebarActionButton>
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="pl-5 transition-all duration-200 ease-in-out">{folderComponent}</div>
            )}
        </>
    );

};

export default Folder;
