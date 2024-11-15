import React, { useRef, useEffect } from "react";
import { GLView, ExpoWebGLRenderingContext, GLViewProps } from "expo-gl";
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

    // const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2155ce,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0); // Center the sphere
    scene.add(sphere);

    const render = () => {
      requestAnimationFrame(render);
      sphere.rotation.y += 0.05; // Adjust rotation speed if desired
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
