import React from "react";

const Decorators = () => {
  return (
    // {/* <!-- Decorative illustration --> */}
    <div className="mt-12 relative">
      <svg
        className="w-full h-auto"
        viewBox="0 0 400 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Path --> */}
        <path
          d="M20,100 Q100,20 200,100 T380,100"
          fill="none"
          stroke="#E0E7FF"
          strokeWidth="2"
        />

        {/* <!-- Person climbing --> */}
        <circle cx="100" cy="60" r="10" fill="#6366F1" />
        <line
          x1="100"
          y1="70"
          x2="100"
          y2="85"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="75"
          x2="90"
          y2="85"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="75"
          x2="110"
          y2="85"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="85"
          x2="95"
          y2="100"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="85"
          x2="105"
          y2="100"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {/* <!-- Ladder --> */}
        <line
          x1="150"
          y1="40"
          x2="150"
          y2="100"
          stroke="#A5B4FC"
          strokeWidth="2"
        />
        <line
          x1="170"
          y1="40"
          x2="170"
          y2="100"
          stroke="#A5B4FC"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="50"
          x2="170"
          y2="50"
          stroke="#A5B4FC"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="65"
          x2="170"
          y2="65"
          stroke="#A5B4FC"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="80"
          x2="170"
          y2="80"
          stroke="#A5B4FC"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="95"
          x2="170"
          y2="95"
          stroke="#A5B4FC"
          strokeWidth="2"
        />

        {/* <!-- Door --> */}
        <rect x="250" y="40" width="40" height="60" rx="2" fill="#C7D2FE" />
        <circle cx="280" cy="70" r="3" fill="#4F46E5" />

        {/* <!-- Flag --> */}
        <line
          x1="350"
          y1="40"
          x2="350"
          y2="100"
          stroke="#818CF8"
          strokeWidth="2"
        />
        <path d="M350,40 L380,50 L350,60 Z" fill="#818CF8" />
      </svg>
    </div>
  );
};

export default Decorators;
