import React from "react";


const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4 flex justify-center">
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="inline-block">
                        <button
                            className="bg-blue-500 text-white px-3 py-2 rounded mr-2"
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
