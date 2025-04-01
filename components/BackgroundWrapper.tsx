'use client';

import dynamic from 'next/dynamic';

// Import the NeuralNetworkBackground with SSR disabled
const NeuralNetworkBackground = dynamic(
  () => import('./NeuralNetworkBackground'),
  { ssr: false }
);

export default function BackgroundWrapper() {
  return <NeuralNetworkBackground />;
} 