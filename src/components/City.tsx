import { RigidBody } from "@react-three/rapier";

function City() {
  return (
    <RigidBody position={[0, 0, 0]} type="fixed">
      <mesh>
        <meshStandardMaterial color="lightblue" />
        <boxGeometry args={[10, 1, 10]} />
      </mesh>
    </RigidBody>
  );
}

export default City;
