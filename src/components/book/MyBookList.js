// MyBookList.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Modal from "./Modal"; // Import the Modal component

const MAX_BODY_LENGTH = 150;
const ITEMS_PER_PAGE = 5;

const MyBookList = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:8080/book", {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setBooks(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setError("Error fetching books. Please try again later.");
            setLoading(false);
            setBooks([]);
        }
    };

    const renderBooks = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        if (!Array.isArray(books)) {
            console.error("Invalid data format. Expected an array.");
            return null;
        }

        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div>
                {books.length === 0 && (
                    <div className="text-center mt-8">
                        <p className="text-gray-600 text-lg mb-4">등록된 책이 없습니다.</p>
                    </div>
                )}

                <ul className="space-y-4">
                    {currentItems.map((book) => (
                        <li key={book.id} className="flex bg-white p-4 rounded shadow-md transition duration-300 hover:shadow-lg">
                            <div className="flex-shrink-0 w-25 h-25">
                                <img src={book.photo} alt={book.title} className="w-52 h-52 object-cover rounded-4" />
                            </div>

                            <div className="ml-4">
                                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                                <p className="text-gray-700">{truncateText(book.description, MAX_BODY_LENGTH)}</p>
                                <div className="mt-4">
                                    <button onClick={() => handleDetailsClick(book)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                                        자세히 보기
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p>가격: {formatPrice(book.price)}</p>
                                    <strong>저자: {book.author}</strong>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={books.length} paginate={paginate} />
            </div>
        );
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleDetailsClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">내 도서 목록</h1>
            {renderBooks()}

            {/* Modal component */}
            <Modal
                isOpen={isModalOpen}
                closeModal={() => {
                    setIsModalOpen(false);
                    fetchBooks(); // Update book list after status update
                }}
                selectedBook={selectedBook}
            />

            <div className="text-center mt-8">
                <Link to="/book/registration" className="bg-blue-500 text-white px-6 py-3 rounded inline-block">
                    등록하기
                </Link>
            </div>
        </div>
    );
};

export default MyBookList;
