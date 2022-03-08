import { useRef } from "react";
import { useLoadTexture } from "hooks";
import { useFrame } from "@react-three/fiber";

const MapPlane = () => {
  const currentMesh = useRef<THREE.MeshStandardMaterial>(null!);
  const { terrain, terrainDepth } = useLoadTexture();
  useFrame((state) => {
    currentMesh.current.displacementScale = -0.5 * state.camera.position.z + 1;
  });

  return (
    <mesh position={[0, 0, 0.001]}>
      <planeBufferGeometry args={[6.8, 6.8, 64, 64]} />
      <meshStandardMaterial
        ref={currentMesh}
        map={terrain}
        displacementMap={terrainDepth}
      />
    </mesh>
  );
};

export default MapPlane;
