import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Card from "./components/Card";
import { Physics } from "@react-three/rapier";

function App() {
  const [buildings, setBuildings] = useState([]);

  const addBuilding = (type: string) => {
    setBuildings((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        position: [0, 5, 0],
      },
    ]);
  };

  return (
    <>
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 200, position: [-10, 10, 30] }}
      >
        <Suspense>
          <Physics gravity={[0, -9.81, 0]}>
            <Experience buildings={buildings} />
          </Physics>
        </Suspense>
      </Canvas>

      <div className="fixed bottom-10 flex gap-4 w-full">
        <div className="flex justify-center items-center gap-4 w-full">
          <Card label="House" onClick={() => addBuilding("house")} />
          <Card label="Shop" onClick={() => addBuilding("shop")} />
          <Card label="Factory" onClick={() => addBuilding("factory")} />
        </div>
      </div>
    </>
  );
}

export default App;
