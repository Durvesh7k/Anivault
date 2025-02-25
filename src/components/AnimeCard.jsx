import PropTypes from "prop-types";

export const AnimeCard = ({ anime }) => {
    return (
        <div
            className="relative flex flex-col overflow-hidden rounded-xl 
      transition-all duration-300 ease-in-out 
      hover:scale-105 hover:shadow-indigo-900/30
      border border-gray-800 
      bg-gray-900 
      shadow-lg shadow-black/50"
        >
            {/* Anime Image with gradient overlay */}
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={anime.image_url}
                    alt={anime.title}
                    className="w-full h-48 object-cover object-top"
                />
                {/* Subtle gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
            </div>

            {/* Anime Details */}
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-white">{anime.title}</h2>
                <p className="text-gray-300 text-sm">
                    {anime.description.length > 80
                        ? `${anime.description.slice(0, 80)}...`
                        : anime.description}
                </p>

                {/* Optional Rating Display */}
                {anime.rating && (
                    <div className="flex items-center mt-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(anime.rating / 2) ? "text-yellow-400" : "text-gray-600"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="ml-2 text-xs text-gray-400">
                            {anime.rating ? (anime.rating / 2).toFixed(1) : "N/A"}
                        </span>
                    </div>
                )}
            </div>

            {/* Hover-visible action button */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent translate-y-full transition-transform duration-300 group-hover:translate-y-0 opacity-0 hover:opacity-100">
                <button className="w-full py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

AnimeCard.propTypes = {
    anime: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        rating: PropTypes.number
    }).isRequired
};