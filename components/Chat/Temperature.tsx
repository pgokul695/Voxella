import { FC, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { DEFAULT_TEMPERATURE } from '@/utils/app/const';

import HomeContext from '@/pages/api/home/home.context';

interface Props {
  label: string;
  onChangeTemperature: (temperature: number) => void;
}

export const TemperatureSlider: FC<Props> = ({
  label,
  onChangeTemperature,
}) => {
  const {
    state: { conversations },
  } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [temperature, setTemperature] = useState(
    lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
  );
  const { t } = useTranslation('chat');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    onChangeTemperature(newValue);
  };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-left text-neutral-300 dark:text-neutral-400">
                {label}
            </label>
            <p className="text-xs text-neutral-200 dark:text-white/50">
                {t(
                    'Higher the temperature, higher will be the creativity. Use higher temperature when you are doing creative things and use lower temperature when you are doing precise things.'
                )}
            </p>
            <span className="text-center text-neutral-200 dark:text-neutral-100">
                {temperature.toFixed(1)}
            </span>
            <input
                className="cursor-pointer appearance-none bg-transparent border-b border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-neutral-500 dark:focus:ring-blue-400"
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onChange={handleChange}
            />
            <ul className="flex justify-between mt-2 space-x-4 pb-8">
                <li className="flex justify-center w-1/3">
                    <span className="text-neutral-300 dark:text-neutral-100">{t('Precise')}</span>
                </li>
                <li className="flex justify-center w-1/3">
                    <span className="text-neutral-300 dark:text-neutral-100">{t('Neutral')}</span>
                </li>
                <li className="flex justify-center w-1/3">
                    <span className="text-neutral-300 dark:text-neutral-100">{t('Creative')}</span>
                </li>
            </ul>
        </div>
    );

};
