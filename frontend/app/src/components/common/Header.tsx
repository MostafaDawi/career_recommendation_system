import React, { useState } from 'react';
import ProfessionalLogo from "../icons/ProfessionalLogo";
import MenuIcon from '../icons/MenuIcon';
import CloseIcon from '../icons/CloseIcon';
import UserProfileIcon from '../icons/UserProfileIcon';

// Define the props type for better clarity
/**
 * @typedef {Object} HeaderProps
 * @property {(page: string) => void} onNavigate
 * @property {boolean} isLoggedIn
 * @property {() => void} onLogin
 * @property {() => void} onLogout
 */

const Header = ({ onNavigate, isLoggedIn, onLogin, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = (page) => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-indigo-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
                        <ProfessionalLogo />
                        <span className="ml-3 text-xl font-semibold text-white font-inter">Career Planner AI</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => handleLinkClick('home')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</button>
                            <button onClick={() => handleLinkClick('about')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About</button>
                            <button onClick={() => handleLinkClick('contact')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Contact</button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            {isLoggedIn ? (
                                <div className="flex items-center space-x-4">
                                    <button onClick={() => onNavigate('profile')} className="p-2 rounded-full text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                                        <span className="sr-only">View profile</span>
                                        <UserProfileIcon />
                                    </button>
                                    <button onClick={onLogout} className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-300">Log out</button>
                                </div>
                            ) : (
                                <button onClick={onLogin} className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors duration-300 shadow-md">Login</button>
                            )}
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all duration-300">
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <button onClick={() => handleLinkClick('home')} className="text-gray-300 hover:bg-indigo-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left">Home</button>
                    <button onClick={() => handleLinkClick('about')} className="text-gray-300 hover:bg-indigo-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left">About</button>
                    <button onClick={() => handleLinkClick('contact')} className="text-gray-300 hover:bg-indigo-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left">Contact</button>
                </div>
                <div className="pt-4 pb-3 border-t border-indigo-800">
                    <div className="flex items-center px-5">
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => handleLinkClick('profile')} className="p-1 rounded-full text-gray-400 hover:text-white transition-colors duration-300">
                                    <UserProfileIcon />
                                </button>
                                <button onClick={onLogout} className="ml-4 bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-300">Log out</button>
                            </>
                        ) : (
                            <button onClick={onLogin} className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors duration-300">Login</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;