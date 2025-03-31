import { getAllPostIds, getPostData } from '@/lib/markdown';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

interface ThingPostProps {
  params: {
    id: string;
  };
}

export default async function ThingPost({ params }: ThingPostProps) {
  const post = await getPostData(params.id);
  
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '800px' }}>
      <article>
        <header style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            fontSize: '0.7rem', 
            color: 'var(--muted)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                {post.tags.map(tag => (
                  <a 
                    key={tag} 
                    href={`/things/tag/${tag}`}
                    className={`tag tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            )}
          </div>
          <h1 style={{ 
            fontSize: '1.6rem',
            marginTop: '0.2rem',
            marginBottom: '1rem'
          }}>{post.title}</h1>
        </header>
        
        <div 
          className="things-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div style={{ marginTop: '2rem' }}>
          <a href="/things" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--primary)',
            textDecoration: 'none',
            borderBottom: '1px solid transparent',
            transition: 'border-color 0.2s'
          }}>
            &larr; Back to all things
          </a>
        </div>
      </article>
    </div>
  );
} 