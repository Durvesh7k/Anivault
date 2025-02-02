import { useState, useEffect, useContext } from "react";
import { databases } from '../lib/appwrite';
import { AnimeCard } from "../components/AnimeCard";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";


export const Home = () => {
    const [animeList, setAnimeList] = useState([]);
    const {params} = useContext(DataContext);

    const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
    const PROJECT_NAME_ID = import.meta.env.VITE_APPWRITE_PROJECT_NAME_ID;

    useEffect(() => {
        const fetchAnimeList = async () => {
            try {
                const response = await databases.listDocuments(
                    PROJECT_NAME_ID,
                    COLLECTION_ID,
                );

                setAnimeList(response.documents);
            } catch (error) {
                console.error("Error fetching anime list:", error);
            }
        };

        fetchAnimeList();
    }, []);


    return (
        <div className="p-8">
            <div className="anime-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {animeList.length > 0 ? (
                    animeList
                    .filter(anime => anime.title.match(new RegExp(params, "i")))
                    .map((anime) => (
                        <Link to={`/anime/${anime.$id}`} key={anime.$id} >
                            <AnimeCard anime={anime} />
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500">Loading anime list...</p>
                )}
            </div>
        </div>)
}

export default Home