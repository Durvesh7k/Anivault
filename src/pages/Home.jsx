import { useState, useEffect, useContext } from "react";
import { collection_id, databases, project_name_id } from '../lib/appwrite';
import { AnimeCard } from "../components/AnimeCard";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import Loading from "../components/Loading";
import { Query } from "appwrite";
import { ArrowUp } from "lucide-react";

export const Home = () => {
    const [animeList, setAnimeList] = useState([]);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { params } = useContext(DataContext);

    useEffect(() => {
        const fetchAnimeList = async () => {
            try {
                const response = await databases.listDocuments(
                    project_name_id,
                    collection_id,
                    [
                        Query.limit(100),
                        Query.offset(0)
                    ]
                );
                
                setAnimeList(response.documents);
            } catch (error) {
                console.error("Error fetching anime list:", error);
            }
        };

        fetchAnimeList();

        // Add scroll event listener
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const filteredAnimeList = animeList.filter(anime => 
        anime.title.match(new RegExp(params, "i"))
    );

    return (
        <div className="p-8 relative">
            <h2 className="text-sm text-gray-600 font-semibold mb-4">
                All ({filteredAnimeList.length})
            </h2>
            <div className="anime-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredAnimeList.length > 0 ? (
                    filteredAnimeList.map((anime) => (
                        <Link to={`/anime/${anime.$id}`} key={anime.$id}>
                            <AnimeCard anime={anime} />
                        </Link>
                    ))
                ) : (
                    <div className="flex justify-center items-center">
                        <Loading message="Loading Anime List..." />
                    </div>
                )}
            </div>

            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed cursor-pointer bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
                    aria-label="Back to top"
                >
                    <span className="text-sm font-medium">Back to Top</span>
                    <ArrowUp size={20} />
                </button>
            )}
        </div>
    );
};

export default Home;