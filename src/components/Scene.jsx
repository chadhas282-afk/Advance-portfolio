import { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, MeshTransmissionMaterial } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

export default function Scene() {
  const meshRef = useRef();
  const groupRef = useRef();
  const glassRef = useRef();
  const light1Ref = useRef();
  const light2Ref = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const { viewport } = useThree();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
     tl.current.to(groupRef.current.position, { x: -2.5, y: 0, z: 2 }, 0);
    tl.current.to(groupRef.current.rotation, { x: Math.PI / 2, y: 0, z: -0.5 }, 0);
    tl.current.to(groupRef.current.position, { x: 2.5, y: -0.5, z: 1 }, 1);
    tl.current.to(groupRef.current.rotation, { x: 0, y: Math.PI, z: 0.5 }, 1);
    tl.current.to(groupRef.current.position, { x: 0, y: 0, z: 3.5 }, 2);
  }, []);

  useFrame((state) => {
    tl.current.seek(scroll.offset * tl.current.duration());
    const targetX = (state.pointer.x * viewport.width) / 10;
    const targetY = (state.pointer.y * viewport.height) / 10;
    if (meshRef.current) {