import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import Card from "./components/Card";

function App() {
  const [buildings, setBuildings] = useState([]);

  const [selectedType, setSelectedType] = useState(null);

  const addBuilding = (x, z) => {
    if (!["house", "shop", "factory"].includes(selectedType)) return;

    setBuildings((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: selectedType,
        x,
        z,
      },
    ]);
  };

  const handleCardSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{
          position: [0, 15, 15],
          fov: 50,
        }}
      >
        <Scene
          selectedType={selectedType}
          buildings={buildings}
          addBuilding={addBuilding}
        />
      </Canvas>

      <div className="fixed bottom-10 w-full flex gap-4 justify-center">
        <Card
          label="Road"
          onClick={() => handleCardSelect("road")}
          isSelected={selectedType === "road"}
        />
        <Card
          label="Water"
          onClick={() => handleCardSelect("water")}
          isSelected={selectedType === "water"}
        />
        <Card
          label="Green"
          onClick={() => handleCardSelect("green")}
          isSelected={selectedType === "green"}
        />

        <Card
          label="House"
          onClick={() => handleCardSelect("house")}
          isSelected={selectedType === "house"}
        />
        <Card
          label="Shop"
          onClick={() => handleCardSelect("shop")}
          isSelected={selectedType === "shop"}
        />
        <Card
          label="Factory"
          onClick={() => handleCardSelect("factory")}
          isSelected={selectedType === "factory"}
        />
      </div>
    </div>
  );
}

export default App;
