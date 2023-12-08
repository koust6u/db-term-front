import React, {useState} from 'react';
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid';
import axios from 'axios';
import './../css/SignUp.css';

export default function SignUp() {
    return (
        <div className="flex justify-center items-center">
            <Registration/>
        </div>
    );
}


function Registration() {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [message, setMessage] = useState('');
    const [tel, setTel] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPhotoUrl, setNewPhotoUrl] = useState('');

    const years = Array.from({length: new Date().getFullYear() - 1901 + 1}, (_, i) => 1901 + i);

    const handlePhotoChange = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = () => {
        setPhotoUrl(newPhotoUrl);
        setIsModalOpen(false);
    };

    const handlePasswordConfirm = () => {
        var formattedBirthday;
        if (password === passwordConfirm) {
            if (birthMonth < 10) {
                formattedBirthday = `${birthYear}-0${birthMonth}`;
            } else {
                formattedBirthday = `${birthYear}-${birthMonth}`;
            }

            if (birthDay < 10) {
                formattedBirthday += `-0${birthDay}`;
            } else {
                formattedBirthday += `-${birthDay}`;
            }

            const userData = {
                userId,
                username,
                password,
                email,
                birthday: formattedBirthday,
                name: username,
                message,
                tel,
                url: newPhotoUrl || photoUrl,
            };

            axios
                .post('http://35.216.75.115:8080/member/signup', userData)
                .then((response) => {
                    console.log('Registration successful:', response.data);
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                });
        } else {
            alert('비밀번호가 일치하지 않습니다.');
            console.log('비밀번호 불일치');
        }
    };
    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">




                        <div className="sm:col-span-4">
                            <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">
                                아이디
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="userId"
                                        id="userId"
                                        autoComplete="uerId"
                                        onChange={(e) => setUserId(e.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="로그인 아이디"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                비밀번호
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="8자 이상 영문 숫자 혼합"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password-confirm"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                비밀번호 확인
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="password"
                                        name="password-confirm"
                                        id="password-confirm"
                                        autoComplete="password"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="8자 이상 영문 숫자 혼합"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true"/>
                                <button
                                    type="button"
                                    onClick={handlePhotoChange}
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                        메시지
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="message"
                            id="message"
                            onChange={(e) => setMessage(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="프로필 소개를 입력하세요"
                        />
                    </div>
                </div>


                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 max-w-md mx-auto rounded-md" style={{width: '400px'}}>
                            <button className="absolute top-4 right-4 text-gray-500"
                                    onClick={() => setIsModalOpen(false)}>
                                X
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Change Photo</h2>
                            <label htmlFor="newPhotoUrl" className="block text-sm font-medium leading-6 text-gray-900">
                                New Photo URL
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="newPhotoUrl"
                                    value={newPhotoUrl}
                                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter the new photo URL"
                                />
                            </div>
                            <button
                                onClick={handleModalSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                이름
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                                전화번호
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                    <input
                                        type="text"
                                        name="tel"
                                        id="tel"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="010-XXXX-XXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                이메일 주소
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="birth-year" className="block text-sm font-medium leading-6 text-gray-900">
                    생년월일
                </label>
                <div className="mt-2 flex space-x-2">
                    <select
                        name="birth-year"
                        id="birth-year"
                        autoComplete="bday-year"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="" disabled>출생년도</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <select
                        name="birth-month"
                        id="birth-month"
                        autoComplete="bday-month"
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(e.target.value)}
                        className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="" disabled>월</option>
                        {Array.from({length: 12}, (_, i) => i + 1).map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="birth-day"
                        id="birth-day"
                        autoComplete="bday-day"
                        value={birthDay}
                        onChange={(e) => setBirthDay(e.target.value)}
                        className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="일"
                    />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handlePasswordConfirm}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    제출
                </button>
            </div>
        </form>
    )
}
