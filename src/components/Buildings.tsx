import { TransformControls } from "@react-three/drei";
import { useRef } from "react";

/**
 * Bu bileşen, buildings dizisindeki her yapıyı sahnede gösterir.
 * Her yapı kendi TransformControls'u ile hareket ettirilebilir.
 */
function Buildings({ buildings }) {
  return (
    <>
      {buildings.map((building) => {
        return (
          <SingleBuilding
            key={building.id}
            id={building.id}
            type={building.type}
            initialPosition={building.position}
          />
        );
      })}
    </>
  );
}

function SingleBuilding({ id, type, initialPosition }) {
  const transformRef = useRef(null);
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
    <TransformControls ref={transformRef} mode="translate">
      <mesh ref={meshRef} position={initialPosition}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </TransformControls>
  );
}

export default Buildings;
