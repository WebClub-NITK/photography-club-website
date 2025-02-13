import PropTypes from 'prop-types';

function ModularTabs({ tabs, activeTab, onTabClick }) {
    return (
        <div className="flex flex-row gap-4 border-b border-gray-200">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={`px-4 py-2 text-[14px] font-medium 
                        transition-all duration-200 ease-in-out
                        border-b-2 -mb-[1px]
                        ${activeTab === tab.id
                            ? 'border-primary text-primary border-b-[3px]'
                            : 'border-transparent text-gray-500 hover:text-primary hover:border-gray-300'
                        }`}
                >

                    {tab.label}
                </button>
            ))}
        </div>
    );
}

ModularTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
};

export default ModularTabs;
