'use client';

import { useEffect } from 'react';

// Define types for neural network animation
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hasConnections: boolean; // Track if the node has any connections
  opacity: number; // For fading in/out
}

export default function NeuralNetworkBackground() {
  useEffect(() => {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.2'; // Very subtle
    canvas.style.pointerEvents = 'none'; // Don't interfere with clicks
    document.body.appendChild(canvas);

    // Resize canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a set of nodes
    const nodes: Node[] = [];
    const numNodes = Math.min(40, Math.floor(window.innerWidth * window.innerHeight / 25000));
    
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        hasConnections: false,
        opacity: 0
      });
    }

    // Define fade speeds
    const fadeInSpeed = 0.05; // Increase to fade in faster
    const fadeOutSpeed = 0.03; // Decrease to fade out slower

    // Animation function
    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#333';
      
      // Reset connection status for all nodes but preserve opacity
      for (const node of nodes) {
        node.hasConnections = false;
      }
      
      // Update node positions
      for (const node of nodes) {
        // Move node
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }
      
      // Draw connections between nodes that are close enough
      // and mark nodes that have connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDistance = 100;
          if (distance < maxDistance) {
            // Mark both nodes as having connections
            nodes[i].hasConnections = true;
            nodes[j].hasConnections = true;
            
            // Draw the connection - opacity based on distance and node opacities
            const connectionOpacity = (1 - distance / maxDistance) * 
                                     Math.min(nodes[i].opacity, nodes[j].opacity);
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.globalAlpha = connectionOpacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      // Update node opacities based on connection status and draw them
      for (const node of nodes) {
        // Adjust opacity based on connection status
        if (node.hasConnections && node.opacity < 1) {
          node.opacity += fadeInSpeed;
          if (node.opacity > 1) node.opacity = 1;
        } else if (!node.hasConnections && node.opacity > 0) {
          node.opacity -= fadeOutSpeed;
          if (node.opacity < 0) node.opacity = 0;
        }
        
        // Only draw nodes with some opacity
        if (node.opacity > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.globalAlpha = node.opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return null;
} 