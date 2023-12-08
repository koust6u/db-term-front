import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, closeModal, selectedBook, onDelete }) => {
    const [receipt, setReceipt] = useState("ALL");
    const [status, setStatus] = useState("READY");

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try {
                const response = await fetch(`http://35.216.75.115:8080/order/status?title=${selectedBook.title}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                setReceipt(data.receipt);
                setStatus(data.status);
            } catch (error) {
                console.error("Error fetching order status:", error);
                // Handle the error as needed
            }
        };

        if (isOpen && selectedBook) {
            fetchOrderStatus();
        }
    }, [isOpen, selectedBook]);

    const handleReceiptChange = (e) => {
        setReceipt(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async () => {
        // Send a POST request to update the order status
        const response = await fetch("http://35.216.75.115:8080/order/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                title: selectedBook.title,
                receipt,
                status,
            }),
        });

        // Handle the response and update UI accordingly
        const data = await response.json();
        // Update UI or show a message based on the data received
        console.log("Order Status Updated:", data);

        // Close the modal after submitting the form
        closeModal();
    };

    const handleDelete = async () => {
        try {
            // Send a DELETE request to delete the book
            await fetch(`http://35.216.75.115:8080/book?title=${selectedBook.title}`, {
                method: "DELETE",
                credentials: "include",
            });

            // Call the onDelete function passed as a prop to update the book list
            onDelete(selectedBook.title);

            // Close the modal after deletion
            closeModal();
        } catch (error) {
            console.error("Error deleting book:", error);
            // Handle the error as needed
            closeModal();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md mx-auto rounded-md">

                <button className="absolute top-4 right-4 text-gray-500" onClick={closeModal}>
                    X
                </button>
                <img src={selectedBook.photo} alt={selectedBook.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-semibold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                <p>가격: {formatPrice(selectedBook.price)}</p>
                <p>저자: {selectedBook.author}</p>
                <p>카테고리: {selectedBook.categoryRegDto.names.join(", ")}</p>

                <div className="mt-4">
                    <label htmlFor="receipt"><strong>Receipt:</strong></label>
                    <div className="ml-2 mb-2">
                        <label className="mr-4">
                            <input
                                type="checkbox"
                                value="DIRECT"
                                checked={receipt === "DIRECT"}
                                onChange={handleReceiptChange}
                            />
                            DIRECT
                        </label>
                        <label className="mr-4">
                            <input
                                type="checkbox"
                                value="DELIVERY"
                                checked={receipt === "DELIVERY"}
                                onChange={handleReceiptChange}
                            />
                            DELIVERY
                        </label>
                        <label className="mr-4">
                            <input
                                type="checkbox"
                                value="E_BOOK"
                                checked={receipt === "E_BOOK"}
                                onChange={handleReceiptChange}
                            />
                            E_BOOK
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="ALL"
                                checked={receipt === "ALL"}
                                onChange={handleReceiptChange}
                            />
                            ALL
                        </label>
                    </div>
                    <br/>
                    <label htmlFor="status"><strong>Status:</strong></label>
                    <select
                        id="status"
                        value={status}
                        onChange={handleStatusChange}
                        className="ml-2 mb-2"
                    >
                        <option value="READY">도서 공유 대기</option>
                        <option value="DELIVER">배송 중</option>
                        <option value="COMPLETE">거래 완료</option>
                        <option value="PAYMENT_WAIT">입금 대기</option>
                        <option value="NON_PAYMENT">미납</option>
                        <option value="OVERDUE">연체</option>

                        {/* Add other status options as needed */}
                    </select>
                </div>

                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mr-2"
                >
                    Update Order Status
                </button>

                {/* Delete button */}
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                    Delete Book
                </button>

                <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mt-4"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default Modal;
