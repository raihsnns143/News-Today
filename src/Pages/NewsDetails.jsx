import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import RightAside from '../Components/HomeLayout/RightAside';
import NewsDetailsCard from '../Components/NewsDetailsCard';
import { useLoaderData, useParams } from "react-router-dom";

const NewsDetails = () => {

    const {id} = useParams();
    const newsData = useLoaderData();

    const [news, setNews] = useState({})

    // console.log(newsData, id, news);

    useEffect(()=>{
        const newsDetails = newsData.find(singleNews=>singleNews.id == id)
        setNews(newsDetails)
    },[newsData, id])

    return (
        <div className="bg-white text-black">
            <header>
                <Header />
            </header>
            <main className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-5'>
                <section className='md:col-span-9 col-span-1'>
                    <h2 className='font-bold primary-text mb-5'>News Details</h2>
                    <NewsDetailsCard news={news} />
                </section>
                <aside className='md:col-span-3 col-span-1 sticky md:top-0 h-fit'>
                    <RightAside />
                </aside>
            </main>
        </div>
    );
};

export default NewsDetails;
