import React, {useState} from 'react';
import axios from "axios";


export default function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/member/login',
            JSON.stringify({ userId, password }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log('Login Successful');
                window.location.href = "/";
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    const rawDate = error.response.data;
                    const formattedDate = new Date(rawDate).toLocaleString();
                    alert(`회원님께서는 : ${formattedDate}까지 이용이 정지 되어있습니다.`);
                    window.location.href="/"
                } else {
                    alert("잘못된 아이디 또는 비밀번호입니다. 다시 입력해주세요.");
                    console.error('Error during login:', error);
                }
            });


    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">
                                USER ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userId"
                                    name="userId"
                                    type="userId"
                                    autoComplete="userId"
                                    required
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/member/signup"
                           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
