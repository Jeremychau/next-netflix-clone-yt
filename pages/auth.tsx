import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

const Auth = () => {
    const [ email, setEmail] = useState('');
    const [ name, setName] = useState('');
    const [ password, setPassword] = useState('');

    const [varinant, setVarinant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVarinant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {email, name, password})
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', { email, password, redirect: false, callbackUrl: '/' })
        } catch (error) {
            console.log(error);
        }
    }, [email, password])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{varinant === 'login'? 'Sign In' : 'Register'}</h2>
                        <div className="flex flex-col gap-4">
                            {varinant === 'register' && (
                                <Input id="name" onChange={(event:any) => setName(event.target.value)} value={name} label="User Name" />
                            )}
                            <Input id="email" onChange={(event:any) => setEmail(event.target.value)} value={email} label="email" type="email" />
                            <Input id="password" onChange={(event:any) => setPassword(event.target.value)} value={password} label="Password" type="password" />
                        </div>
                        <button onClick={varinant === 'login'? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-300 translate">
                            {varinant === 'login'? 'Login' : 'Sign Up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {varinant === 'login'? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {varinant === 'login'? 'Create An Account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Auth;