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
    `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
    uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);