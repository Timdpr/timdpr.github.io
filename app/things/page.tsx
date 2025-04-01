import { getSortedPostsData } from '@/lib/markdown';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Things',
  description: 'A collection of things by Tim Russell',
};

export default function Things() {
  const allPostsData = getSortedPostsData();
  
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 style={{ 
        marginBottom: '2rem',
      }}>Chronological Things</h1>
      
      {allPostsData.length > 0 ? (
        <div>
          {allPostsData.map(post => (
            <div key={post.id} className="card" style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '0.8rem',
              marginBottom: '1rem',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}>
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
                  {post.tags && post.tags.length > 0 && post.tags.map(tag => (
                    <Link 
                      key={tag}
                      href={`/things/tag/${tag}`}
                      className={`tag tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ position: 'relative', zIndex: 2 }}
                    >
                      {tag}
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
        <p>No things yet. Check back soon!</p>
      )}
    </div>
  );
} 