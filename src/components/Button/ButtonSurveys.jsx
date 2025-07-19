
// Reusable Button Component
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  onClick,
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-white border border-slate-200 text-gray-800 hover:bg-slate-50 focus:ring-slate-200',
    danger: 'bg-white border border-slate-200 text-gray-800 hover:bg-red-50 hover:border-red-200 focus:ring-red-200',
    secondary: 'bg-slate-100 text-gray-800 hover:bg-slate-200 focus:ring-slate-200'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2 text-xs',
    lg: 'px-6 py-3 text-sm'
  };
  
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};

// Button Group Component for organizing buttons
export const ButtonGroup = ({ children, className = '' }) => (
  <div className={`flex gap-2 ${className}`}>
    {children}
  </div>
);