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
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 4.0 + uTime * 0.2);
    float edge = uProgress;
    float mask = smoothstep(edge - 0.15, edge + 0.15, n);

    vec3 color = mix(uColorA, uColorB, n);
    float alpha = mask * 0.4;

    gl_FragColor = vec4(color, alpha);
  }
  `
);
