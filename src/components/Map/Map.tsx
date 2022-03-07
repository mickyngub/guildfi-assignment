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
  ...props
}: any) => {
  const mesh = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame((state, delta) => {
    // let num = (mesh.current.displacementScale += 0.001);
    // console.log(num);
  });

  return (
    <mesh position={[0, 0, 0]} renderOrder={renderOrder}>
      <planeBufferGeometry args={[6.8, 6.8, 64, 64]} />
      <meshStandardMaterial
        map={map}
        ref={mesh}
        transparent={transparent}
        {...props}
      />
    </mesh>
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
      onChange={(e) => {
        console.log(e?.target.object.position.z);

        // setDisplacementScale(e?.target.object.position.z - 2);
      }}
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
        {/* <ambientLight intensity={1} /> */}
        {/* <OrbitControls /> */}
        <CustomControls />
        {/* <MapControls
          enableRotate={false}
          enablePan={true}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
          }}
          maxDistance={4}
        /> */}
        <OverlayPlane
          map={terrain}
          displacementMap={terrainDepth}
          displacementScale={displacementScale}
        />
        <OverlayPlane map={ionia} renderOrder={1} transparent={true} />
        <OverlayPlane map={demacia} renderOrder={1} transparent={true} />
        <OverlayPlane map={bilgewater} renderOrder={1} transparent={true} />
        <OverlayPlane map={shadowIsles} renderOrder={1} transparent={true} />
        <OverlayPlane map={freljord} renderOrder={1} transparent={true} />
        <OverlayPlane map={ixtal} renderOrder={1} transparent={true} />
        <OverlayPlane map={noxus} renderOrder={1} transparent={true} />
        <OverlayPlane map={shurima} renderOrder={1} transparent={true} />
        <OverlayPlane map={targon} renderOrder={1} transparent={true} />
      </Canvas>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  height: 100vh;
`;

export default Map;
