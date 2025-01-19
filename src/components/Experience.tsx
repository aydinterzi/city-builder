import { OrbitControls } from "@react-three/drei";
import Buildings from "./Buildings";
import City from "./City";

function Experience({ buildings }) {
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <City />
      <Buildings buildings={buildings} />
    </>
  );
}

export default Experience;
