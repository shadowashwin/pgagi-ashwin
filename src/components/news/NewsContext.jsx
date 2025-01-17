import React, { useState, useEffect } from 'react'
import { ThreeDCardDemo } from './ThreeDCardDemo';

export default function NewsContext() {

    const [category, setCategory] = useState("General");
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const updateNews = async (currentPage) => {
        try {
            setLoading(true);
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=7436ea363aec4b00874f9d95c8bd9c17&page=${currentPage}&pageSize=12`;
            const data = await fetch(url);
            const parsedData = await data.json();
            if (parsedData.status === "ok") {
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            }
            else {
                setError(true);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        updateNews(1);
    }, [category])

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        updateNews(pageNumber);
        window.scrollTo(0, 0);
    }

    const totalPages = Math.ceil(totalResults / 10);
    const paginationButtons = [];

    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
        paginationButtons.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-1 mx-1 rounded ${page === i ? 'bg-black text-white' : 'bg-gray-900 hover:bg-gray-300 hover:text-black'}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className='w-full h-[98%] overflow-y-auto flex flex-col sm:flex-row text-white'>
            <div className='sm:w-[20%] w-full h-auto flex flex-col cursor-pointer'>
                <div className="w-full h-auto pl-2 pr-2 pb-0 mb-0 text-9xl flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">NE</div>
                <div className="w-full h-auto pl-1 pr-1 pt-0 mt-0 mb-1 text-8xl flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-800">WS</div>
                <br />
                <div className='w-full relative h-11' onClick={() => { setCategory("General") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "General" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>GENERAL</div>
                </div>
                <div className='w-full relative h-11' onClick={() => { setCategory("Sports") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "Sports" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>SPORTS</div>
                </div>
                <div className='w-full relative h-11' onClick={() => { setCategory("Business") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "Business" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>BUSINESS</div>
                </div>
                <div className='w-full relative h-11' onClick={() => { setCategory("Entertainment") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "Entertainment" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>ENTERAINMENT</div>
                </div>
                <div className='w-full relative h-11' onClick={() => { setCategory("Health") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "Health" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>HEALTH</div>
                </div>
                <div className='w-full relative h-11' onClick={() => { setCategory("Science") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "Science" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>SCIENCE</div>
                </div>
                <div className='w-full relative h-11' onClick={() => { setCategory("Technology") }}>
                    <div className={`absolute w-full h-full rounded-l-xl ${category === "Technology" ? "bg-gray-500 opacity-40" : ""}`}></div>
                    <div className='absolute w-full text-xl font-extrabold tracking-normal hover:tracking-wider transition-all duration-300  h-full flex items-center justify-center bg-transparent'>TECHNOLOGY</div>
                </div>

            </div>
            <div className='sm:w-[2%] w-full sm:h-full h-16 sm:bg-gray-500 opacity-40'></div>
            {error && (<div className="mx-auto max-w-3xl mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            API Access Restricted
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p>
                                Browser requests are not allowed on the Developer plan. You can only access the API from:
                                <ul className="list-disc ml-5 mt-1">
                                    <li>localhost during development</li>
                                    <li>server-side applications</li>
                                    <li>premium API plans</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {!error && (<div className='sm:w-[78%] w-full h-auto sm:h-full relative mt-3 sm:mt-0'>
                <div className='absolute h-56  sm:bg-gray-500 opacity-40 w-full sm:h-full'></div>
                <div className='w-full absolute sm:h-full h-screen overflow-y-auto'>
                    {loading ? (
                        <div className="text-center">
                            <h4>Loading articles...</h4>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center mt-[30px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pl-2 pr-2" style={{ margin: '0' }}>
                                    {articles.filter((element) => element.title && element.description && element.urlToImage).map((element) => (
                                        // <div className="p-4 flex flex-col" key={element.url}>
                                        <ThreeDCardDemo
                                            title={element.title ? element.title : ""}
                                            description={element.description ? element.description : ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                        // </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center items-center my-6">
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={page === 1}
                                    className="p-2 pl-5 pr-5 mr-2 mt-2 flex items-center justify-center w-auto text-sm border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold">
                                    FIRST
                                </button>

                                {paginationButtons}

                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={page === totalPages}
                                    className="p-2 pl-5 pr-5 ml-2 mt-2 flex items-center justify-center w-auto text-sm border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold">
                                    LAST
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            )}
        </div>
    )
}

