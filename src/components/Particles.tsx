import { Points, PointMaterial } from "@react-three/drei";

function Particles({ position }) {
  return (
    <Points position={position}>
      <sphereGeometry args={[0.5, 10, 10]} />
      <PointMaterial transparent color="yellow" size={0.1} sizeAttenuation />
    </Points>
  );
}

export default Particles;
