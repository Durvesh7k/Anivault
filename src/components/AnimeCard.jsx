import PropTypes from "prop-types";
export const AnimeCard = ({anime}) => {
    return (
        <div
            className="relative flex flex-col overflow-hidden rounded-xl transition-transform duration-500 ease-in-out hover:scale-105 shadow-lg"
        >
            <img
                src={anime.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{anime.title}</h2>
                <p className="text-gray-600 mt-2">
                    {anime.description.slice(0,30)}
                    <span>....</span>
                </p>
            </div>
        </div>
    );
}

AnimeCard.propTypes = {
    anime : PropTypes.object
}