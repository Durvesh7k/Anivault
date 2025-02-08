import { useState, useEffect, useContext } from "react";
import { collection_id, databases, project_name_id } from '../lib/appwrite';
import { AnimeCard } from "../components/AnimeCard";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import Loading from "../components/Loading";


export const Home = () => {
    const [animeList, setAnimeList] = useState([]);
    const { params } = useContext(DataContext);

    useEffect(() => {
        const fetchAnimeList = async () => {
            try {
                const response = await databases.listDocuments(
                    project_name_id,
                    collection_id,
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
                    <div className="flex justify-center items-center">
                        <Loading message="Loading Anime List..." />
                    </div>
                )}
            </div>
        </div>)
}

export default Home