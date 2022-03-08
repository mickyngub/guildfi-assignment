import { Suspense, useEffect } from "react";
import styled from "styled-components/macro";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { useLoadOBJ, useLoadTexture } from "hooks";
import OverlayPlanes from "components/OverlayPlanes";

const MapPlane = ({ map, ...props }: any) => {
  const mesh = useRef<THREE.MeshStandardMaterial>(null!);
  const { terrain, terrainDepth } = useLoadTexture();
  useFrame((state) => {
    mesh.current.displacementScale = -0.5 * state.camera.position.z + 1;
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
    frostguard,
  } = useLoadOBJ();
  return (
    <>
      <Model3D
        obj={sunDisc}
        scale={0.04}
        rotation={[1.3, 0, 0]}
        position={[0.05, -1.28, 0.1]}
      />
      <Model3D
        obj={ixaocan}
        scale={0.03}
        rotation={[1.6, 0, 0]}
        position={[1.05, -1.25, 0.1]}
      />
      <Model3D
        obj={ixaocanOrbs}
        scale={0.03}
        rotation={[1.6, 0, 0]}
        position={[1.05, -1.25, 0.1]}
      />
      <Model3D
        obj={theVoid}
        scale={0.06}
        rotation={[1.5, 0, 0]}
        position={[0.85, -1.69, 0.08]}
      />
      <Model3D
        obj={mountTargon}
        scale={0.04}
        rotation={[1.5, -1.5, 0]}
        position={[-0.65, -1.32, -0.1]}
      />
      <Model3D
        obj={demaciaLandmark}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[-1.5, 0.18, 0.05]}
      />
      <Model3D
        obj={frostguard}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[-0.7, 1.4, 0.1]}
      />
      <Model3D
        obj={immortalBastion}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[-0, 0.4, 0.1]}
      />
      <Model3D
        obj={placidium}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[1.65, 0.8, 0.1]}
      />
    </>
  );
};

const Model3D = ({ obj, rotation, position, scale }: any) => {
  return (
    <primitive
      object={obj}
      scale={scale}
      rotation={rotation}
      position={position}
      renderOrder={100}
    />
  );
};

const CustomControls = ({ setDisplacementScale }: any) => {
  const { camera } = useThree();
  const controlsRef: any = useRef();
  let originalZ = 2.5;
  let zDifference;

  useEffect(() => {
    console.log("attached useEffect");
    controlsRef.current.addEventListener("change", function (this: any) {
      if (this.target.y < -1.8) {
        this.target.y = -1.8;
        camera.position.y = -1.8;
      } else if (this.target.y > 0.8) {
        this.target.y = 0.8;
        camera.position.y = 0.8;
      } else if (this.target.x < -0.8) {
        this.target.x = -0.8;
        camera.position.x = -0.8;
      } else if (this.target.x > 0.8) {
        this.target.x = 0.8;
        camera.position.x = 0.8;
      }
    });
  }, []);

  useFrame(() => {
    controlsRef.current.addEventListener("change", function (this: any) {
      if (this.target.z < 2.5) {
        zDifference = Math.abs(originalZ - camera.position.z);
        camera.rotation.set(zDifference * 0.5, 0, 0);
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
      maxPolarAngle={Math.PI / 2}
      maxAzimuthAngle={Math.PI / 2}
      maxDistance={2.5}
      minDistance={1}
    />
  );
};

const Map = () => {
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
          <pointLight intensity={3.5} position={[0, 0, 1]} color="#70839b" />
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
