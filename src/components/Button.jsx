import PropTypes from 'prop-types'

const Button = ({ 
    children, 
    onClick, 
    className = "", 
    variant = "primary",
    icon = null,
    size = "md"
}) => {
    const baseStyles = "flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-full"
    
    const variants = {
        primary: "bg-black/80 backdrop-blur-sm text-white hover:bg-black",
        secondary: "bg-white/80 backdrop-blur-sm text-black hover:bg-gray-50",
        outline: "border-2 border-black text-black hover:bg-black hover:text-white"
    }

    const sizes = {
        sm: "px-5 py-2 text-sm",
        md: "px-7 py-3 text-[14px]",
        lg: "px-9 py-4 text-base"
    }

    return (
        <button 
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
            {icon && <span className="text-lg">{icon}</span>}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    icon: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default Button 