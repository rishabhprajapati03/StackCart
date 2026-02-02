import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
  name?: string;
  label?: string;
}

const SearchInput = ({ name, label, className = "", ...props }: InputProps) => {
  const containerBase = "flex flex-col gap-1 w-full md:max-w-md";

  const inputBase =
    "w-full px-4 py-4 rounded-xl font-medium border transition-all duration-200 outline-none text-base text-black border-gray-200 focus:border-black bg-white placeholder-[#999999]  text-gray-400 hover:border-black focus:border-black";

  return (
    <div className={containerBase}>
      <div className="relative flex items-center">
        <input className={`${inputBase}  ${className}`} {...props} />
      </div>
    </div>
  );
};

export default SearchInput;
