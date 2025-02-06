import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {loading == false &&
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                authorName={blog.author.name || "Sumanjeet"}
                title={blog.title}
                content={blog.content}
                publishedDate={"19th June 2024"}
                id={blog.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
