interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

const Toggle = ({ enabled, onChange, disabled }: ToggleProps) => {
  const container = `relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 outline-none
    ${
      disabled
        ? "bg-[#E6E6E6] cursor-not-allowed"
        : enabled
        ? "bg-[#1A1A1A] cursor-pointer"
        : "bg-[#CCCCCC] cursor-pointer"
    }`;

  const circle = `inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 shadow-sm
    ${enabled ? "translate-x-7" : "translate-x-1"}`;

  return (
    <button
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={container}
    >
      <span className={circle} />
    </button>
  );
};
export default Toggle;
