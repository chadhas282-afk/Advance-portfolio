import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const LiquidTransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uColorA: new THREE.Color('#0b0f1a'),
    uColorB: new THREE.Color('#6366f1'),
  },