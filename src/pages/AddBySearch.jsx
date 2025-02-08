import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { bucket_id, client, collection_id, databases, project_name_id } from '../lib/appwrite';
import { ID, Account, Storage } from 'appwrite';
import Loading from '../components/Loading'

function AddBySearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const account = new Account(client);
                const user = await account.get();
                if (user) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log("Not logged in: ", error);
            }
        }

        checkUser();
    }, [setIsLoggedIn]);

    const searchAnime = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setSearchLoading(true);
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setSearchLoading(false);
            setAnimes(data.data);
        } catch (error) {
            console.error('Error fetching anime:', error);
        } finally {
            searchLoading(false);
        }
    };

    const addToList = async (anime) => {
        try {
            setLoading(true);
            const response = await fetch(anime.images.jpg.large_image_url);
            const blob = await response.blob();
            const file = new File([blob], `${ID.unique()}.jpg`, { type: blob.type });

            const storage = new Storage(client);

            const storageResponse = await storage.createFile(
                bucket_id,
                ID.unique(),
                file
            );

            const image_url = storage.getFileView(bucket_id, storageResponse.$id);
            await databases.createDocument(
                project_name_id,
                collection_id,
                ID.unique(),
                {
                    title: anime.title,
                    description: anime.synopsis,
                    image_url: image_url
                }
            );

            navigate('/');
            setLoading(false);
        } catch (err) {
            console.log("Error in adding the anime:", err);
        }
    };

    return (
        <div className="h-screen bg-gray-100">
            {!loading ? <>
                {isLoggedIn && <div className="container mx-auto px-4 py-8">
                    <h3 className="text-4xl font-bold text-center mb-8 text-black">Anime Search</h3>

                    <form onSubmit={searchAnime} className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for an anime..."
                                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none"
                            />
                            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <button
                                type="submit"
                                className="absolute cursor-pointer right-2 top-2 bg-neutral-900 text-white px-4 py-1.5 rounded-md hover:bg-neutral-700 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {searchLoading && (
                        <Loading />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {animes.map((anime) => (
                            <div
                                key={anime.mal_id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={anime.images.jpg.image_url}
                                    alt={anime.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-semibold text-gray-800 flex-1">{anime.title}</h2>
                                        <button
                                            onClick={() => addToList(anime)}
                                            className='bg-indigo-100 rounded-3xl h-8 w-8 flex items-center justify-center cursor-pointer text-indigo-600 hover:bg-indigo-200'
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-3">{anime.synopsis}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {animes.length === 0 && !loading && (
                        <div className="text-center text-gray-500 mt-8">
                            Search for your favorite anime to add or <Link className='underline' to={'/admin'}> add manually</Link>
                        </div>

                    )}
                </div>}
            </> :
                <Loading message="Loading Anime List..." />
            }
        </div>
    );
}

export default AddBySearch;
