import { useState } from 'react';

const navItems = [
    { name: 'View all', href: '#' },
    { name: 'Management', href: '#' },
    { name: 'Design', href: '#' },
    { name: 'Photographers', href: '#' },
    { name: 'Operations', href: '#' }
];

export default function Tabs() {
    const [activeItem, setActiveItem] = useState('View all');

    return (
        <nav className="w-full overflow-x-auto flex justify-start sm:justify-center items-center px-2 sm:px-4 lg:px-8">
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 min-w-max">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveItem(item.name)}
                        className={`font-inter border-[1.2px] py-2 px-4 text-sm sm:text-md lg:text-lg text-black font-bold transition-colors rounded-full ${
                            activeItem === item.name
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </nav>
    );
}
