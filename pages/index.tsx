import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Date from "../components/Date";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../types/PostData";
import { siteMetadata } from "../data/site-metadata";
import utilStyles from "../styles/utils.module.css";

type Props = {
  allPostsData: PostData[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

const Home = ({ allPostsData }: Props) => (
  <Layout home>
    <Head>
      <title>{siteMetadata.title}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <h2 className={utilStyles.headingLg}>About</h2>
      <p>
        This is a blog app I built by following{" "}
        <a href="https://nextjs.org/learn/basics/create-nextjs-app">
          the Next.js tutorial
        </a>
        .
      </p>
      <p>
        The code written by TypeScript is{" "}
        <a href="https://github.com/yu-yamamura/nextjs-blog">here</a>.
      </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default Home;
