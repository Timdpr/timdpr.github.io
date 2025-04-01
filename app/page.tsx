import { getSortedPostsData } from '@/lib/markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const allPostsData = getSortedPostsData();
  // Create a merged posts array with featured posts first, then non-featured posts
  // Use a Set to track IDs and avoid duplicates
  const displayPosts = [];
  const addedPostIds = new Set();
  
  // Add featured posts first
  const featuredPosts = allPostsData.filter(post => post.featured);
  for (const post of featuredPosts) {
    displayPosts.push(post);
    addedPostIds.add(post.id);
  }
  
  // Then add recent posts that aren't already included
  for (const post of allPostsData) {
    if (!addedPostIds.has(post.id) && displayPosts.length < 4) {
      displayPosts.push(post);
      addedPostIds.add(post.id);
    }
  }
  
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="home-layout">
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <Image 
              src="/images/profile.webp" 
              alt="Tim Russell" 
              width={200}
              height={200}
              style={{ 
                borderRadius: '50%', 
                objectFit: 'cover',
                display: 'block',
                margin: '0 auto 1rem'
              }} 
            />
            <h1 style={{ textAlign: 'center' }}>Tim Russell</h1>
            <p style={{ textAlign: 'center', color: 'var(--muted)'}}>
              Lead AI Engineer @ PersuasionXP
            </p>
            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              <a href="https://linkedin.com/in/timothy-parker-russell" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: 'var(--muted)' }}>
                <FontAwesomeIcon icon={faLinkedin} size="sm" style={{ width: '2em', height: '2em' }} />
              </a>
              <a href="https://github.com/timdpr" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: 'var(--muted)' }}>
                <FontAwesomeIcon icon={faGithub} size="sm" style={{ width: '2em', height: '2em' }} />
              </a>
              <a href="mailto:qotimsa@live.co.uk" style={{ margin: '0 10px', color: 'var(--muted)' }}>
                <FontAwesomeIcon icon={faEnvelope} size="sm" style={{ width: '2em', height: '2em' }} />
              </a>
            </p>
          </div>
        </div>
        
        <div>
          <div>
            {displayPosts.length > 0 ? (
              <div>
                {displayPosts.map(post => (
                  <div 
                    key={post.id}
                    className="card" 
                    style={{
                      background: 'var(--card-bg, #f8f5f1)',
                      border: '1px solid var(--border, #d3cec4)',
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
                          background: 'var(--accent, #8b795e)'
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
                      color: 'var(--text-muted, #555)'
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
              <p>No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
