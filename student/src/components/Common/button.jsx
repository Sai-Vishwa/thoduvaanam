export function Button({ children, className = "", onClick, ...props }) {
    return (
      <button
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
  