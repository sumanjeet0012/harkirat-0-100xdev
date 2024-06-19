import BlogCard from "../components/BlogCard";

export const Blogs = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-xl">
        <BlogCard
          authorName="Sumanjeet"
          title="This is the title of my first blog which is so cool. I hope this will make a difference "
          content="this is the content of my first blog which is so cool and it is going to be published on a clone of medium web app"
          publishedDate="2022-01-01"
        />
        <BlogCard
          authorName="Sumanjeet"
          title="This is the title of my first blog which is so cool. I hope this will make a difference "
          content="this is the content of my first blog which is so cool and it is going to be published on a clone of medium web app"
          publishedDate="2022-01-01"
        />
        <BlogCard
          authorName="Sumanjeet"
          title="This is the title of my first blog which is so cool. I hope this will make a difference "
          content="this is the content of my first blog which is so cool and it is going to be published on a clone of medium web app"
          publishedDate="2022-01-01"
        />
        <BlogCard
          authorName="Sumanjeet"
          title="This is the title of my first blog which is so cool. I hope this will make a difference "
          content="this is the content of my first blog which is so cool and it is going to be published on a clone of medium web app"
          publishedDate="2022-01-01"
        />
      </div>
    </div>
  );
};

export default Blogs;
