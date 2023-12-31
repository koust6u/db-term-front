import React from "react";

const DefaultModal = ({ isOpen, closeModal, selectedBook }) => {
    if (!isOpen) {
        return null;
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleBorrowClick = async () => {
        try {
            const response = await fetch('http://35.216.75.115:8080' +
                '/order/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    bookName: selectedBook.title,
                    price: selectedBook.price,
                    ownerId: selectedBook.ownerNickName,
                }),
            });

            if (response.ok) {
                // Successful borrow
                alert('대출이 성공했습니다. 소유자와 전화를 통해 도서를 받아보세요.');
                closeModal(); // Close the modal after a successful borrow
            } else {
                // Unsuccessful borrow
                alert('이미 대출 된 상품이거나 자신의 도서입니다. 또는 잔액이 부족합니다');
            }
        } catch (error) {
            console.error('Error during borrow request:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md mx-auto rounded-md" style={{ width: "400px" }}>
                <button className="absolute top-4 right-4 text-gray-500" onClick={closeModal}>
                    X
                </button>
                <img src={selectedBook.photo} alt={selectedBook.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-semibold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                <p>가격: {formatPrice(selectedBook.price)}</p>
                <p>저자: {selectedBook.author}</p>
                <p>소유자: {selectedBook.ownerNickName}</p>
                <p>거래 번호: {selectedBook.tel} </p>
                <p>카테고리: {selectedBook.categoryRegDto.names.join(", ")}</p>

                <button
                    onClick={handleBorrowClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                    대출하기
                </button>

                <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mt-4 ml-4"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default DefaultModal;
