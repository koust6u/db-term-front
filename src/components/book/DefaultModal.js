import React from "react";

const DefaultModal = ({ isOpen, closeModal, selectedBook }) => {
    if (!isOpen) {
        return null;
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md mx-auto rounded-md" style={{ width: "400px" }}>
                {/* Set the width property to control the modal's width */}
                <button className="absolute top-4 right-4 text-gray-500" onClick={closeModal}>
                    X
                </button>
                <img src={selectedBook.photo} alt={selectedBook.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-semibold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                <p>가격: {formatPrice(selectedBook.price)}</p>
                <p>저자: {selectedBook.author}</p>
                <p>소유자: {selectedBook.ownerNickName}</p>
                <p>카테고리: {selectedBook.categoryRegDto.names.join(", ")}</p>

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

export default DefaultModal;
