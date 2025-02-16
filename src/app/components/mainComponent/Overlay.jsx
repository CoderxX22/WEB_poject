const OverlayBg = ({ 
    backgroundImage, 
    paragraphText, 
    buttonText, 
    spanText1, 
    spanText2, 
    onClick 
}) => {
    return (
        <div className="relative">
            {/* Background Section */}
            <div
                className="w-full h-[60vh] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    filter: 'blur(2px)', // Adds a blur effect
                    zIndex: 1,
                }}
            >
                <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800"></div>
            </div>

            {/* Overlay Content Section */}
            <div className="absolute top-2/3 w-full text-center px-4 z-10">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6">
                    <span className="text-gray-800 dark:text-gray-100">{spanText1}</span>{' '}
                    <span className="text-blue-600 dark:text-blue-400">{spanText2}</span>
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-4 md:mb-6">
                    {paragraphText}
                </p>
                {buttonText && buttonText.trim() !== '' && (
                    <button
                        className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 hover:scale-110"
                        onClick={onClick} 
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OverlayBg;
