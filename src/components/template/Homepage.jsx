"use client";
import Image from "next/image";

import React from 'react';
import HomepagePosts from "../elements/HomepagePosts";

const Homepage = () => {
    return (
        <div>
            {/* Hero Section */}
            <header className="relative">
                {/* Hero Background Image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/img/HomeBanner.png"
                        alt="Real estate blog background"
                        fill
                        priority
                        quality={70}
                        className="object-cover object-bottom"
                    />
                </div>

                {/* Hero Content */}
                <div className="py-48 container">
                    <div className="flex flex-col justify-center items-center gap-y-4 text-center mb-8">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-100 drop-shadow">
                        Insights & Trends in Real Estate
                        </h1>
                        <p className="md:w-2/3 lg:text-xl text-sm md:text-base text-neutral-300">
                        Stay informed with the latest market updates, expert advice, and
                        property investment tips. Explore articles that help you make
                        smarter real estate decisions.
                        </p>
                    </div>
                </div>
            </header>
            {/* posts section */}
            <HomepagePosts />
            <footer className="w-full bg-neutral-600 text-neutral-50 flex items-center justify-center py-3">
                <p>Realtyna | Task</p>
            </footer>
        </div>
    );
};

export default Homepage;