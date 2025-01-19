import { TransformControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

function Buildings({ buildings }) {
  return (
    <>
      {buildings.map((building) => (
        <SingleBuilding
          key={building.id}
          id={building.id}
          type={building.type}
          initialPosition={building.position}
        />
      ))}
    </>
  );
}

function SingleBuilding({ id, type, initialPosition }) {
  const meshRef = useRef(null);

  let color;
  switch (type) {
    case "house":
      color = "lightblue";
      break;
    case "shop":
      color = "pink";
      break;
    case "factory":
      color = "gray";
      break;
    default:
      color = "white";
  }

  return (
    <TransformControls>
      <RigidBody
        position={[0, 3, 0]}
        colliders="cuboid"
        restitution={0.2}
        friction={0.7}
        type="dynamic"
      >
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </RigidBody>
    </TransformControls>
  );
}

export default Buildings;
