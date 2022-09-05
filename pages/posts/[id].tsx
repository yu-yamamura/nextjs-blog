import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import { PostData } from "../../types/PostData";
import utilStyles from "../../styles/utils.module.css";

type Params = ParsedUrlQuery & {
  id: string;
};

type Props = {
  postData: PostData;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const postData = await getPostData((params as Params).id);

  return {
    props: { postData },
  };
};

const Post = ({ postData: { title, date, contentHtml } }: Props) => {
  return (
    <>
      <Layout home={false}>
        <Head>
          <title>{title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingX1}>{title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
        </article>
      </Layout>
    </>
  );
};
export default Post;
