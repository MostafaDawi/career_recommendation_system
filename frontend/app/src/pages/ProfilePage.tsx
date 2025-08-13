import React, { useEffect, useState } from "react";
import UserProfileIcon from "../components/icons/UserProfileIcon";
import { useAuth } from "../utils/hooks.js";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth.js";

interface ProfilePageProps {
  onLogout: () => void;
}

interface userInfo {
  id: number;
  name: string;
  email: string;
  skills: Array<string>;
  interests: Array<string>;
  description: string;
  personality: Record<string, any>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const { user, isAuthenticated, updateUser, updateUserError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [user, isAuthenticated]);

  const [profile, setProfile] = useState<userInfo>({
    id: 0,
    name: "",
    email: "",
    skills: [""],
    interests: [""],
    description: "",
    personality: {},
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [isAuthenticated, user]);
  console.log("Received Profile: ", profile);
  const submitForm = (e) => {
    e.preventDefault();
    updateUser(profile);
  };

  console.log(profile);
  return (
    <div className="py-20 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-12 rounded-lg shadow-xl text-center">
          <h1 className="flex gap-6 items-center place-content-center text-4xl font-bold text-gray-900 mb-4">
            <UserProfileIcon className="text-indigo-600 mx-auto mb-6" />
            Welcome, {user?.name ? user.name : "User"}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is your personalized profile dashboard. You can view your saved
            careers, quiz history, and manage your settings here.
          </p>

          {/* {PROFILE FORM} */}
          <div className="mt-0">
            <form onSubmit={submitForm} className="max-w-full mb-8 space-y-4">
              {updateUserError && (
                <p className="text-red-500 font-bold">{`Error occured: ${updateUserError}. Try again later`}</p>
              )}
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 float-left"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 float-left"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  placeholder="john@example.com"
                />
              </div>

              {/* Skills */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 float-left"
                  htmlFor="skills"
                >
                  Skills (comma separated)
                </label>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  value={profile.skills.join(", ")}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  placeholder="JavaScript, React, TailwindCSS"
                />
              </div>

              {/* Interests */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 float-left"
                  htmlFor="interests"
                >
                  Interests (comma separated)
                </label>
                <input
                  id="interests"
                  name="interests"
                  type="text"
                  value={profile.interests.join(", ")}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      interests: e.target.value.split(",").map((i) => i.trim()),
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  placeholder="Music, Coding, Gaming"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 float-left"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Personality */}
              <div className="flex flex-col text-left">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="personality"
                >
                  Personality:
                </label>
                <p id="personality" className="flex flex-col">
                  {profile.personality !== null
                    ? Object.values(profile?.personality).map((point) => (
                        <p className="text-sm">{`-> ${point}`}</p>
                      ))
                    : "No information yet..." && (
                        <Link to="/quiz" className="text-green-400 font-bold">
                          {" "}
                          Take the personality quiz
                        </Link>
                      )}
                </p>
                {/* <textarea
                  id="personality"
                  name="personality"
                  value={JSON.stringify(profile.personality)}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 block border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                  placeholder="Like to lead, work alone, gets angry easily, calm ..."
                /> */}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Update Profile
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <button
              onClick={onLogout}
              className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
