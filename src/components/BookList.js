import {Link} from "react-router-dom";
import {useState} from "react";


const MAX_BODY_LENGTH = 150;

const ITEMS_PER_PAGE = 5;

const BookList = () => {
    const dummyData =  [
        { id: 1,author: '장태완',price: 123000 ,title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.', image: 'https://i.namu.wiki/i/eR0-fTYcnvJ7279ah62u-iVftojeRQxVzNYRG0c5PLwwGDATlzXBmMOcVfHpHcu4a2HHPO23Oo--JJXv5KbJUFXIExuyHDFZbVOKSk2YrDgNL9YXSzEEi9Ehc6BN9YbsCReeOjWFHDZl9RprvTGPIw.webp'},
        { id: 2,author: '윤동주',price: 789000000,title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.', image: 'https://i.namu.wiki/i/fhxpBbDTiX1D98fXFR27NwCYAWHB5CR5CuqDb0TxwHrbrx_SXFbKeAeSvAwrcW3-Yn4NRWeS9KRx13S-HoZg8_HI4labPQC9fDgXbFa6gtqaGwUMRe8SIHM6nGn4HVWE8FPREdKEBJwyNH1dKG94-w.jpg' },
        { id: 3,author: '장태완',price: 123000 ,title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.', image: 'https://i.namu.wiki/i/eR0-fTYcnvJ7279ah62u-iVftojeRQxVzNYRG0c5PLwwGDATlzXBmMOcVfHpHcu4a2HHPO23Oo--JJXv5KbJUFXIExuyHDFZbVOKSk2YrDgNL9YXSzEEi9Ehc6BN9YbsCReeOjWFHDZl9RprvTGPIw.webp'},
        { id: 4,author: '윤동주',price: 789000000,title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.', image: 'https://i.namu.wiki/i/fhxpBbDTiX1D98fXFR27NwCYAWHB5CR5CuqDb0TxwHrbrx_SXFbKeAeSvAwrcW3-Yn4NRWeS9KRx13S-HoZg8_HI4labPQC9fDgXbFa6gtqaGwUMRe8SIHM6nGn4HVWE8FPREdKEBJwyNH1dKG94-w.jpg' },
        { id: 5,author: '장태완',price: 123000 ,title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.', image: 'https://i.namu.wiki/i/eR0-fTYcnvJ7279ah62u-iVftojeRQxVzNYRG0c5PLwwGDATlzXBmMOcVfHpHcu4a2HHPO23Oo--JJXv5KbJUFXIExuyHDFZbVOKSk2YrDgNL9YXSzEEi9Ehc6BN9YbsCReeOjWFHDZl9RprvTGPIw.webp'},
        { id: 6,author: '윤동주',price: 789000000,title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.', image: 'https://i.namu.wiki/i/fhxpBbDTiX1D98fXFR27NwCYAWHB5CR5CuqDb0TxwHrbrx_SXFbKeAeSvAwrcW3-Yn4NRWeS9KRx13S-HoZg8_HI4labPQC9fDgXbFa6gtqaGwUMRe8SIHM6nGn4HVWE8FPREdKEBJwyNH1dKG94-w.jpg' },
        { id: 7,author: '장태완',price: 123000 ,title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.', image: 'https://i.namu.wiki/i/eR0-fTYcnvJ7279ah62u-iVftojeRQxVzNYRG0c5PLwwGDATlzXBmMOcVfHpHcu4a2HHPO23Oo--JJXv5KbJUFXIExuyHDFZbVOKSk2YrDgNL9YXSzEEi9Ehc6BN9YbsCReeOjWFHDZl9RprvTGPIw.webp'},
        { id: 8,author: '윤동주',price: 789000000,title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.', image: 'https://i.namu.wiki/i/fhxpBbDTiX1D98fXFR27NwCYAWHB5CR5CuqDb0TxwHrbrx_SXFbKeAeSvAwrcW3-Yn4NRWeS9KRx13S-HoZg8_HI4labPQC9fDgXbFa6gtqaGwUMRe8SIHM6nGn4HVWE8FPREdKEBJwyNH1dKG94-w.jpg' },
        { id: 9,author: '장태완',price: 123000 ,title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.', image: 'https://i.namu.wiki/i/eR0-fTYcnvJ7279ah62u-iVftojeRQxVzNYRG0c5PLwwGDATlzXBmMOcVfHpHcu4a2HHPO23Oo--JJXv5KbJUFXIExuyHDFZbVOKSk2YrDgNL9YXSzEEi9Ehc6BN9YbsCReeOjWFHDZl9RprvTGPIw.webp'},
        { id: 10,author: '윤동주',price: 789000000,title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.', image: 'https://i.namu.wiki/i/fhxpBbDTiX1D98fXFR27NwCYAWHB5CR5CuqDb0TxwHrbrx_SXFbKeAeSvAwrcW3-Yn4NRWeS9KRx13S-HoZg8_HI4labPQC9fDgXbFa6gtqaGwUMRe8SIHM6nGn4HVWE8FPREdKEBJwyNH1dKG94-w.jpg' },
        { id: 11,author: '장태완',price: 123000 ,title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.이것은 첫 번째 게시물입니다.', image: 'https://i.namu.wiki/i/eR0-fTYcnvJ7279ah62u-iVftojeRQxVzNYRG0c5PLwwGDATlzXBmMOcVfHpHcu4a2HHPO23Oo--JJXv5KbJUFXIExuyHDFZbVOKSk2YrDgNL9YXSzEEi9Ehc6BN9YbsCReeOjWFHDZl9RprvTGPIw.webp'},
        { id: 12,author: '윤동주',price: 789000000,title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.이것은 두 번째 게시물입니다.', image: 'https://i.namu.wiki/i/fhxpBbDTiX1D98fXFR27NwCYAWHB5CR5CuqDb0TxwHrbrx_SXFbKeAeSvAwrcW3-Yn4NRWeS9KRx13S-HoZg8_HI4labPQC9fDgXbFa6gtqaGwUMRe8SIHM6nGn4HVWE8FPREdKEBJwyNH1dKG94-w.jpg' },

    ];

    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 표시할 데이터 계산
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <div>
            <List posts={currentItems} />
            <Pagination
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={dummyData.length}
                paginate={paginate}
            />
        </div>
    );
};
const List = ({ posts }) => {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
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
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="flex bg-white p-4 rounded shadow-md transition duration-300 hover:shadow-lg"
                    >
                        <div className="flex-shrink-0 w-25 h-25">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-52 h-52 object-cover rounded-4 "
                            />
                        </div>

                        <div className="ml-4">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-700">
                                {truncateText(post.body, MAX_BODY_LENGTH)}
                            </p>
                            <div className="mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    자세히 보기
                                </button>
                            </div>

                            <div className="text-right">
                                <p>
                                    크레딧: {formatPrice(post.price)}
                                </p>
                                <strong>
                                    저자: {post.author}
                                </strong>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


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






export default BookList;


