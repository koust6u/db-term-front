import React, { useState, useEffect } from "react";

const stats = [
    { id: 1, name: '우리 도서관 사용자', value: '44 million' },
    { id: 2, name: '등록된 도서', value: '$119 trillion' },
    { id: 3, name: '성장 가능성', value: '100%' },
];

const Summary = () => {
    const [userCount, setUserCount] = useState(44000000); // Default value for user count
    const [bookCount, setBookCount] = useState(119000000000); // Default value for book count

    useEffect(() => {
        // Fetch user count from the endpoint
        const fetchUserCount = async () => {
            try {
                const response = await fetch("http://localhost:8080/member/count");
                const data = await response.json();
                setUserCount(data); // Update user count in state
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        // Fetch book count from the endpoint
        const fetchBookCount = async () => {
            try {
                const response = await fetch("http://localhost:8080/book/count");
                const data = await response.json();
                setBookCount(data); // Update book count in state
            } catch (error) {
                console.error("Error fetching book count:", error);
            }
        };

        fetchUserCount();
        fetchBookCount();
    }, []); // Run this effect only once on component mount

    // Update the 'value' fields with the fetched counts
    stats[0].value = userCount.toLocaleString();
    stats[1].value = bookCount.toLocaleString();

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default Summary;
