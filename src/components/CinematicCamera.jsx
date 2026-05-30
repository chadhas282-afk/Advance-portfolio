import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const target = new THREE.Vector3();

export default function CinematicCamera() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const t = scroll.offset;
    target.set(
      THREE.MathUtils.lerp(0, 1.6, t),
      THREE.MathUtils.lerp(0.2, -0.6, t),
      THREE.MathUtils.lerp(5, 3.2, t)
    );

    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}