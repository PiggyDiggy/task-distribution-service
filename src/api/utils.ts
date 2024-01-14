import { revalidatePath, revalidateTag } from "next/cache";

type Tag = "staff" | "tasks" | "scope";
type Path = "/";

type Args = {
  tags: Tag[];
  paths?: Path[];
};

export const revalidateCache = ({ tags, paths = [] }: Args) => {
  tags.forEach((tag) => revalidateTag(tag));
  paths.forEach((path) => revalidatePath(path));
};
