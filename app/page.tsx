"use client";

import { useState, useEffect } from "react";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Fetch content from WordPress
const fetchPosts = async () => {
  const res = await fetch(`https://dev-gileq.pantheonsite.io/wp-json/wp/v2/posts?_embed&per_page=20`);
  const data = await res.json();
  return data;
};

// Calculate reading time (based on average reading speed ~200 wpm)
const calculateReadingTime = (content) => {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
};

function PostCard({ post }) {
  const readingTime = calculateReadingTime(post.content.rendered);

  return (
    <Link href={`/posts/${post.slug}`} className="group">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        {/* Post Image */}
        <div className="relative aspect-[16/9] w-full m-0 p-0">
          <Image
            src={
              post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.svg"
            }
            alt={post.title.rendered}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 right-0 bottom-0 m-0 p-0"
          />
        </div>

        {/* Post Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category and Reading Time (Moved below the image) */}
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold bg-teal-600 px-2 py-1 rounded-lg">
              {post._embedded["wp:term"]?.[0]?.[0]?.name || "Uncategorized"}
            </span>
            <span className="bg-gray-800 text-white px-2 py-1 rounded-lg">
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300">
            <span
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></span>
          </h3>

          {/* Excerpt */}
          <div
            className="text-gray-600 text-sm line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          ></div>

          {/* Arrow Icon */}
          <div className="flex justify-end mt-auto">
            <ArrowUpRight className="w-4 h-4 text-teal-600" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  return (
    <Section className="py-8">
      <Container>
        {/* Recent Articles */}
        <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-teal-500">
          Recent Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* All Articles */}
        <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-teal-500">
          All Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
