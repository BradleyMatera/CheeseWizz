// Vertex Shader
const vertexShader = `
  precision mediump float; // Set the precision for floating-point numbers to medium
  varying vec2 vUv; // Declare a varying variable to pass UV coordinates to the fragment shader

  void main() {
    vUv = uv; // Assign the UV coordinates to the varying variable
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Calculate the position of the vertex
  }
`;

export default vertexShader; // Export the vertex shader as the default export