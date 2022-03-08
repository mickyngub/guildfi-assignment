import { Suspense, useEffect } from "react";
import styled from "styled-components/macro";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { useLoadOBJ, useLoadTexture } from "hooks";
import OverlayPlanes from "components/OverlayPlanes";
import MapPlane from "components/MapPlane";
import Model3Ds from "components/Model3Ds";

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
