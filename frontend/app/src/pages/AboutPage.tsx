// This code is taken from your main_test_CK.jsx file
import React from 'react';

const AboutPage = () => (
    <div className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-gray-900 text-center mb-12">About Career Planner AI</h1>
            <div className="bg-white p-12 rounded-lg shadow-xl">
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    At Career Planner AI, we believe that everyone deserves a career they are passionate about...
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Our vision is a world where no one feels lost or stuck in their professional journey...
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">The Team</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    We are a dedicated team of data scientists, software engineers, and career counselors...
                </p>
            </div>
        </div>
    </div>
);

export default AboutPage;