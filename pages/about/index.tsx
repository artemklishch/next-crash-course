import Router from "next/router";
import { MainLayout } from "../../components/MainLayout";
import { AboutTitle } from "../../interfaces/title";

interface TitlePageProps {
  title: AboutTitle
}

export default function About({ title }: TitlePageProps) {
  const linkClickHandler = () => Router.push("/");
  return (
    <MainLayout title="About Page">
      <h1>{title}</h1>
      <button onClick={linkClickHandler}>Go back to home</button>
      <button onClick={() => Router.push("/posts")}>Go to posts inline</button>
    </MainLayout>
  );
}

About.getInitialProps = async () => {
  const response = await fetch(`http://localhost:4200/about`);
  const data: AboutTitle = await response.json();
  return { title: data.title };
}