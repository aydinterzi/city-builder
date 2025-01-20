import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Buildings({ buildings }) {
  return (
    <>
      {buildings.map((b) => {
        return <BuildingMesh key={b.id} type={b.type} x={b.x} z={b.z} />;
      })}
    </>
  );
}

function BuildingMesh({ type, x, z }) {
  const worldX = x - 10 + 0.5;
  const worldZ = z - 10 + 0.5;

  if (type === "house") {
    return <House position={[worldX, 0, worldZ]} />;
  } else if (type === "shop") {
    return <Shop position={[worldX, 0, worldZ]} />;
  } else if (type === "factory") {
    return <Factory position={[worldX, 0, worldZ]} />;
  }
  return null;
}

function House({ position }) {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap, metalMap] =
    useLoader(THREE.TextureLoader, [
      "/red_brick_1k/red_brick_diff_1k.jpg",
      "/red_brick_1k/red_brick_disp_1k.jpg",
      "/red_brick_1k/red_brick_nor_gl_1k.jpg",
      "/red_brick_1k/red_brick_arm_1k.jpg",
      "/red_brick_1k/red_brick_arm_1k.jpg",
      "/red_brick_1k/red_brick_arm_1k.jpg",
    ]);

  const [
    roofColorMap,
    roofNormalMap,
    roofRoughnessMap,
    roofAoMap,
    roofMetalMap,
  ] = useLoader(THREE.TextureLoader, [
    "/roof_slates_02_1k/roof_slates_02_diff_1k.webp",
    "/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp",
    "/roof_slates_02_1k/roof_slates_02_arm_1k.webp",
    "/roof_slates_02_1k/roof_slates_02_arm_1k.webp",
    "/roof_slates_02_1k/roof_slates_02_arm_1k.webp",
  ]);

  const boxRef = useRef(null);
  const coneRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      const geometry = boxRef.current.geometry;
      geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(geometry.attributes.uv.array.slice(), 2)
      );
    }
    if (coneRef.current) {
      const geometry = coneRef.current.geometry;
      geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(geometry.attributes.uv.array.slice(), 2)
      );
    }
  }, []);

  return (
    <group position={position}>
      <mesh ref={boxRef} position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          displacementScale={0.01}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          metalnessMap={metalMap}
        />
      </mesh>

      <mesh ref={coneRef} position={[0, 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.4, 0.4, 4, 1]} />
        <meshStandardMaterial
          map={roofColorMap}
          normalMap={roofNormalMap}
          roughnessMap={roofRoughnessMap}
          aoMap={roofAoMap}
          metalnessMap={roofMetalMap}
        />
      </mesh>
    </group>
  );
}

function Shop({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.6]} />
        <meshStandardMaterial color={"pink"} />
      </mesh>

      <mesh position={[0, 0.6, 0.3]}>
        <planeGeometry args={[0.4, 0.2]} />
        <meshStandardMaterial color={"yellow"} />
      </mesh>
    </group>
  );
}

function Factory({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>

      <mesh position={[0.3, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
        <meshStandardMaterial color={"darkgray"} />
      </mesh>
    </group>
  );
}

export default Buildings;
