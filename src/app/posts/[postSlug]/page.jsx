// app/posts/[postSlug]/page.tsx
import { notFound } from "next/navigation";
import axios from "axios";

// Your WordPress API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Cache page for 5 minute (ISR)
export const revalidate = 60 * 5;


// Fetch single post by ID
async function getPost(id){
  try {
    const res = await axios.get(`${API_URL}/${id}`, { params: { _embed: true } });
    return res.data;
  } catch (err) {
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const id = params.postSlug.split("-")[0];
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const description = post.content.rendered.replace(/(<([^>]+)>)/gi, "").slice(0, 160);
  const thumbnail = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/img/placeholder_image.webp";

  return {
    title: post.title.rendered,
    description,
    openGraph: {
      title: post.title.rendered,
      description,
      type: "article",
      images: [
        {
          url: thumbnail,
          alt: post.title.rendered,
        },
      ],
    },
  };
}

// Server Component page
export default async function Page({ params }) {
  const id = params.postSlug.split("-")[0];
  const post = await getPost(id);

  if (!post) notFound();

  const { title, content, _embedded, date } = post;
  const thumbnail = _embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/img/placeholder_image.webp";

  return (
    <div className="container py-8 md:py-16 lg:py-24 flex justify-center items-center flex-col">
      <img alt={title.rendered} src={thumbnail} className="rounded-2xl" />
      <p className="w-full text-end mt-3 text-sm">{new Date(date).toLocaleDateString()}</p>
      <article className="prose mx-auto mt-8 md:mt-10 lg:mt-12">
        <h1 className="font-bold lg:text-4xl md:text-2xl text-lg mb-8">{title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
      </article>
    </div>
  );
}