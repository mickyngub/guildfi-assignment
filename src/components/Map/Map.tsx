import styled from "styled-components/macro";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";

import ProgressBar from "components/ProgressBar/ProgressBar";
import OverlayPlanes from "components/OverlayPlanes";
import MapPlane from "components/MapPlane";
import Model3Ds from "components/Model3Ds";
import CustomControls from "components/CustomControls";

const Map = () => {
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
          <MapPlane />
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
