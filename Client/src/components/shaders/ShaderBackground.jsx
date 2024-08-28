import React, { useRef } from 'react'; // Import React and the useRef hook for creating references to DOM elements or component instances
import { Canvas, extend, useFrame } from '@react-three/fiber'; // Import Canvas for rendering 3D content, extend to add custom elements, and useFrame for animation loops
import { shaderMaterial } from '@react-three/drei'; // Import shaderMaterial to create custom shader materials
import vertexShader from './VertexShader'; // Import the vertex shader code
import fragmentShader from './FragmentShader'; // Import the fragment shader code
import CustomShaderMaterial from './CustomShaderMaterial'; // Import the custom shader material

// Extend the shader material to make it available as a JSX element
extend({ CustomShaderMaterial });

const ShaderPlane = () => {
  const ref = useRef(); // Create a reference to the shader material

  // Update the time uniform on each frame
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime(); // Update the uTime uniform with the elapsed time
    }
  });

  return (
    <mesh scale={[10, 10, 1]}> {/* Create a mesh with a plane geometry */}
      <planeGeometry args={[10, 10]} /> {/* Define the plane geometry with size 10x10 */}
      <customShaderMaterial ref={ref} /> {/* Apply the custom shader material to the mesh */}
    </mesh>
  );
};

const ShaderBackground = () => {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      {/* Create a Canvas that covers the entire viewport and is fixed in position */}
      <ShaderPlane /> {/* Render the ShaderPlane component inside the Canvas */}
    </Canvas>
  );
};

export default ShaderBackground; // Export the ShaderBackground component as the default export