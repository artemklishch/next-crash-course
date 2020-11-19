import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "../../components/MainLayout";
import Link from "next/link";
import { NextPageContext } from "next";
import { MyPost } from "../../interfaces/post";

// export default function Post(props) {
//   const router = useRouter();
//   // console.log(router);
//   console.log(props);
//   return (
//     <MainLayout>
//       <h1>Post {router.query.id}</h1>
//     </MainLayout>
//   );
// }

interface PostPageProps {
  post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [certainPost, setCertainPost] = useState(serverPost);
  const router = useRouter();
  useEffect(() => {
    async function load() {
      const response = await fetch(
        `${process.env.API_URL}/posts/${router.query.id}`
      );
      const data = await response.json();
      setCertainPost(data);
    }
    if (!serverPost) {
      load();
    }
  }, []);
  if (!certainPost) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <h1>{certainPost.title}</h1>
      <hr />
      <p>{certainPost.body}</p>
      <Link href="/posts">
        <a>Back to all posts</a>
      </Link>
    </MainLayout>
  );
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string,
  }
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
  if (!req) {
    return { post: null };
  }
  const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
  const post: MyPost = await response.json();
  return { post };
};

// export async function getServerSideProps({ query, req }) {
//   // if (!req) {
//   //   return { post: null };
//   // }
//   const response = await fetch(`http://localhost:4200/posts/${query.id}`);
//   const post = await response.json();
//   return { props: { post } };
// }

// class Post extends React.Component {
//   static async getInitialProps(ctx) {
//     const id = ctx.query.id;
//     const response = await fetch(`http://localhost:4200/posts/${id}`);
//     const post = await response.json();
//     return { post };
//   }

//   render() {
//     return (
//       <MainLayout>
//         <h1>Post {this.props.post.id}</h1>
//         <p>{this.props.post.body}</p>
//       </MainLayout>
//     );
//   }
// }

// export default Post;
