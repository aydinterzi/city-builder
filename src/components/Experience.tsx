import { OrbitControls } from "@react-three/drei";
import Buildings from "./Buildings";

function Experience({ buildings }) {
  return (
    <>
      {/* Kamerayı hareket ettirmek için */}
      <OrbitControls makeDefault />

      {/* Işıklar */}
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* 
        Buildings bileşenine buildings prop'unu veriyoruz.
        İçinde map'leyerek 3D objeler oluşturacak.
      */}
      <Buildings buildings={buildings} />
    </>
  );
}

export default Experience;
