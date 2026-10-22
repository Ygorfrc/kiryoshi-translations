import { getCollection } from 'astro:content';
export async function getPosts() {
  const posts = await getCollection('devlogs', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) =>
      (b.data.published?.getTime() ?? 0) - (a.data.published?.getTime() ?? 0) ||
      a.id.localeCompare(b.id),
  );
}
