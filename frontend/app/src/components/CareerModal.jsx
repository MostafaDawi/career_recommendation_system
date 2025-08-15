import { react } from "react";

const CareerModal = ({ career, onClose }) => {
  console.log("Career Model holding: ", career);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-400/50"
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-8 max-w-2xl w-full text-white relative bg-gradient-to-br from-indigo-300 to-indigo-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br ${career?.color}`}
          >
            {career?.icon}
          </div>
          <h2 className="text-3xl font-bold mb-2">{career?.title}</h2>
          <p className="text-white text-opacity-80">
            {career.score > 0.5
              ? "Your perfect career match"
              : `${(career.score * 100).toFixed(0)}% compatibility`}{" "}
            -{" "}
            {career.score > 0.5
              ? "Perfect for analytical minds!"
              : "Suits you well!"}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">🎯 Key Skills You'll Need:</h3>
          <div className="grid grid-cols-2 gap-3">
            {career.tags?.map((skill) => (
              <div
                key={skill}
                className="text-black skill-tag rounded-xl p-3 text-center bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">📚 Roadmap:</h3>
          <div className="space-y-3">
            Explore learning paths for this career at roadmap.sh
          </div>
        </div>

        <button
          onClick={() => window.open("https://roadmap.sh", "_blank")}
          className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-lg"
        >
          🗺️ View Complete Roadmap
        </button>
      </div>
    </div>
  );
};

export default CareerModal;
