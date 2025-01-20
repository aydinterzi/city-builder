import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import Card from "./components/Card";
import { Sky } from "@react-three/drei";

function App() {
  const [buildings, setBuildings] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const addBuilding = (x, z) => {
    setBuildings((prev) => {
      const existingBuilding = prev.find((b) => b.x === x && b.z === z);

      if (existingBuilding) {
        return prev.map((b) =>
          b.x === x && b.z === z ? { ...b, level: (b.level || 1) + 1 } : b
        );
      } else if (["house", "shop", "factory"].includes(selectedType)) {
        return [
          ...prev,
          {
            id: Date.now(),
            type: selectedType,
            x,
            z,
            level: 1,
          },
        ];
      }
      return prev;
    });
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
        <Sky />
        <Scene
          selectedType={selectedType}
          buildings={buildings}
          addBuilding={addBuilding}
        />
      </Canvas>

      <div className="fixed bottom-10 w-full flex gap-4 justify-center">
        {["Road", "Water", "Green", "House", "Shop", "Factory"].map((label) => (
          <Card
            key={label}
            label={label}
            onClick={() => handleCardSelect(label.toLowerCase())}
            isSelected={selectedType === label.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
