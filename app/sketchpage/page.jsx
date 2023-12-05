"use client"
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function CubicGrid() {
  const rows = 22;
  const cols = 12;
  const gap = 0.1;
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    if (cubes.length < rows * cols) {
      const timeoutId = setTimeout(() => {
        const i = cubes.length;
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Define base grid positions
        const baseX = (col - cols / 2) * (1 + gap);
        const baseY = -(row - rows / 2) * (1 + gap);

        // Calculate normalized coordinates: 0 at top to 1 at bottom
        const normalizedY = row / (rows - 1);

        // Non-linear increase in randomness
        const increaseFactor = Math.pow(normalizedY, 2); // Example: quadratic increase

        // Randomness factors
        const factorX = Math.pow(normalizedY, 3) + increaseFactor; // Applying non-linear increase for x-axis
        const factorY = Math.pow(normalizedY, 3) + increaseFactor; // Applying non-linear increase for y-axis
        const factorZ = Math.pow(normalizedY, 2); // Less aggressive curve for z-axis
        
        // Apply increasing randomness based on row position
        const posX = baseX + (Math.random() - 0.5) * 2 * factorX; // Apply randomness to x
        const posY = baseY + (Math.random() - 0.5) * 2 * factorY; // Apply randomness to y
        const posZ = (Math.random() - 0.5) * 2 * factorZ;         // Apply randomness to z

        const rotX = Math.random() * Math.PI * 2 * factorZ;
        const rotY = Math.random() * Math.PI * 2 * factorZ;
        const rotZ = Math.random() * Math.PI * 2 * factorZ;

        // Add new cube to the cubes array
        setCubes(cubes => [
          ...cubes,
          <Box
            key={`${col}-${row}`}
            position={[posX, posY, posZ]}
            rotation={[rotX, rotY, rotZ]}
            color="skyblue"
          />
        ]);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [cubes, cols, rows, gap]);

  return (
    <Canvas camera={{ position: [0, 0, 35], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />
      {cubes}
      <OrbitControls />
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
