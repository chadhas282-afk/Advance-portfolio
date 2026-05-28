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

           <ScrollControls pages={5} damping={0.1}>
  <CinematicCamera />
  <Background />
  <Scene />
  <MultiSectionBlend /> 
  <Scroll html style={{ width: '100%' }}>
    <ScrollProgress />
    <Overlay />
  </Scroll>
</ScrollControls>

            <EffectComposer>
              <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0015, 0.0015]} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <Loader 
        containerStyles={{ background: '#050505' }} 
        innerStyles={{ width: '400px', height: '10px' }} 
        barStyles={{ background: '#4f46e5', height: '10px' }} 
        dataStyles={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff', marginTop: '20px' }} 
        dataInterpolation={(p) => `LOADING EXPERIENCE ${p.toFixed(0)}%`} 
      />
    </>
  );
}