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