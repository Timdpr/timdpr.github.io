import fs from 'fs';
import path from 'path';
import { getSortedPostsData } from './markdown';

export function generateRSSFeed() {
  const siteUrl = process.env.siteUrl || 'https://timdpr.com';
  const siteTitle = process.env.siteTitle || 'Tim Russell';
  const siteDescription = process.env.siteDescription || "Tim Russell's Personal Website";
  
  const allPosts = getSortedPostsData();
  
  // RSS header
  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${siteTitle}</title>
  <link>${siteUrl}</link>
  <description>${siteDescription}</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;

  // Add each post to the RSS feed
  allPosts.forEach(post => {
    const postUrl = `${siteUrl}/things/${post.id}/`;
    const pubDate = new Date(post.date).toUTCString();
    
    rss += `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${post.excerpt}]]></description>
    ${post.tags && post.tags.length > 0 ? post.tags.map(tag => `<category>${tag}</category>`).join('\n    ') : ''}
  </item>`;
  });

  // Close the RSS feed
  rss += `
</channel>
</rss>`;

  // Create the output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the RSS feed to a file
  fs.writeFileSync(path.join(outputDir, 'rss.xml'), rss);
  console.log('📝 RSS feed generated at public/rss.xml');
} 