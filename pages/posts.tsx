import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import Link from "next/link";
import { MyPost } from '../interfaces/post'
import { NextPageContext } from "next";

interface PostsPageProps {
  posts: MyPost[],
}

export default function Posts({ posts: serverData }: PostsPageProps) {
  const [postsData, setPostsData] = useState(serverData);
  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts`);
      const json = await response.json();
      setPostsData(json);
    }
    if (!serverData) {
      load();
    }
  }, []);
  if (!postsData) {
    return (
      <MainLayout title="Posts Page">
        <p>Loading...</p>
      </MainLayout>
    );
  }
  return (
    <MainLayout title="Posts Page">
      <h1>Posts Page</h1>
      <ul>
        {postsData.map((post) => (
          <li key={post.id}>
            <Link href={`/post/[id]`} as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { post: null };
  }
  const response = await fetch(`${process.env.API_URL}/posts`);
  const posts: MyPost[] = await response.json();
  return { posts };
};
