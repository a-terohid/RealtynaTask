import Link from 'next/link';
import React from 'react';

const PostCard = ({ post }) => {

    const { title , _embedded , date , id } = post

    // Get the thumbnail image 
    const thumbnail = _embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/img/placeholder_image.webp";

    return (
        <div className='p-2 border border-neutral-300 h-full rounded-3xl hover:shadow-md'>
            <Link href={`/posts/${id}-${post.slug}`} className='hover:grayscale-[0.5]' >
                <img alt={title.rendered} src={thumbnail} className="rounded-2xl w-full h-60 object-cover"/>
            </Link>
            <div className='pt-4 px-2 mb-2'>
                <p>{new Date(date).toLocaleDateString()}</p>                
                <h1 href='' className='font-bold'>{title.rendered}</h1>
            </div>
        </div>
    );
};

export default PostCard;