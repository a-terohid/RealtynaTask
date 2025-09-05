"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Head from "next/head";


// Replace with your actual API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const Page = () => {

    // Get route params
    const params = useParams();
    const slug = params.postSlug;

    // Extract post ID from slug
    const id = slug.split("-")[0];

    // Fetch single post using React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
        const res = await axios.get(`${API_URL}/${id}`, {
            params: {
            _embed: true, // include embedded resources (featured image, author, etc.)
            },
        });
        return res.data;
        },
        enabled: !!id, // only fetch if id exists
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading post</p>;
    if (!data) return <p>No post found</p>;

    const { title , _embedded , date , content } = data

   const thumbnail = _embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/img/placeholder_image.webp";


  return (
    <>
        {/* SEO & Metadata */}
        <Head>
            <title>{title.rendered}</title>
            <meta
            name="description"
            content={content.rendered
                .replace(/(<([^>]+)>)/gi, "")
                .slice(0, 160)}
            />
            {/* Open Graph / Social Media */}
            <meta property="og:title" content={title.rendered} />
            <meta property="og:description" content={content.rendered.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
            <meta property="og:image" content={thumbnail} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        </Head>
        <div className=" container py-8 md:py-16 lg:py-24 flex justify-center items-center flex-col">
            <img alt={title.rendered} src={thumbnail} className=" rounded-2xl" />
            <p className="w-full text-end mt-3 text-sm lg:">{new Date(date).toLocaleDateString()}</p> 
            <article className="prose mx-auto mt-8 md:mt-10 lg:mt-12">
                <h1 className="font-bold lg:text-4xl md:text-2xl text-lg mb-8">{title.rendered}</h1>
                <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
            </article>
        </div>
    </>
  );
};

export default Page;