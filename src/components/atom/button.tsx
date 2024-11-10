import { useState } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => Promise<void>;
}

export default function RsButton(props: ButtonProps) {
  const { text, onClick, className, disabled } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${className} bg-slate-800
        hover:bg-blue-700
        hover:shadow-xl
        hover:shadow-blue-500/20
        text-white
        transition-all
        text-sm
        font-semibold
        py-2
        px-6
        rounded-full
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
      ) : (
        text
      )}
    </button>
  );
}
