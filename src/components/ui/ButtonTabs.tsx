interface ButtonTabsProps {
  options: string[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const ButtonTabs = ({
  options,
  activeValue,
  onChange,
  className = "",
}: ButtonTabsProps) => {
  const containerBase =
    "flex p-2 bg-[#E6E6E6] rounded-2xl w-full transition-all";

  const itemBase =
    "flex-1 py-2.5 text-sm font-semibold rounded-[12px] transition-all duration-200 cursor-pointer border-none outline-none";

  return (
    <div className={`${containerBase} ${className}`}>
      {options.map((option) => {
        const isActive = activeValue === option;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`${itemBase} ${
              isActive
                ? "bg-white text-black shadow-sm"
                : "text-[#999999] hover:text-gray-700"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonTabs;
