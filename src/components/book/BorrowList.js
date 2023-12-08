import React, { useState, useEffect } from "react";
import DefaultModal from "./DefaultModal"; // Import your modal component
import Pagination from "../Pagination";
import BorrowModal from "./BorrowModal"; // Import your Pagination component

const MAX_BODY_LENGTH = 150;
const ITEMS_PER_PAGE = 5;

const BorrowList = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null); // New state for selected book

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const fetchBorrowedBooks = async () => {
        try {
            const response = await fetch("http://35.216.75.115:8080/book/borrow", {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setBorrowedBooks(data);
        } catch (error) {
            console.error("Error fetching borrowed books:", error);
            setBorrowedBooks([]);
        }
    };

    const renderBorrowedBooks = () => {
        if (!borrowedBooks || borrowedBooks.length === 0) {
            return (
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-lg mb-4">대출 중인 책이 없습니다.</p>
                </div>
            );
        }

        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        const currentItems = borrowedBooks.slice(indexOfFirstItem, indexOfLastItem);
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
                                    src={book.img}
                                    alt={book.title}
                                    className="w-52 h-52 object-cover rounded-4 "
                                />
                            </div>

                            <div className="ml-4">
                                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                                <p className="text-gray-700">
                                    {truncateText(book.desc, MAX_BODY_LENGTH)}
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
                                        대출 기간: {book.period}
                                    </p>
                                    <strong>
                                        소유자: {book.owner}
                                    </strong>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination
                    itemsPerPage={ITEMS_PER_PAGE}
                    totalItems={borrowedBooks.length}
                    paginate={paginate}
                />
                <BorrowModal
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

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">대출 중인 도서 목록</h1>
            {renderBorrowedBooks()}
        </div>
    );
};

export default BorrowList;
