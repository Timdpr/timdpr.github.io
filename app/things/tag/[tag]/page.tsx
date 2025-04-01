import { getSortedPostsData } from '@/lib/markdown';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  const allPostsData = getSortedPostsData();
  const uniqueTags = new Set<string>();
  
  allPostsData.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => uniqueTags.add(tag));
    }
  });
  
  return Array.from(uniqueTags).map(tag => ({
    tag,
  }));
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  return {
    title: `Things tagged with "${params.tag}"`,
    description: `All posts tagged with ${params.tag}`,
  };
}

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const allPostsData = getSortedPostsData();
  const filteredPosts = allPostsData.filter(post => post.tags?.includes(tag));
  
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 style={{ 
        marginBottom: '2rem',
      }}>Posts tagged with &quot;{tag}&quot;</h1>
      
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map(post => (
            <div 
              key={post.id}
              className="card" 
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '0.8rem',
                marginBottom: '1rem',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                fontSize: '0.7rem', 
                color: 'var(--muted)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '0.3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>{new Date(post.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                  {post.tags && post.tags.length > 0 && post.tags.map(t => (
                    <Link 
                      key={t} 
                      href={`/things/tag/${t}`}
                      className={`tag tag-${t.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ position: 'relative', zIndex: 2 }}
                    >
                      {t}
                    </Link>
                  ))}
                  {post.featured && <span className="tag" style={{ 
                    background: 'var(--accent)'
                  }}>Featured</span>}
                </div>
              </div>
              <h3 style={{ 
                fontSize: '1.1rem',
                marginTop: '0.2rem',
                marginBottom: '0.5rem'
              }}>{post.title}</h3>
              <p style={{ 
                fontSize: '0.85rem',
                margin: 0,
                color: 'var(--text-muted)'
              }}>{post.excerpt}</p>
              
              {/* Card clickable overlay */}
              <Link 
                href={`/things/${post.id}`} 
                className="card-link"
                aria-label={post.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1
                }}
              ></Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found with tag &quot;{tag}&quot;.</p>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <Link href="/things" style={{ 
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
        </Link>
      </div>
    </div>
  );
} 