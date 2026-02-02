import { Loader2 } from "lucide-react";
import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "disabled"
  | "facebook"
  | "google";
type ButtonSize = "sm" | "md" | "xs";
type IconsVariants = "facebook" | "google";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: IconsVariants;
  size?: ButtonSize;
  LeftIcon?: React.ReactNode;
  isSubmitting?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  icon,
  size = "md",
  isSubmitting,
  disabled,
  LeftIcon,
  ...props
}: ButtonProps) => {
  const base =
    "w-full flex items-center justify-center gap-2  text-base font-medium transition-all hover:opacity-90 active:scale-[0.98]";

  const variants = {
    primary: "bg-[#1A1A1A] text-white",
    secondary: "bg-white border border-gray-300 text-black",
    disabled: "bg-[#CCCCCC] text-black cursor-not-allowed",
    google: "bg-white border border-gray-300 text-black",
    facebook: "bg-[#1877F2] text-white",
  };
  const sizes = {
    xs: "px-3.5 py-2 text-[10px] rounded-md",
    sm: "px-3.5 py-2 rounded-[10px]",
    md: "px-6 py-4 rounded-[10px]",
  };

  const icons = {
    facebook: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2_1638)">
          <path
            d="M24 12C24 5.37263 18.6274 0 12 0C5.37262 0 0 5.37253 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6575 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3398 7.875 13.875 8.80003 13.875 9.74906V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6117 22.954 24 17.9896 24 12Z"
            fill="white"
          />
          <path
            d="M16.6711 15.4688L17.2031 12H13.875V9.74906C13.875 8.79994 14.3399 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6575 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C10.7453 23.9514 11.3722 24.0002 12 24C12.6278 24.0002 13.2547 23.9514 13.875 23.8542V15.4688H16.6711Z"
            fill="#1877F2"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_1638">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    google: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2_1590)">
          <path
            d="M23.9888 12.2245C23.9888 11.2413 23.9071 10.5237 23.7304 9.77963H12.2393V14.2176H18.9843C18.8484 15.3205 18.114 16.9815 16.4821 18.0976L16.4592 18.2461L20.0925 20.9963L20.3442 21.0209C22.656 18.9347 23.9888 15.8653 23.9888 12.2245Z"
            fill="#4285F4"
          />
          <path
            d="M12.2393 23.9176C15.5438 23.9176 18.3179 22.8545 20.3442 21.0209L16.4821 18.0976C15.4486 18.8018 14.0615 19.2934 12.2393 19.2934C9.00273 19.2934 6.25576 17.2074 5.27654 14.324L5.13301 14.3359L1.35507 17.1927L1.30566 17.3269C3.31829 21.2334 7.45238 23.9176 12.2393 23.9176Z"
            fill="#34A853"
          />
          <path
            d="M5.27634 14.324C5.01797 13.5799 4.86844 12.7826 4.86844 11.9588C4.86844 11.1349 5.01797 10.3377 5.26275 9.5936L5.25591 9.43513L1.43062 6.53241L1.30547 6.59058C0.475969 8.21168 0 10.0321 0 11.9588C0 13.8855 0.475969 15.7058 1.30547 17.3269L5.27634 14.324Z"
            fill="#FBBC05"
          />
          <path
            d="M12.2393 4.62403C14.5374 4.62403 16.0877 5.59402 16.9717 6.40461L20.4258 3.10928C18.3044 1.1826 15.5438 0 12.2393 0C7.45238 0 3.31829 2.68406 1.30566 6.59056L5.26295 9.59359C6.25576 6.7102 9.00273 4.62403 12.2393 4.62403Z"
            fill="#EB4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_1590">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  };

  const selectedVariant = disabled ? "disabled" : variant;

  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[selectedVariant]} ${className} ${sizes[size]}`}
      {...props}
    >
      {isSubmitting && <Loader2 className="animate-spin text-blue-500" />}
      {icon && <span className="flex items-center ">{icons[icon]}</span>}
      {children}
      {LeftIcon && LeftIcon}
    </button>
  );
};

export default Button;
