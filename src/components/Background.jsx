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
       speed: THREE.MathUtils.randFloat(6, 12),
      length: THREE.MathUtils.randFloat(3, 6),
      size: THREE.MathUtils.randFloat(0.02, 0.05),
      life: THREE.MathUtils.randFloat(1, 2.5),
    }));
  }, [count, area]);

  const resetStar = (star) => {
    star.position.set(
      THREE.MathUtils.randFloatSpread(area),
      THREE.MathUtils.randFloat(area * 0.2, area * 0.5),
      THREE.MathUtils.randFloatSpread(area)
       );
    star.velocity.set(
      THREE.MathUtils.randFloat(-1, 1),
      THREE.MathUtils.randFloat(-0.3, -1.2),
      THREE.MathUtils.randFloat(-1, 1)
    ).normalize();
    star.speed = THREE.MathUtils.randFloat(6, 12);
    star.length = THREE.MathUtils.randFloat(3, 6);
    star.size = THREE.MathUtils.randFloat(0.02, 0.05);
    star.life = THREE.MathUtils.randFloat(1, 2.5);
  };

  useFrame((_, delta) => {
    data.forEach((star, i) => {
      star.position.addScaledVector(star.velocity, delta * star.speed);
      star.life -= delta;

      if (
        Math.abs(star.position.x) > area ||
        Math.abs(star.position.y) > area ||
        Math.abs(star.position.z) > area ||
        star.life <= 0
      ) {
        resetStar(star);
      }

      dummy.position.copy(star.position);
      dummy.scale.set(star.size, star.length, star.size);
      dummy.lookAt(star.position.clone().add(star.velocity));
      dummy.updateMatrix();

      instancedRef.current.setMatrixAt(i, dummy.matrix);
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedRef} args={[null, null, count]}>
      <cylinderGeometry args={[1, 1, 1, 6, 1, true]} />
      <meshBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
