import fs from "node:fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { isPostData, PostData } from "../types/PostData";
import { RawPostData } from "../types/RawPostData";

const postsDirectory = path.join(process.cwd(), "posts");

export const getRawPostData = async (id: string): Promise<RawPostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = await fs.readFile(fullPath);

  return {
    id,
    content: fileContent.toString(),
  };
};

export const getSortedPostsData = async (): Promise<PostData[]> => {
  const allPostIds = await getAllPostIds();
  const allRawPostsData = await Promise.all(
    allPostIds.map((id) => getRawPostData(id))
  );
  const allPostsData = await Promise.all(
    allRawPostsData.map((rawPostData) => parseRawPostData(rawPostData))
  );

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getAllPostIds = async (): Promise<string[]> => {
  const fileNames = await fs.readdir(postsDirectory);

  return fileNames.map((fileName) => fileName.replace(/.md$/, ""));
};

export const parseRawPostData = async ({ content, id }: RawPostData) => {
  const matterResult = matter(content);

  const proceededContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);

  const postData = {
    id,
    contentHtml: proceededContent.toString(),
    ...matterResult.data,
  };

  if (isPostData(postData)) {
    return postData;
  } else {
    console.error(postData);
    throw new Error("Invalid post data");
  }
};
