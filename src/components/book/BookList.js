import React, { useState, useEffect } from "react";
import DefaultModal from "./DefaultModal"; // Import your modal component
import Pagination from "../Pagination"; // Import your Pagination component

const MAX_BODY_LENGTH = 150;
const ITEMS_PER_PAGE = 5;

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null); // New state for selected book

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://35.216.75.115:8080/book/all", {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
        }
    };

    const renderBooks = () => {
        if (!books || books.length === 0) {
            return (
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-lg mb-4">등록된 책이 없습니다.</p>
                </div>
            );
        }

        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);
        return (
            <div>
                <ul className="space-y-4">
                    {currentItems.map((book) => (
                        <li
                            key={book.title}
                            className="flex bg-white p-4 rounded shadow-md transition duration-300 hover:shadow-lg"
                        >
                            <div className="flex-shrink-0 w-25 h-25">
                                <img
                                    src={book.photo}
                                    alt={book.title}
                                    className="w-52 h-52 object-cover rounded-4 "
                                />
                            </div>

                            <div className="ml-4">
                                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                                <p className="text-gray-700">
                                    {truncateText(book.description, MAX_BODY_LENGTH)}
                                </p>
                                <div className="mt-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleDetailView(book)}
                                    >
                                        자세히 보기
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p>
                                        가격: {formatPrice(book.price)}
                                    </p>
                                    <strong>
                                        저자: {book.author}
                                    </strong>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination
                    itemsPerPage={ITEMS_PER_PAGE}
                    totalItems={books.length}
                    paginate={paginate}
                />
                <DefaultModal
                    isOpen={selectedBook !== null}
                    closeModal={() => setSelectedBook(null)}
                    selectedBook={selectedBook}
                />
            </div>
        );
    };

    const handleDetailView = (book) => {
        setSelectedBook(book);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">도서 목록</h1>
            {renderBooks()}
        </div>
    );
};

export default BookList;
