import { client } from "@/tina/__generated__/client";
import { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const _posts = await client.queries.postConnection({
        sort: "published_at",
      });
      console.log({ _posts });
      setPosts(_posts?.data?.postConnection?.edges);
    };

    fetchPosts();
  }, []);


  return (
    <>
      {posts?.map((post) => {
        return <div>{post?.node?.title}</div>;
      })}
    </>
  );
};

export default BlogList;
