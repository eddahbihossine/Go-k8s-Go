import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GradientBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Create a plane geometry that covers the screen
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Shader material to create a gradient with more black than gold
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                goldColor: { value: new THREE.Color('#FFD700') },
                blackColor: { value: new THREE.Color('#000000') },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
            uniform float time;
        uniform vec3 goldColor;
        uniform vec3 blackColor;
        varying vec2 vUv;

        void main() {
        // Adjust the gradient with more black dominance
        float gradient = vUv.y + 0.05 * sin(time);
        gradient = clamp(gradient, 0.0, 1.0);
        
        float blackWeight = 0.19 -  (gradient * 0.1); // Increase black dominance
        vec3 color = mix(blackColor, goldColor, blackWeight);
        
        gl_FragColor = vec4(color, 1.0);
        }

      `,
            depthWrite: false,
            depthTest: false,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Move the camera back so the plane is visible
        camera.position.z = 1;

        // Animation loop
        const animate = () => {
            material.uniforms.time.value += 0.05; // Adjust speed of the animation
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default GradientBackground;
