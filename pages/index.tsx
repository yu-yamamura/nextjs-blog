import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import { getSortedPostData } from '../lib/posts';
import { PostData } from '../types/Post';
import utilStyles from '../styles/utils.module.css';

type Props = {
  allPostsData: PostData[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = getSortedPostData();

  return ({
    props: {
      allPostsData,
    }
  });
};

const Home = ({ allPostsData }: Props) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>{`Hi, there! I'm Yuki.`}</p>
      <p>
        {`(This is a sample website -  you'll be building a site like this on `}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
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