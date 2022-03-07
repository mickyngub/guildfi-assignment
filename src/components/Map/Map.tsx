import styled from "styled-components/macro";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MapControls, OrbitControls, Stars } from "@react-three/drei";
import { Vector3 } from "three";

// const Box = (props: JSX.IntrinsicElements["mesh"]) => {
//   const mesh = useRef<THREE.Mesh>(null!);
//   const [hover, setHover] = useState<boolean>(false);
//   const [active, setActive] = useState<boolean>(false);
//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 2 : 1}
//       onClick={(ev) => setActive((prev) => !prev)}
//       onPointerOver={(ev) => setHover(true)}
//       onPointerOut={(ev) => setHover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hover ? "deeppink" : "orange"} />
//     </mesh>
//   );
// };

const OverlayPlane = ({
  map,
  renderOrder = 0,
  transparent = false,
  boxPosition = [0, 0, 0.2],
  ...props
}: any) => {
  const mesh = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame((state, delta) => {
    mesh.current.displacementScale = -0.5 * state.camera.position.z + 1;
    console.log("displacementScale ", mesh.current.displacementScale);
    console.log("zIndex ", state.camera.position.z);
  });

  return (
    <>
      <mesh position={boxPosition} renderOrder={renderOrder}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[0, 0, 0]} renderOrder={renderOrder}>
        <planeBufferGeometry args={[6.8, 6.8, 64, 64]} />
        <meshStandardMaterial
          map={map}
          ref={mesh}
          transparent={transparent}
          {...props}
        />
      </mesh>
    </>
  );
};

const CustomControls = ({ setDisplacementScale }: any) => {
  const { camera } = useThree();
  const controlsRef: any = useRef();
  let originalZ = 2.5;
  let zDifference;

  useFrame(() => {
    controlsRef.current.addEventListener("change", function (this: any) {
      if (this.target.y < -0.8) {
        this.target.y = -0.8;
        camera.position.y = -0.8;
      } else if (this.target.y > 0.8) {
        this.target.y = 0.8;
        camera.position.y = 0.8;
      } else if (this.target.x < -0.8) {
        zDifference = Math.abs(originalZ - camera.position.z);
        console.log("zDiff -", zDifference);
        this.target.x = -0.8;
        camera.position.x = -0.8;
      } else if (this.target.x > 0.8) {
        zDifference = Math.abs(originalZ - camera.position.z);
        console.log("zDiff +", zDifference);

        this.target.x = 0.8;
        camera.position.x = 0.8;
      }
    });
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate={false}
      enablePan={true}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      maxDistance={2.5}
    />
  );
};

const Map = () => {
  // let vector = new THREE.Vector3();
  // vector.x = 0;
  // vector.y = 1;
  // vector.z = 0;
  const [displacementScale, setDisplacementScale] = useState<Number>(0);

  const [
    terrain,
    terrainDepth,
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
    "terrain_z1.jpg",
    "depth_z1.jpg",
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
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 100,
          position: [0, 0, 2.5],
        }}
      >
        <primitive object={new THREE.AxesHelper(10)} />
        <pointLight intensity={3} position={[1, 1, 1]} color="#81a0e3" />
        <CustomControls />
        <OverlayPlane
          map={terrain}
          displacementMap={terrainDepth}
          displacementScale={displacementScale}
        />
        <OverlayPlane
          map={ionia}
          boxPosition={[1.75, 0.7, 0.1]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={demacia}
          boxPosition={[-1.4, 0.18, 0.05]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={bilgewater}
          boxPosition={[1.8, -0.6, 0.1]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={shadowIsles}
          boxPosition={[2.3, -1.3, 0.1]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={freljord}
          boxPosition={[-1.2, 0.9, 0.05]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={ixtal}
          boxPosition={[0.9, -1.1, 0.1]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={noxus}
          boxPosition={[-0.05, 0.4, 0.1]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={shurima}
          boxPosition={[0.2, -1.15, 0.1]}
          renderOrder={1}
          transparent={true}
        />
        <OverlayPlane
          map={targon}
          boxPosition={[-0.75, -1.25, 0.1]}
          renderOrder={1}
          transparent={true}
        />
      </Canvas>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  height: 100vh;
`;

export default Map;
