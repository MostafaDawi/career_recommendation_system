import React from "react";
import { FaLinkedin } from "react-icons/fa"; // make sure you have react-icons installed

const AboutPage = () => {
  const teamMembers = [
    { name: "Mostafa Dawi", role: "Project Lead, Full Stack Developer", linkedin: "https://www.linkedin.com/in/mostafa-dawi-b11378312/" },
    { name: "Serena Haidar", role: "AI Developer", linkedin: "https://www.linkedin.com/in/serena-haidar/" },
    { name: "Katia Matar", role: "Software Developer", linkedin: "https://www.linkedin.com/in/katia-matar-68b224324/" },
    { name: "Zahraa Meselmani", role: "Full Stack Developer", linkedin: "https://www.linkedin.com/in/zahraa-meselmnani-5b867b309/" },
    { name: "Hassan Kheireddin", role: "Software Developer", linkedin: "https://www.linkedin.com/in/hassan-kheireddin/" },
  ];

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-12">
          About Career Compass AI
        </h1>
        <div className="bg-white p-12 rounded-lg shadow-xl mb-16">
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Career Compass AI helps students and young professionals navigate their academic
               and career choices. Our platform provides personalized guidance tailored to students' strengths and interests.
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">
            Our Vision 
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At Career Compass AI, we believe that everyone deserves a career they
            are passionate about. If you are a high school student unsure what to study at college,
            or a college student planning your future career, our aim is to help you discover career paths 
            that match your personality, skills, and interests. 
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">
            The Team
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are a dedicated team of software engineers and AI developers, 
            committed to building tools that guide users toward fulfilling careers through smart, 
            personalized recommendations.
            </p>
        </div>

        {/* Team Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mb-4 text-4xl">
                {member.name[0]} {/* Placeholder initials */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          ))}
        </div>

        {/* Project Credit Section */}
        <div className="text-center">
          <p className="text-gray-700 text-lg">
            This project has been developed as part of{" "}
            <a
              href="https://techtalkslb.com/champions" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              TechTalks
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
