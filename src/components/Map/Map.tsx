import styled from "styled-components/macro";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, Stars } from "@react-three/drei";

const Box = (props: JSX.IntrinsicElements["mesh"]) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1}
      onClick={(ev) => setActive((prev) => !prev)}
      onPointerOver={(ev) => setHover(true)}
      onPointerOut={(ev) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? "deeppink" : "orange"} />
    </mesh>
  );
};

const OverlayPlane = ({ map }: any) => {
  // const mesh = useRef<THREE.Mesh>(null!);

  return (
    <mesh position={[0, 0, 0]} renderOrder={0}>
      <planeBufferGeometry args={[5, 5, 64, 64]} />
      <meshStandardMaterial map={map} transparent={true} />
    </mesh>
  );
};

const Map = () => {
  const [
    ionia,
    demacia,
    bilgewater,
    shadowIsles,
    freljord,
    ixtal,
    noxus,
    shurima,
    targon,
  ] = useLoader(TextureLoader, [
    "overlay_ionia.png",
    "overlay_demacia.png",
    "overlay_bilgewater.png",
    "overlay_shadow_isles.png",
    "overlay_freljord.png",
    "overlay_ixtal.png",
    "overlay_noxus.png",
    "overlay_shurima.png",
    "overlay_targon.png",
  ]);
  return (
    <MapWrapper>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <OrbitControls />
        <Stars />
        <OverlayPlane map={ionia} />
        <OverlayPlane map={demacia} />
        <OverlayPlane map={bilgewater} />
        <OverlayPlane map={shadowIsles} />
        <OverlayPlane map={freljord} />
        <OverlayPlane map={ixtal} />
        <OverlayPlane map={noxus} />
        <OverlayPlane map={shurima} />
        <OverlayPlane map={targon} />
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <Box position={[-1.2, 1, 1]} />
        <Box position={[1.2, 0, 0]} /> */}
      </Canvas>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  height: 100vh;
`;

export default Map;
