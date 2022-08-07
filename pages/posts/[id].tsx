import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { PostData } from '../../types/Post';
import utilStyles from '../../styles/utils.module.css';

type Params = ParsedUrlQuery & {
  id: string;
};

type Props = {
  postData: PostData;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllPostIds();

  return ({
    paths,
    fallback: false,
  });
};

export const getStaticProps: GetStaticProps<Props, Params>  = async ({ params }) => {
  const postData = await getPostData((params as Params).id);
  const props = { postData } as Props;

  return ({ props });
};

const Post = ({ postData }: Props) => (
  <>
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
  </Layout>
  </>
);

export default Post;