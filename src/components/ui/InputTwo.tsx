import React from "react";
import { LucideIcon } from "lucide-react";

interface InputTwoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const InputTwo = ({
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onLeftClick,
  onRightClick,
  className,
  ...props
}: InputTwoProps) => {
  return (
    <div className="relative w-full h-13 flex items-center">
      {LeftIcon && (
        <button
          type="button"
          onClick={onRightClick}
          className="absolute left-4 text-[#B3B3B3]"
        >
          <LeftIcon size={24} />
        </button>
      )}

      <input
        {...props}
        className={`w-full bg-white border border-[#E6E6E6] rounded-[10px] py-3.5 px-5 
          text-base outline-none transition-all placeholder:text-[#B3B3B3]
          focus:border-black
          ${LeftIcon ? "pl-12" : "pl-5"} 
          ${RightIcon ? "pr-12" : "pr-5"}
          ${className}
        `}
      />

      {RightIcon && (
        <button
          type="button"
          onClick={onLeftClick}
          className="absolute right-4 text-[#B3B3B3] hover:text-black transition-colors"
        >
          <RightIcon size={24} />
        </button>
      )}
    </div>
  );
};

export default InputTwo;
