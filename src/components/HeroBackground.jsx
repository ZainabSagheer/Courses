"use client";

import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function StylizedLaptop() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Smooth floating and breathing animation
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.2, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 3) / 10 - 0.2, 0.1);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t) * 0.2, 0.1);
    }
  });

  return (
    <group ref={group} position={[4, 0, -2]} scale={1.2}>
      {/* Laptop Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4, 0.15, 3]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Keyboard Area */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[3.5, 0.16, 1.6]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0, 1.0]}>
        <boxGeometry args={[1.2, 0.16, 0.6]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* Laptop Screen Lid */}
      <group position={[0, 0, -1.4]} rotation={[-0.2, 0, 0]}>
        {/* Screen Back */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[4, 2.8, 0.1]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.1} metalness={0.9} />
        </mesh>
        
        {/* Screen Display */}
        <mesh position={[0, 1.4, 0.055]}>
          <planeGeometry args={[3.8, 2.6]} />
          {/* Glowing screen effect */}
          <meshBasicMaterial color="#e0f2fe" toneMapped={false} />
          
          <Html 
            transform 
            position={[0, 0, 0.01]} 
            distanceFactor={1.5}
          >
            <div className="flex flex-col items-center justify-center w-[300px] h-[200px] pointer-events-none select-none">
              <h1 className="text-4xl font-black tracking-tighter text-blue-600 drop-shadow-md m-0 leading-none">
                BITSOL
              </h1>
              <h2 className="text-xl font-bold tracking-[0.3em] text-slate-800 m-0 mt-1">
                MARKETING
              </h2>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}

function FloatingShapes() {
  return (
    <group>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#e0f2fe" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <StylizedLaptop />
      </Float>
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-background overflow-hidden flex items-center justify-center">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-[128px] opacity-50 dark:opacity-100 dark:mix-blend-screen"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-purple-500/30 rounded-full filter blur-[128px] opacity-50 dark:opacity-100 dark:mix-blend-screen"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full filter blur-[100px] opacity-50 dark:opacity-100 dark:mix-blend-screen"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 3D Elements Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <FloatingShapes />
        </Canvas>
      </div>
    </div>
  );
}
