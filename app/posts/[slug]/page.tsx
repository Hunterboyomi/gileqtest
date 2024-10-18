import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getPostsByCategory,
} from "@/lib/wordpress";
import { Section, Container, Article } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title.rendered,
    description: post.excerpt.rendered,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch the post data
  const post = await getPostBySlug(params.slug);

  // Fetch featured media, author, category
  const featuredMedia = await getFeaturedMediaById(post.featured_media);
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  // Fetch related posts from the same category
  const popularPosts = await getPostsByCategory(category.id);

  // Fetching keywords from ACF
  const searchKeywords = post.acf?.search_keywords || ""; // Adjust 'search_keywords' based on your field name

  return (
    <Section>
      <Container className="flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <h1>
            <Balancer>
              <span
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></span>
            </Balancer>
          </h1>

          <div className="flex justify-between items-center gap-4 text-sm mb-4">
            <h5>
              Published {date} by{" "}
              {author.name && (
                <span>
                  <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
                </span>
              )}
            </h5>
            <Link
              href={`/posts/?category=${category.id}`}
              className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
            >
              {category.name}
            </Link>
          </div>

          {/* Featured Image */}
          <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
            {/* eslint-disable-next-line */}
            <img
              className="w-full"
              src={featuredMedia.source_url}
              alt={post.title.rendered}
            />
          </div>

          <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          {/* Display Search Keywords */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Research Topics</h3>
            <ul className="list-disc list-inside">
              {searchKeywords.split(",").map((keyword, index) => (
                <li key={index}>
                  <Link
                    href={`/search?q=${encodeURIComponent(keyword.trim())}`}
                    className="text-blue-600 hover:underline"
                  >
                    {keyword.trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section: Popular Articles */}
        <div className="w-full md:w-1/4 md:pl-6 mt-8 md:mt-0">
          <h3 className="font-bold text-xl mb-4">Popular Articles</h3>
          <div className="space-y-4">
            {popularPosts.map((article) => (
              <div key={article.id} className="flex items-start gap-3">
                {/* Small Image Thumbnail */}
                <div className="w-16 h-16 overflow-hidden rounded-md bg-accent/25">
                  <img
                    className="w-full h-full object-cover"
                    src={article.featured_media_src_url} // Adjust based on the API response structure
                    alt={article.title.rendered}
                  />
                </div>

                {/* Article Title and Date */}
                <div className="flex-1">
                  <Link
                    href={`/posts/${article.slug}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {article.title.rendered}
                  </Link>
                  <p className="text-xs text-muted mt-1">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
