import Homepage from '../components/template/Homepage';

export const metadata = {
  title: "Real Estate Blog | Insights, Trends & Market News",
  description:
    "Stay up to date with the latest real estate news, market trends, and investment tips. Explore expert insights to make smarter property decisions.",
  keywords: [
    "real estate blog",
    "property investment tips",
    "housing market trends",
    "real estate news",
    "buying a home",
    "selling property",
    "rental market",
  ],
  openGraph: {
    title: "Real Estate Blog | Insights, Trends & Market News",
    description:
      "Stay informed with articles about real estate, property investments, and housing trends.",
    url: "https://yourdomain.com/blog",
    siteName: "Your Real Estate Brand",
    images: [
      {
        url: "https://yourdomain.com/img/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate Blog Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const page = () => {
    return ( <Homepage /> );
};

export default page;