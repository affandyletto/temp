// src/components/Toggle/ToggleTabs.jsx

const ToggleTabs = ({ tabs = [], value = 0, onChange = () => {} }) => {
  return (
    <div className="flex w-full bg-neutral-300 rounded-xl overflow-hidden p-1">
      {tabs.map((tab, idx) => {
        const isActive = value === idx;
        return (
          <button
            key={idx}
            onClick={() => onChange(idx)}
            className={`flex items-center justify-center w-full rounded-xl text-sm p-2 transition-all duration-200
              ${
                isActive
                  ? "bg-white shadow-sm"
                  : "bg-neutral-300 text-secondary"
              }`}
          >
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ToggleTabs;
