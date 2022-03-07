import React from "react";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Box = (props: JSX.IntrinsicElements["mesh"]) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 3.5 : 2}
      onClick={(ev) => setActive((prev) => !prev)}
      onPointerOver={(ev) => setHover(true)}
      onPointerOut={(ev) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? "deeppink" : "orange"} />
    </mesh>
  );
};

const Map = () => {
  return (
    <Canvas>
      {React.createElement("ambientLight")};
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 1, 1]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default Map;
