import { useParams } from "react-router-dom"
import { collection_id, databases, project_name_id } from "../lib/appwrite";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const response = await databases.getDocument(
                    project_name_id,
                    collection_id,
                    id,
                )
                setAnime(response);
            } catch (error) {
                console.log("This error occurred :", error);
            }
        }

        fetchAnimeDetails();
    }, [id]);

    return (
        <div className="p-3 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {anime ?
                <div>
                    <div className="grid grid-cols-1 gap-4 p-2 md:p-0 md:gap-0 md:grid-cols-2">
                        <div className="flex justify-center">
                            <img
                                src={anime.image_url}
                                alt={anime.title}
                                className="inset-0 w-120 h-120 object-cover shadow-md rounded-md"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{anime.title}</h1>
                            <p className="text-gray-600 text-justify text-lg leading-relaxed whitespace-pre-line">
                                {anime.description.length > 950 ? anime.description.substring(0, 950) : anime.description}
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-600 p-2 md:p-6 text-justify text-lg leading-relaxed whitespace-pre-line">
                        {anime.description.length > 950 ? anime.description.substring(950, anime.description.length) : ""}
                    </p>
                </div> :
                <div className="h-screen">
                    <Loading message="Loading anime Details" />
                </div>
            }
        </div>
    )
}

export default AnimeDetails