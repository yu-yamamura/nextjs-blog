import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { PostData } from '../types/Post';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostData = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContent);
    return ({
      id,
      ...matterResult.data,
    }) as PostData;
  });

  return allPostData.sort(({ date: a }, { date: b }) =>
    a < b
      ? 1
      : a > b
        ? -1
        : 0
  );
};

export const getAllPostIds = () =>
  fs.readdirSync(postsDirectory)
    .map((fileName) => fileName.replace(/.md$/, ''))
    .map((id) => ({
      params: { id }
    }));

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath);

  const matterResult = matter(fileContent);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);

  return ({
    id,
    contentHtml: processedContent.toString(),
    ...matterResult.data,
  }) as PostData;
};