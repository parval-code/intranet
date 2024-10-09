import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;  // El contenido puede ser cualquier JSX
}

interface TabsUiProps {
  tabs: Tab[];
}

const TabsUi: React.FC<TabsUiProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);  // Por defecto, selecciona la primera tab.

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(e.target.value);
  };

  return (
    <div>
      {/* Dropdown para pantallas pequeñas */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-parvalColor focus:outline-none focus:ring-parvalColor sm:text-sm"
          value={selectedTab}
          onChange={handleSelectChange}
        >
          {tabs.map((tab) => (
            <option key={tab.label}>{tab.label}</option>
          ))}
        </select>
      </div>

      {/* Navegación para pantallas grandes */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-16" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.label}
                href="#"
                onClick={() => setSelectedTab(tab.label)}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                  selectedTab === tab.label
                    ? 'border-parvalColor text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mostrar el contenido correspondiente al tab seleccionado */}
      <div className="mt-4">
        {tabs.map((tab) =>
          tab.label === selectedTab ? (
            <div key={tab.label}>
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabsUi;
