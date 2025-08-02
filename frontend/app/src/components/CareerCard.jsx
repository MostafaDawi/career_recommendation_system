const CareerCard = ({ career, onClick, isTopMatch = false }) => {
  return (
    <div 
      className={`${isTopMatch ? 
        'top-match-card text-white' : 
        'glass-card text-purple-700'} 
        rounded-3xl p-8 relative z-10 card-hover`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className={`${isTopMatch ? 
          'bg-white bg-opacity-20 w-24 h-24' : 
          'bg-gradient-to-br ' + career.color + ' w-20 h-20'} 
          mx-auto mb-6 rounded-2xl flex items-center justify-center`}
        >
          {career.icon}
        </div>
        <h2 className={`${isTopMatch ? 'text-3xl' : 'text-2xl'} font-bold mb-4`}>
          {career.title}
        </h2>
        <p className={`${isTopMatch ? 'text-white text-opacity-90' : 'text-purple-700'} mb-6 ${isTopMatch ? 'max-w-md mx-auto text-lg' : 'text-sm leading-relaxed'}`}>
          {career.description}
        </p>
        <div className={`inline-flex items-center ${isTopMatch ? 
          'px-6 py-3 bg-white bg-opacity-20 rounded-full font-semibold' : 
          'px-4 py-2 bg-gradient-to-r ' + career.color + ' text-white rounded-full text-sm font-semibold'}`}
        >
          {isTopMatch ? 'Click to explore this path →' : `${career.compatibility} Match • Explore →`}
        </div>
      </div>
    </div>
  );
};

export default CareerCard;