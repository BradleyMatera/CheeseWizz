import React, { useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import vertexShader from './VertexShader';
import fragmentShader from './FragmentShader';

// Create a custom shader material using the vertex and fragment shaders
const CustomShaderMaterial = shaderMaterial(
  { uTime: 0 }, // Uniforms
  vertexShader, // Vertex shader
  fragmentShader // Fragment shader
);

// Extend the custom shader material to make it available as a JSX element
extend({ CustomShaderMaterial });

const ShaderPlane = () => {
  const ref = useRef();

  // Update the time uniform on each frame
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[10, 10]} />
      <customShaderMaterial ref={ref} />
    </mesh>
  );
};

const StarShader = () => {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <ShaderPlane />
    </Canvas>
  );
};

export default StarShader;
