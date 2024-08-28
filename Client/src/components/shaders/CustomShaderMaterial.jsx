import { shaderMaterial } from '@react-three/drei'; // Import shaderMaterial from @react-three/drei to create custom shader materials
import vertexShader from './VertexShader'; // Import the vertex shader code
import fragmentShader from './FragmentShader'; // Import the fragment shader code

// Create a custom shader material
const CustomShaderMaterial = shaderMaterial(
  { uTime: { value: 0.0 } }, // Initialize uniforms with a time value
  vertexShader, // Pass the vertex shader
  fragmentShader, // Pass the fragment shader
  (material) => {
    material.transparent = true; // Set the material to be transparent
  }
);

export default CustomShaderMaterial; // Export the custom shader material as the default export
