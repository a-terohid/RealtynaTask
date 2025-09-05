"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// WordPress REST API endpoint for fetching posts
const API_URL = process.env.API_URL || ""

// Custom React Query hook for fetching posts with pagination
export default function usePosts(page = 1, perPage = 6) {
  return useQuery({
    // Query key: unique identifier for caching and refetching
    queryKey: ["posts", page],

    // Query function: fetch posts from WordPress API
    queryFn: async () => {
      const res = await axios.get(API_URL, {
        params: {
          page,               // current page number
          per_page: perPage,  // number of posts per page
          _embed: true,       // include embedded resources (e.g., featured image, author)
        },
      });

      return {
        data: res.data,  // array of posts
        totalPages: Number(res.headers["x-wp-totalpages"]), // total number of pages
        totalPosts: Number(res.headers["x-wp-total"]),      // total number of posts
      };
    },

    // Keep previous page data when fetching the next one
    keepPreviousData: true,
  });
}