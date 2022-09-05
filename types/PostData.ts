import { FrontMatter, isFrontMatter } from "./FrontMatter";

export type PostData = FrontMatter & {
  id: string;
  contentHtml: string;
};

export const isPostData = (arg: any): arg is PostData => {
  const postData = arg as PostData;

  return (
    typeof postData?.id === "string" &&
    typeof postData?.contentHtml === "string" &&
    isFrontMatter(postData)
  );
};
