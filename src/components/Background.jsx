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
  `, `
  varying vec3 vWorldPosition;
  uniform float uTime;
  uniform vec3 uColorTop;
  uniform vec3 uColorMid;
  uniform vec3 uColorBottom;

  void main() {
    float h = normalize(vWorldPosition + vec3(0.0, uTime * 0.05, 0.0)).y;
    vec3 color = mix(uColorBottom, uColorMid, smoothstep(-0.2, 0.4, h));
    color = mix(color, uColorTop, smoothstep(0.3, 1.0, h));
    gl_FragColor = vec4(color, 1.0);
  }
  `
);

extend({ GradientDomeMaterial });

function ShootingStars({ count = 12, area = 80 }) {
  const instancedRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    return new Array(count).fill().map(() => ({
        position: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(area),
        THREE.MathUtils.randFloatSpread(area / 2),
        THREE.MathUtils.randFloatSpread(area)
      ),
      velocity: new THREE.Vector3(
        THREE.MathUtils.randFloat(-1, 1),
        THREE.MathUtils.randFloat(-0.3, -1.2),
        THREE.MathUtils.randFloat(-1, 1)
      ).normalize(),