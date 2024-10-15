import { MouseEventHandler, ReactElement } from 'react';

interface Props {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactElement;
}

const SidebarActionButton = ({ handleClick, children }: Props) => (
    <button
        className="min-w-[40px] p-2 text-neutral-400 transition-colors duration-200 ease-in-out rounded-md hover:text-neutral-100 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600"
        onClick={handleClick}
    >
        {children}
    </button>
);

export default SidebarActionButton;
