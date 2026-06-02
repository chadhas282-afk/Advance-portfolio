import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function ScrollProgress() {
  const scroll = useScroll();
  const barRef = useRef();
