import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const MultiSectionBlendMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uColor1: new THREE.Color('#0b0f1a'),
    uColor2: new THREE.Color('#1e1b4b'),
    uColor3: new THREE.Color('#0f172a'),
    uColor4: new THREE.Color('#111827'),
    uColor5: new THREE.Color('#1f2937'),
  },
   `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,