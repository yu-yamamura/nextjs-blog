import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import {
  getAllPostIds,
  getRawPostData,
  parseRawPostData,
} from "../../lib/posts";
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
  const paths = (await getAllPostIds()).map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const rawPostData = await getRawPostData((params as Params).id);
  const postData = await parseRawPostData(rawPostData);

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
