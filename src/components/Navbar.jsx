import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { BookOpen, LogOut, Search } from "lucide-react";
import { account } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { setParams, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await account.get();
                if (user) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Failed to check user session", error);
            }
        };

        checkUser();
    }, [setIsLoggedIn]);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-black/40 backdrop-blur-sm border-b border-white/10 text-white">
            <div className="flex items-center gap-2">
                <BookOpen size={28} className="text-white" />
                <h1 className="text-2xl font-bold text-white">
                    Durvesh Anivault
                </h1>
            </div>

            <div className="w-full max-w-md">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        className="w-full bg-black/50 text-white placeholder:text-gray-400 text-sm 
                      border border-white/20 rounded-lg pl-10 pr-4 py-2.5 
                      transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400
                      hover:border-white/40 backdrop-blur-sm"
                        placeholder="Search Animes..."
                        onChange={e => setParams(e.target.value)}
                    />
                </div>
            </div>

            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="bg-black/50 text-white border border-white/20 px-4 py-2 rounded-lg flex items-center gap-2 
                    backdrop-blur-sm
                    hover:bg-red-600/80 hover:text-white hover:border-red-500/50 transition-all duration-300"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            )}
        </div>
    );
};