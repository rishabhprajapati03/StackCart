import React, { useState } from "react";

interface ToggleButtonProps {
  label?: string;
  enabled?: boolean;
  onChange?: (val: boolean) => void;
}

const ToggleButton = ({ label, enabled, onChange }: ToggleButtonProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  return (
    <label className="flex items-center justify-between w-full cursor-pointer group">
      {label && (
        <span className="text-base font-medium text-black">{label}</span>
      )}

      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
        <span className="block w-10 h-5.5 bg-[#E6E6E6] rounded-full transition-colors peer-checked:bg-black"></span>
        <span className="absolute left-[3px] top-[3px] w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4.5 shadow-sm"></span>
      </div>
    </label>
  );
};

export default ToggleButton;
