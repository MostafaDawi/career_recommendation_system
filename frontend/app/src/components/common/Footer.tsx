import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 10V20C12.5 25.5228 16.9772 30 22.5 30H27.5" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M27.5 10V20C27.5 25.5228 23.0228 30 17.5 30H12.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.5 10H17.5" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.5 10H27.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ml-3 text-xl font-bold text-white">Career Planner AI</span>
                    </div>
                    <p className="mb-4">Your personalized career planner powered by artificial intelligence.</p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul>
                        <li className="mb-2"><button className="hover:text-white transition-colors duration-200">Features</button></li>
                        <li className="mb-2"><button className="hover:text-white transition-colors duration-200">Assessment</button></li>
                        <li className="mb-2"><button className="hover:text-white transition-colors duration-200">Careers</button></li>
                        <li className="mb-2"><button className="hover:text-white transition-colors duration-200">Testimonials</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Legal</h4>
                    <ul>
                        <li className="mb-2"><button className="hover:text-white transition-colors duration-200">Privacy Policy</button></li>
                        <li className="mb-2"><button className="hover:text-white transition-colors duration-200">Terms of Service</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact</h4>
                    <p>contact@careercompass.ai</p>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Career Planner AI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;