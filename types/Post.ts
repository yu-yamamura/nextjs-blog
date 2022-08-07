export type FrontMatter = {
  title: string;
  date: string;
};

export type PostData = FrontMatter & {
  id: string;
  contentHtml: string;
};