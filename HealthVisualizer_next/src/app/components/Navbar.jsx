import DarkMode from "./DarkMode";

const Navbar = ({ links }) => {
  return (
    <nav className="bg-blue-600 dark:bg-gray-900 shadow-md relative z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-10 lg:px-16 py-3">
        {/* Logo Section with Icon and Text */}
        <div className="flex items-center space-x-3 ml-5">
          <img
            src="/pngwing.com.png"
            alt="logo"
            className="w-8 h-8 filter dark:invert-0 invert"
          />
          <span className="text-xl font-bold text-white dark:text-blue-400 hover:text-black dark:hover:text-gray-200 transition-all hover:scale-110">
            HealthVisualizer
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                {link.name}
              </a>
            </li>
          ))}
        <DarkMode />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
