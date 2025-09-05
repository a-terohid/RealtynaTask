"use client"

import { useState } from "react";
import usePosts from "../hooks/usePosts";
import PostCard from "./cards/PostCard";
import { PostCardSkeleton } from "./cards/PostCardSkeleton";

const HomepagePosts = () => {
    // State for current page number
    const [page, setPage] = useState(1);

    // Fetch posts using custom hook (with pagination)
    const { data, isLoading, isError } = usePosts(page, 6);
    
    return (
        <div className="py-8 md:py-16 lg:py-24 container">
            {/* Section title */}
            <h1 className="lg:text-4xl md:text-2xl text-lg font-bold mb-8">Posts:</h1>

            {/* Error state */}
            {
                isError ? <h1>Error fetching posts</h1> :

                // Posts grid
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        // Show skeletons while loading
                        isLoading && !data 
                          ? [...Array(6)].map((_, i) => (
                              <li key={i}><PostCardSkeleton /></li>
                            ))
                          // Render post cards once data is available
                          : data?.data.map((post, index) => (
                              <li key={index}><PostCard post={post} /></li>
                            ))
                    }
                </ul>
            }

            {/* Pagination controls */}
            <div className="flex gap-x-4 justify-center items-center mt-12">
                {/* Previous page button */}
                <button  disabled={page === 1}  onClick={() => setPage((p) => p - 1)}   className="px-4 py-2 bg-gray-200 hover:bg-gray-400 hover:disabled:bg-gray-200 rounded-lg disabled:opacity-50 hover:cursor-pointer ">
                    Prev
                </button>

                {/* Current page info */}
                <span>{page} of {data?.totalPages}</span>

                {/* Next page button */}
                <button
                  disabled={page === data?.totalPages} onClick={() => setPage((p) => p + 1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-400 hover:disabled:bg-gray-200 rounded-lg disabled:opacity-50 hover:cursor-pointer ">
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomepagePosts;