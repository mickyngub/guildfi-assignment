import { Suspense } from "react";
import styled from "styled-components/macro";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { useLoadOBJ, useLoadTexture } from "hooks";

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

const MapPlane = ({ map, ...props }: any) => {
  const mesh = useRef<THREE.MeshStandardMaterial>(null!);
  const { terrain, terrainDepth } = useLoadTexture();
  useFrame((state, delta) => {
    mesh.current.displacementScale = -0.5 * state.camera.position.z + 1;
    // console.log("displacementScale ", mesh.current.displacementScale);
    // console.log("zIndex ", state.camera.position.z);
  });

  return (
    <mesh position={[0, 0, 0.001]}>
      <planeBufferGeometry args={[6.8, 6.8, 64, 64]} />
      <meshStandardMaterial
        ref={mesh}
        map={terrain}
        displacementMap={terrainDepth}
        {...props}
      />
    </mesh>
  );
};

const Model3Ds = () => {
  const {
    sunDisc,
    mountTargon,
    demaciaLandmark,
    placidium,
    theVoid,
    ixaocan,
    ixaocanOrbs,
    ixaocanGround,
    immortalBastion,
  } = useLoadOBJ();
  return (
    <Model3D
      obj={sunDisc}
      scale={0.04}
      rotation={[1.3, 0, 0]}
      position={[0.05, -1.28, 0.1]}
    />
  );
};

const Model3D = ({ obj, rotation, position, scale }: any) => {
  return (
    <primitive
      object={obj}
      scale={scale}
      rotation={rotation}
      position={position}
    />
  );
};

const OverlayPlanes = () => {
  const {
    ionia,
    demacia,
    bilgewater,
    freljord,
    ixtal,
    noxus,
    shadowIsles,
    shurima,
    targon,
  } = useLoadTexture();
  return (
    <>
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
    </>
  );
};

const OverlayPlane = ({
  map,
  renderOrder = 0,
  transparent = false,
  boxPosition = [0, 0, 0.2],
  ...props
}: any) => {
  const currentRef = useRef<THREE.Mesh>(null!);
  return (
    <>
      <mesh
        position={boxPosition}
        onPointerEnter={() => {
          currentRef.current.position.z = 0.0001;
        }}
        onPointerLeave={() => {
          currentRef.current.position.z = -0.1;
        }}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh ref={currentRef} position={[0, 0, -0.1]} renderOrder={renderOrder}>
        <planeBufferGeometry args={[6.8, 6.8, 64, 64]} />
        <meshStandardMaterial map={map} transparent={transparent} {...props} />
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
      if (this.target.y < -1.5) {
        this.target.y = -1.5;
        camera.position.y = -1.5;
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
      } else if (this.target.z < 2.5) {
        zDifference = Math.abs(originalZ - camera.position.z);
        camera.rotation.set(zDifference * 0.5, 0, 0);
        // camera.updateProjectionMatrix();
      }
    });
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate={false}
      enablePan={true}
      enableDamping={true}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      maxPolarAngle={Math.PI / 2}
      maxAzimuthAngle={Math.PI / 2}
      maxDistance={2.5}
      minDistance={1}
      onChange={(event) => {
        console.log("controlref");
      }}
    />
  );
};

const Map = () => {
  // let vector = new THREE.Vector3();
  // vector.x = 0;
  // vector.y = 1;
  // vector.z = 0;
  const [displacementScale, setDisplacementScale] = useState<Number>(0);

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
        <Suspense fallback={<ProgressBar />}>
          <pointLight intensity={3} position={[0, 0, 1]} color="#81a0e3" />
          <CustomControls />
          <MapPlane displacementScale={displacementScale} />
          <OverlayPlanes />
          <Model3Ds />
        </Suspense>
      </Canvas>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  height: 100vh;
`;

export default Map;
