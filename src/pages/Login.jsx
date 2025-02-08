import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import {account} from '../lib/appwrite';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {setIsLoggedIn} = useContext(DataContext)

    const signUp = async (e) => {
        e.preventDefault();

        try{
            const response = await account.createEmailPasswordSession(email, password);

            if(response){
                setIsLoggedIn(true);
                navigate('/add-search');
            }
        } catch(error){
            console.log("Invalid credentials", error);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col rounded-xl bg-transparent mt-8">
                <h4 className="block text-xl font-medium text-slate-800">
                    Sign Up
                </h4>
                <p className="text-slate-500 font-light">
                    Nice to meet you! Enter your details to register.
                </p>
                <form onSubmit={signUp} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-slate-600">
                                Email
                            </label>
                            <input onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-slate-600">
                                Password
                            </label>
                            <input type="password" onChange={e => setPassword(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password" />
                        </div>
                    </div>
                    <button type = "submit" className="mt-4 w-full cursor-pointer rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Sign Up
                    </button>
                    <p className="flex cursor-pointer justify-center mt-6 text-sm text-slate-600">
                        Don&apos;t have an account?
                        <a href="#signup" className="ml-1 text-sm font-semibold text-slate-700 underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login