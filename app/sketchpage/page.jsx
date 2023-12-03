import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    meshRef.current.rotation.x += Math.random() * 0.01;
    meshRef.current.rotation.y += Math.random() * 0.01;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || 'orange'} />
    </mesh>
  );
}

function CubicDisarray() {
  const numCubes = 100;
  const cubes = [];

  for (let i = 0; i < numCubes; i++) {
    const position = [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5];
    cubes.push(<Box key={i} position={position} />);
  }

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {cubes}
    </Canvas>
  );
}

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <CubicDisarray />
    </div>
  );
}