import { OrbitControls } from "@react-three/drei";

function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
    </>
  );
}

export default Experience;
