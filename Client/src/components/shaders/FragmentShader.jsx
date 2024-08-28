// Fragment Shader
const fragmentShader = `
  precision mediump float; // Set the precision for floating-point numbers to medium
  varying vec2 vUv; // Declare a varying variable to pass UV coordinates from the vertex shader
  uniform float uTime; // Declare a uniform variable to pass the time value from the JavaScript code

  void main() {
    // Calculate the color based on the sine of the time and UV coordinates
    vec3 color = vec3(0.5 + 0.5 * sin(uTime + vUv.x * 10.0), 0.5 + 0.5 * sin(uTime + vUv.y * 10.0), 1.0);
    gl_FragColor = vec4(color, 1.0); // Set the fragment color
  }
`;

export default fragmentShader; // Export the fragment shader as the default export
