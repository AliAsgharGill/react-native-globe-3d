import React, { useRef, useEffect } from "react";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";

const Globe: React.FC = (): JSX.Element => {
  const glRef = useRef<GLView | null>(null);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setPixelRatio(gl.drawingBufferWidth / gl.drawingBufferHeight);

    const scene = new THREE.Scene();
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 3; // keeping it far for now

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Add ambient light
    scene.add(ambientLight);

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      require("../assets/images/earth.png"),
      (texture) => {
        console.log("Texture loaded successfully!");
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );

    // Create a sphere for Earth
    const geometry = new THREE.SphereGeometry(1, 32, 32); // Using SphereGeometry for Earth
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture, // Apply the Earth texture
    });

    const earthSphere = new THREE.Mesh(geometry, material);
    earthSphere.position.set(0, 0, 0); // Center the sphere
    scene.add(earthSphere);

    const render = () => {
      requestAnimationFrame(render);

      // Auto-rotate the Earth
      earthSphere.rotation.y += 0.01; // Adjust rotation speed if needed

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <GLView
      style={{ width: "100%", height: "100%" }}
      onContextCreate={onContextCreate}
      ref={glRef}
    />
  );
};

export default Globe;
