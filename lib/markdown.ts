import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'; 
import remarkHtml from 'remark-html';
import rehypeRaw from 'rehype-raw';

const contentDirectory = path.join(process.cwd(), 'content');
const thingsDirectory = path.join(contentDirectory, 'things');

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  featured?: boolean;
}

export interface Post extends PostMetadata {
  content: string;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(thingsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        id: fileName.replace(/\.md$/, '')
      };
    });
}

export function getSortedPostsData(): PostMetadata[] {
  const fileNames = fs.readdirSync(thingsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(thingsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
        featured: matterResult.data.featured || false,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(thingsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  const content = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt || '',
    tags: matterResult.data.tags || [],
    featured: matterResult.data.featured || false,
  };
} 