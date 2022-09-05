import fs from "node:fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { isPostData, PostData } from "../types/PostData";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = async (): Promise<PostData[]> => {
  const fileNames = await fs.readdir(postsDirectory);

  const allPostsData = await Promise.all(
    fileNames.map((fileName) => {
      const id = fileName.replace(/.md$/, "");

      return getPostData(id);
    })
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

export const getAllPostIds = async (): Promise<
  {
    params: { id: string };
  }[]
> => {
  const fileNames = await fs.readdir(postsDirectory);

  return fileNames
    .map((fileName) => fileName.replace(/.md$/, ""))
    .map((id) => ({ params: { id } }));
};

export const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = await fs.readFile(fullPath);

  const matterResult = matter(fileContent);

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
