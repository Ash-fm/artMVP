"use client"

import React from 'react';
import { Canvas } from '@react-three/fiber';

function Box({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function CubicGrid() {
  const cubes = [];
  const rows = 22;
  const cols = 12;
  const gap = 0.1; // Define a small gap between the cubes

  for (let y = 0; y < rows; y++) {
    // Increase randomness as we move down each row
    const randomFactorY = Math.pow(y / rows, 2); // Quadratic increase towards the bottom

    for (let x = 0; x < cols; x++) {
      // Increase randomness as we move away from the center
      const randomFactorX = Math.pow((x - cols / 2) / (cols / 2), 2);

      // Base position for grid alignment
      const baseX = (x - cols / 2) * (1 + gap);
      const baseY = -(y - rows / 2) * (1 + gap);

      // Randomized offsets scaled by randomFactorY and randomFactorX
      const offsetX = (Math.random() - 0.5) * randomFactorX;
      const offsetY = (Math.random() - 0.5) * randomFactorY;
      const offsetZ = (Math.random() - 0.5) * 2 * randomFactorY;

      // Combined position with base and offset
      const posX = baseX + offsetX;
      const posY = baseY + offsetY;
      const posZ = offsetZ;

      // Randomize rotation with increasing randomness towards the bottom
      const rotX = Math.random() * Math.PI * 2 * randomFactorY;
      const rotY = Math.random() * Math.PI * 2 * randomFactorY;
      const rotZ = Math.random() * Math.PI * 2 * randomFactorY;

      // Add cube to array with calculated position and rotation
      cubes.push(
        <Box
          key={`${x}-${y}`}
          position={[posX, posY, posZ]}
          rotation={[rotX, rotY, rotZ]}
          color="skyblue"
        />
      );
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 35], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />
      {cubes}
    </Canvas>
  );
}

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <CubicGrid />
    </div>
  );
}
