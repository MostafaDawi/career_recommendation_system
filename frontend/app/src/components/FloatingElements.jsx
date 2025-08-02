const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400 bg-opacity-20 rounded-full floating" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 bg-opacity-15 rounded-full floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-300 bg-opacity-25 rounded-full floating" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-purple-600 bg-opacity-20 rounded-full floating" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white bg-opacity-30 rounded-full floating" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-purple-200 bg-opacity-40 rounded-full floating" style={{ animationDelay: '5s' }}></div>
    </div>
  );
};

export default FloatingElements;