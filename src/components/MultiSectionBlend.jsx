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
        float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  vec3 sectionColor(float p) {
    if (p < 0.25) return mix(uColor1, uColor2, smoothstep(0.0, 0.25, p));
    if (p < 0.50) return mix(uColor2, uColor3, smoothstep(0.25, 0.50, p));
    if (p < 0.75) return mix(uColor3, uColor4, smoothstep(0.50, 0.75, p));
    return mix(uColor4, uColor5, smoothstep(0.75, 1.0, p));
  }

  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 4.0 + uTime * 0.2);
    float p = clamp(uProgress + (n - 0.5) * 0.08, 0.0, 1.0);

    vec3 color = sectionColor(p);
    float alpha = 0.45;

    gl_FragColor = vec4(color, alpha);
  }
  `
);

extend({ MultiSectionBlendMaterial });

export default function MultiSectionBlend() {
  const materialRef = useRef();
  const scroll = useScroll();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uTime = state.clock.elapsedTime;
    materialRef.current.uProgress = scroll.offset;
  });
