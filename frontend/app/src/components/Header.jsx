const Header = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6 leading-tight">
        Your Perfect<br />
        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Career Match
        </span>
      </h1>
      <p className="text-xl text-purple-700 max-w-2xl mx-auto">
        AI-powered recommendations tailored specifically for your skills and interests
      </p>
    </div>
  );
};

export default Header;
