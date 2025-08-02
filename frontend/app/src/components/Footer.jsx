const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
              CC
            </div>
            <span className="ml-3 text-xl font-semibold text-white">
              CareerCompass AI
            </span>
          </div>
          <p className="mb-4">
            Your personalized career navigator powered by artificial
            intelligence.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li className="mb-2">
              <a href="#assessment" className="hover:text-white">
                Assessment
              </a>
            </li>
            <li className="mb-2">
              <a href="#careers" className="hover:text-white">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="#testimonials" className="hover:text-white">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p>contact@careercompass.ai</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} CareerCompass AI. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
