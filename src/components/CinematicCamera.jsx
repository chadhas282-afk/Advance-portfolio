import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const target = new THREE.Vector3();

export default function CinematicCamera() {
  const { camera } = useThree();
  const scroll = useScroll();
