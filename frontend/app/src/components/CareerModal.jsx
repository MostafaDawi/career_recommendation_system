const CareerModal = ({ career, onClose }) => {
  const skills = {
    fullstack: ['JavaScript', 'React/Vue', 'Node.js', 'Databases', 'Git/GitHub', 'Problem Solving'],
    ux: ['Figma/Sketch', 'User Research', 'Prototyping', 'Visual Design', 'Wireframing', 'Empathy'],
    data: ['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'Critical Thinking']
  };

  const learningPaths = {
    fullstack: [
      { step: 1, color: 'bg-green-400', text: 'Master HTML, CSS & JavaScript fundamentals' },
      { step: 2, color: 'bg-blue-400', text: 'Learn a frontend framework (React/Vue)' },
      { step: 3, color: 'bg-purple-400', text: 'Backend development with Node.js' },
      { step: 4, color: 'bg-yellow-400', text: 'Database design & management' }
    ],
    ux: [
      { step: 1, color: 'bg-pink-400', text: 'Learn design principles & color theory' },
      { step: 2, color: 'bg-purple-400', text: 'Master design tools (Figma, Adobe XD)' },
      { step: 3, color: 'bg-blue-400', text: 'User research & testing methods' },
      { step: 4, color: 'bg-green-400', text: 'Build a stunning portfolio' }
    ],
    data: [
      { step: 1, color: 'bg-blue-400', text: 'Master Python & data manipulation' },
      { step: 2, color: 'bg-green-400', text: 'Learn statistics & probability' },
      { step: 3, color: 'bg-purple-400', text: 'Machine learning algorithms' },
      { step: 4, color: 'bg-yellow-400', text: 'Data visualization & storytelling' }
    ]
  };

  const roadmaps = {
    fullstack: 'https://roadmap.sh/full-stack',
    ux: 'https://roadmap.sh/ux-design',
    data: 'https://roadmap.sh/data-science'
  };

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="modal-content rounded-3xl p-8 max-w-2xl w-full text-white relative bg-gradient-to-br from-indigo-200 to-indigo-700"
        onClick={e => e.stopPropagation()}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              career.id === 'fullstack'
                ? 'bg-white bg-opacity-20'
                : career.id === 'ux'
                ? 'bg-gradient-to-br from-pink-400 to-purple-500'
                : 'bg-gradient-to-br from-blue-400 to-cyan-500'
            }`}
          >
            {career.icon}
          </div>
          <h2 className="text-3xl font-bold mb-2">{career.title}</h2>
          <p className="text-white text-opacity-80">
            {career.id === 'fullstack'
              ? 'Your perfect career match'
              : `${career.compatibility} compatibility`} -{' '}
            {career.id === 'fullstack'
              ? 'with 98% compatibility'
              : career.id === 'ux'
              ? 'Great creative match!'
              : 'Perfect for analytical minds!'}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">🎯 Key Skills You'll Need:</h3>
          <div className="grid grid-cols-2 gap-3">
            {skills[career.id].map(skill => (
              <div key={skill} className="skill-tag rounded-xl p-3 text-center bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">📚 Learning Path:</h3>
          <div className="space-y-3">
            {learningPaths[career.id].map((path, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 ${path.color} rounded-full flex items-center justify-center mr-3`}
                >
                  <span
                    className={`text-sm font-bold ${
                      path.color.includes('green')
                        ? 'text-green-900'
                        : path.color.includes('blue')
                        ? 'text-blue-900'
                        : path.color.includes('purple')
                        ? 'text-purple-900'
                        : 'text-yellow-900'
                    }`}
                  >
                    {path.step}
                  </span>
                </div>
                <span>{path.text}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.open(roadmaps[career.id], '_blank')}
          className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-lg"
        >
          🗺️ View Complete Roadmap
        </button>
      </div>
    </div>
  );
};

export default CareerModal;
