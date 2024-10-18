import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Calculate reading time (based on average reading speed ~200 wpm)
const calculateReadingTime = (content) => {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
};

function PostCard({ post }) {
  const readingTime = calculateReadingTime(post.content.rendered);

  return (
    <Link href={`/posts/${post.slug}`} className="group">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        {/* Post Image */}
        <div className="relative aspect-[16/9] w-full"> {/* Ensure no margin here */}
          <Image
            src={
              post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.svg"
            }
            alt={post.title.rendered}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 right-0 bottom-0"
          />
        </div>

        {/* Post Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category and Reading Time */}
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

export default PostCard;
