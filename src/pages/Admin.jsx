import { Plus } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { bucket_id, collection_id, databases, project_name_id } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataProvider'
import { Account, Storage, ID } from 'appwrite';
import { client } from '../lib/appwrite';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext);

    const handleImage = async (e) => {
        try {
            const storage = new Storage(client);
            const response = await storage.createFile(
                bucket_id,
                ID.unique(),
                e.target.files[0],
            )
            const image_url = storage.getFileView(
                bucket_id,
                response.$id,
            )

            setImageUrl(image_url);
        } catch (error) {
            console.log(error);
        }
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await databases.createDocument(
                project_name_id,
                collection_id,
                ID.unique(),
                {
                    title: title,
                    description: description,
                    image_url: imageUrl
                }
            )

            navigate('/');
            setLoading(false);
        } catch (err) {
            console.log("Error in adding the anime:", err);
        }
    }

    return (
        <div>
            {isLoggedIn ?
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <Plus className="h-6 w-6 text-gray-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Add New Anime</h2>
                        <h2 className="text-2xl font-bold text-gray-800">Add New Anime</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image
                            </label>

                            <input
                                type="file"
                                onChange={handleImage}
                                required
                                className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />

                            {imageUrl != '' && <div className='m-4'>
                                <img className='w-60 h-60' src={imageUrl}/>
                            </div>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Anime'}
                        </button>
                    </form>
                </div> : <div>You are not authorized to view this page...</div>
            }
        </div>
    )
}

export default Admin