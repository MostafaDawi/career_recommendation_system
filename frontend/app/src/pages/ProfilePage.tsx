import React from 'react';
import UserProfileIcon from '../components/icons/UserProfileIcon';

interface ProfilePageProps {
    onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => (
    <div className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-12 rounded-lg shadow-xl text-center">
                <UserProfileIcon className="h-20 w-20 text-indigo-600 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, User!</h1>
                <p className="text-lg text-gray-600 mb-8">This is your personalized profile dashboard. You can view your saved careers, quiz history, and manage your settings here.</p>
                <div className="space-y-4">
                    <button className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
                        View Saved Careers
                    </button>
                    <button className="w-full py-3 px-6 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300">
                        Quiz History
                    </button>
                    <button onClick={onLogout} className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ProfilePage;