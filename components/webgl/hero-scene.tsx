"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { BlobMesh } from "@/components/webgl/blob-mesh";
import { ParticleField } from "@/components/webgl/particle-field";

export function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    };
  };

  return (
    <div className="absolute inset-0" onPointerMove={handlePointerMove}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 4]} intensity={1.1} />
        <directionalLight position={[-4, -2, -2]} intensity={0.3} color="#8b5cf6" />
        <BlobMesh mouse={mouse} />
        <ParticleField />
        <Environment preset="city" environmentIntensity={0.25} />
      </Canvas>
    </div>
  );
}
