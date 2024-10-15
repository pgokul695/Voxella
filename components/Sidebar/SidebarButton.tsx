import { FC } from 'react';

interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

export const SidebarButton: FC<Props> = ({ text, icon, onClick }) => {
    return (
        <button
            type="button" // Specify button type to prevent form submission issues
            className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
            onClick={onClick}
            aria-label={text} // Add aria-label for accessibility
        >
            {icon && <div>{icon}</div>} {/* Conditionally render the icon */}
            <span>{text}</span>
        </button>
    );

};
