import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

function Dropdown({ options, value, onChange, className }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className={`min-w-[200px] appearance-none w-full px-4 py-2 bg-gray-100 rounded-3xl
                    focus:outline-none focus:border-primary ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <IoIosArrowDown className="text-gray-400" />
            </div>
        </div>
    )
}

export default Dropdown