import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const GradientDomeMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorTop: new THREE.Color('#0b0f1a'),
    uColorMid: new THREE.Color('#1e1b4b'),
    uColorBottom: new THREE.Color('#05060a'),
  },
    `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
  `,