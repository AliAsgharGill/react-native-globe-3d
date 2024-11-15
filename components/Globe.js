import React, { useRef, useEffect } from "react";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";

const Globe = () => {
  const glRef = useRef();

  const onContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setPixelRatio(gl.drawingBufferWidth / gl.drawingBufferHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Add ambient light
    scene.add(ambientLight);

    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    // const geometry = new THREE.SphereGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2155ce,
    });

    const sphere = new THREE.Mesh(geometry, material);
    // sphere.position.z = -2;
    // sphere.position.y = 2;
    sphere.position.x = 1;
    scene.add(sphere);

    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(cube);

    const render = () => {
      requestAnimationFrame(render);
      sphere.rotation.y += 0.01; // Adjust rotation speed if desired
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