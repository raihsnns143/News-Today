import React from 'react';
import Marquee from 'react-fast-marquee';

const LatesNews = () => {
    return (
        <div>
            <div className='flex items-center gap-5 section-bg p-2 cursor-default'>
                <p className='font-semibold primary-bg text-white px-3 py-2 rounded cursor-pointer'>Latest</p>
                    <Marquee className='flex gap-5' pauseOnHover={true} speed={60}>
                    <p className='font-semibold text-black'>Bangladesh's Export Earnings Show Strong Growth in Q1 2025.</p>
                    <p className='font-semibold text-black'>Foreign Investment in Bangladesh Reaches Record High in Fiscal Year 2024-25.</p>
                    <p className='font-semibold text-black'>E-commerce Sector in Bangladesh Sees Rapid Expansion Amidst Digital Adoption.</p>
                    </Marquee>
                </div>
            </div>
    );
};

export default LatesNews;
