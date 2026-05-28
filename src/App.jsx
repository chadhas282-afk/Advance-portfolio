import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, Loader } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Background from './components/Background';
import CinematicCamera from './components/CinematicCamera';
import SectionTransition from './components/SectionTransition';
import MultiSectionBlend from './components/MultiSectionBlend';
import './App.css';

export default function App() {
  return (
    <>
      <Cursor />
     <div
  style={{
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    background: '#050505',
    cursor: 'none'
  }}
>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

          <Suspense fallback={null}>
            <Environment preset="city" />
