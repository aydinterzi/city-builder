import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Buildings from "./Buildings";
import Particles from "./Particles";

function Scene({ selectedType, buildings, addBuilding }) {
  const { camera, scene } = useThree();
  const GRID_SIZE = 20;

  const [cells, setCells] = useState(() =>
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
  );

  const [particleEffects, setParticleEffects] = useState([]);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handlePointerDown = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);

    const planeMesh = scene.getObjectByName("CityGridPlane");
    if (!planeMesh) return;

    const intersects = raycaster.current.intersectObject(planeMesh);
    if (intersects.length > 0) {
      const point = intersects[0].point;

      const gridX = Math.floor(point.x + GRID_SIZE / 2);
      const gridZ = Math.floor(point.z + GRID_SIZE / 2);

      if (gridX >= 0 && gridX < GRID_SIZE && gridZ >= 0 && gridZ < GRID_SIZE) {
        if (["road", "water", "green"].includes(selectedType)) {
          setCells((prev) => {
            const newCells = prev.map((row) => [...row]);
            newCells[gridZ][gridX] = selectedType;
            return newCells;
          });
        } else if (["house", "shop", "factory"].includes(selectedType)) {
          addBuilding(gridX, gridZ);

          setParticleEffects((prev) => [
            ...prev,
            {
              id: Date.now(),
              position: [gridX - 10 + 0.5, 1, gridZ - 10 + 0.5],
            },
          ]);
          setTimeout(() => {
            setParticleEffects((prev) => prev.slice(1));
          }, 1000);
        }
      }
    }
  };

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 15, 5]} intensity={1} />

      <mesh
        name="CityGridPlane"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
      >
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      {cells.map((row, rowIndex) =>
        row.map((cellType, colIndex) => {
          if (!cellType) return null;
          return (
            <CellTile
              key={`cell-${rowIndex}-${colIndex}`}
              cellType={cellType}
              x={colIndex}
              z={rowIndex}
            />
          );
        })
      )}

      <Buildings buildings={buildings} />
      {particleEffects.map((effect) => (
        <Particles key={effect.id} position={effect.position} />
      ))}
    </>
  );
}

export default Scene;

function CellTile({ cellType, x, z }) {
  const worldX = x - 10 + 0.5;
  const worldZ = z - 10 + 0.5;

  let color;
  switch (cellType) {
    case "road":
      color = "gray";
      break;
    case "water":
      color = "blue";
      break;
    case "green":
      color = "green";
      break;
    default:
      color = "white";
  }

  return (
    <mesh position={[worldX, 0.001, worldZ]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}
