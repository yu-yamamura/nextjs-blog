export type FrontMatter = {
  title: string;
  date: string;
};

export const isFrontMatter = (arg: any): arg is FrontMatter => {
  const frontMatter = arg as FrontMatter;

  return (
    typeof frontMatter?.title === "string" &&
    typeof frontMatter?.date === "string"
  );
};
