import { IconExternalLink } from '@tabler/icons-react';
import { useContext, useState, useEffect } from 'react';

import { useTranslation } from 'next-i18next';

import { OllamaModel } from '@/types/ollama';

import HomeContext from '@/pages/api/home/home.context';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');

  function bytesToGB(bytes: number): string {
    return (bytes / 1e9).toFixed(2) + ' GB';
  }

  function timeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const mins = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${mins} minute${mins > 1 ? 's' : ''} ago`;
    }
  }

  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [selectedModelDetails, setSelectedModelDetails] = useState<{
    size: string;
    modified: string;
  }>({ size: '', modified: '' });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'model',
        value: models.find((model) => model.name === e.target.value) as OllamaModel,
      });

    const selectedModel = models.find((model) => model.name === e.target.value);
    if (selectedModel) {
      setSelectedModelDetails({
        size: bytesToGB(selectedModel.size),
        modified: timeAgo(new Date(selectedModel.modified_at)),
      });
    }
  };

  useEffect(() => {
    let model
    if (selectedConversation?.model) {
      model = models.find((m) => m.name === selectedConversation.model.name)
    }

    if (!model) {
      // selectedConversation has model which is not present on the system. Select the first model
      model = models[0]
      selectedConversation && model && handleUpdateConversation(selectedConversation, { key: 'model', value: model });
    }

    if (model) {
      setSelectedModelDetails({
        size: bytesToGB(model.size),
        modified: timeAgo(new Date(model.modified_at)),
      });
    }
  }, [selectedConversation, models]);

    return (
        <div className="flex flex-col">
            <label htmlFor="model-select" className="mb-2 text-left text-neutral-300 dark:text-neutral-400">
                {t('Model')}
            </label>

            <div className="w-full rounded-lg border border-neutral-600 bg-[#1c1c1c] pr-2 text-neutral-200 dark:border-neutral-700 dark:bg-[#1c1c1c] dark:text-white">
                <select
                    id="model-select" // Added id for accessibility
                    className="w-full bg-transparent p-2 text-neutral-200 dark:bg-[#2a2a2a] dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
                    value={selectedConversation?.model?.name || defaultModelId}
                    onChange={handleChange}
                >
                    <option value="" disabled>{t('Select a model')}</option> {/* Placeholder option */}
                    {models.map((model) => (
                        <option
                            key={model.name}
                            value={model.name}
                            className="dark:bg-[#343541] dark:text-white"
                        >
                            {model.name === defaultModelId
                                ? `Default (${model.name})`
                                : model.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display additional properties */}
            <div className="mb-2 text-left text-neutral-300 dark:text-neutral-400">
                <p className='mt-2'>
                    <span className="mr-16 inline-block">Size:</span>
                    <span className="inline-block">{selectedModelDetails.size}</span>
                </p>
                <p>
                    <span className="mr-8 inline-block">Modified:</span>
                    <span className="inline-block">{selectedModelDetails.modified}</span>
                </p>
            </div>
        </div>
    );



};
