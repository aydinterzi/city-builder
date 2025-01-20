import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

function Buildings({ buildings }) {
  return (
    <>
      {buildings.map((b) => (
        <Building key={b.id} building={b} />
      ))}
    </>
  );
}

function Building({ building }) {
  const { type, level, x, z } = building;
  const meshRef = useRef(null);

  useEffect(() => {
    gsap.from(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  const scale = 1 + (level - 1) * 0.2;

  return (
    <mesh
      ref={meshRef}
      position={[x - 10 + 0.5, 0.5 * scale, z - 10 + 0.5]}
      scale={[scale, scale, scale]}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color={
          type === "house" ? "lightblue" : type === "shop" ? "pink" : "gray"
        }
      />
    </mesh>
  );
}

export default Buildings;
