import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
}

const BlogDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/blog.json");
        const blogs: Blog[] = response.data;
        const foundBlog = blogs.find((b) => b.slug === slug) || null;
        setBlog(foundBlog);
      } catch (error) {
        console.error(error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Blog not found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4 ">{blog.title}</h1>
      <time
        dateTime={blog.publishedAt}
        className="block mb-8 text-gray-400 italic"
      >
        Published on{" "}
        {new Date(blog.publishedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-full object-cover rounded-lg mb-8 shadow-md"
        loading="lazy"
      />

      <article className="prose prose-lg max-w-none text-gray-800">
        {blog.excerpt}
      </article>
      <article className="prose prose-lg max-w-none text-gray-800">
        {blog.content}
      </article>

      <div className="mt-4">
        <Link to="/">
          <button className="flex gap-2 mt-2 text-blue-500 btn ">
            {" "}
            <IoIosArrowRoundBack className=" text-2xl" /> Back To Blog{" "}
          </button>
        </Link>
      </div>
    </main>
  );
};

export default BlogDetailsPage;
