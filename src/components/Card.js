import React, { useState, useEffect } from 'react';

export default function Card() {
    const [callouts, setCallouts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://35.216.75.115:8080/book/latest');
                const data = await response.json();
                setCallouts(data);
                if (data.length < 3){
                    setCallouts([
                        {
                            name: 'Desk and Office',
                            description: 'Work from home accessories',
                            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
                            imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
                            href: '#',
                        },
                        {
                            name: 'Self-Improvement',
                            description: 'Journals and note-taking',
                            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
                            imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
                            href: '#',
                        },
                        {
                            name: 'Travel',
                            description: 'Daily commute essentials',
                            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
                            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
                            href: '#',
                        },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);

                setCallouts([
                    {
                        name: 'Desk and Office',
                        description: 'Work from home accessories',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
                        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
                        href: '#',
                    },
                    {
                        name: 'Self-Improvement',
                        description: 'Journals and note-taking',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
                        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
                        href: '#',
                    },
                    {
                        name: 'Travel',
                        description: 'Daily commute essentials',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
                        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
                        href: '#',
                    },
                ]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-gray-900">최신 등록 도서</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {callouts.map((callout) => (
                            <div key={callout.title} className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img
                                        src={callout.photo}
                                        alt={callout.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href={callout.href}>
                                        <span className="absolute inset-0" />
                                        {callout.title}
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">
                                    {callout.description.length > 20
                                        ? callout.description.substring(0, 20) + '...'
                                        : callout.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
