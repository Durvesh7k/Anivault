import { useContext } from "react"
import { DataContext } from "../context/DataProvider"
import { BookOpen } from "lucide-react";


export const Navbar = () => {
    const { setParams } = useContext(DataContext);

    return (
        <div className="grid gap-6  md:gap-0 md:flex justify-between m-6">
            <div className="flex gap-2">
                <span className="flex justify-center my-1 ">{<BookOpen size={30} />}</span>
                <h1 className="text-3xl font-bold">Durvesh Anivault</h1>
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>

                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Search Animes"
                        onChange={e => setParams(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

