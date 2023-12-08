// BookRegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BookRegistrationForm = () => {
    const [bookInfo, setBookInfo] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        categoryRegDto: {
            names: []  // 수정된 부분
        },
        photo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookInfo({ ...bookInfo, [name]: value });

    };

    const handleCategoryChange = (e) => {
        const { options } = e.target;
        const selectedCategories = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
        setBookInfo({ ...bookInfo, categoryRegDto: { names: selectedCategories } });  // 수정된 부분


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if (bookInfo.price <= 0) {
            alert('가격은 0보다 커야 합니다.');
            return;
        }

        if (bookInfo.description.length < 50) {
            alert('설명은 50자 이상 입력해주세요.');
            return;
        }

        try {
            // Adjust the endpoint accordingly
            await axios.post('http://35.216.75.115:8080/book/registration', bookInfo);
            alert('책이 성공적으로 등록되었습니다.');
            window.location.href = "/book/my"
        } catch (error) {
            console.error('책 등록 중 오류 발생:', error);
            alert('책 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">책 등록</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                    제목:
                    <input
                        type="text"
                        name="title"
                        value={bookInfo.title}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                    />
                </label>

                <label className="block mb-4">
                    저자:
                    <input
                        type="text"
                        name="author"
                        value={bookInfo.author}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                    />
                </label>

                <label className="block mb-4">
                    설명:
                    <textarea
                        name="description"
                        value={bookInfo.description}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                    />
                </label>

                <label className="block mb-4">
                    가격:
                    <input
                        type="number"
                        name="price"
                        value={bookInfo.price}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                    />
                </label>


                <label className="block mb-4">
                    카테고리:
                    <select
                        multiple
                        name="categoryRegDto"  // 수정된 부분
                        onChange={handleCategoryChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                    >
                        <option value="공상과학">공상 과학</option>
                        <option value="공포">공포</option>
                        <option value="IT">IT</option>
                        <option value="수능">수능</option>
                        <option value="만화">만화</option>
                        <option value="교양">교양</option>
                        <option value="정치">정치</option>
                        <option value="시사">시사</option>
                    </select>
                </label>

                <label className="block mb-4">
                    사진 링크:
                    <input
                        type="text"
                        name="photo"
                        value={bookInfo.photo}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                    />
                </label>

                <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
                    등록하기
                </button>
            </form>
        </div>
    );
};

export default BookRegistrationForm;
