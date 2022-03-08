import styled from "styled-components/macro";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ReactHowler from "react-howler";
import ProgressBar from "components/ProgressBar/ProgressBar";
import OverlayPlanes from "components/OverlayPlanes";
import MapPlane from "components/MapPlane";
import Model3Ds from "components/Model3Ds";
import CustomControls from "components/CustomControls";

const Map = () => {
  return (
    <MapWrapper>
      <ReactHowler
        src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/universe-map/en_US/58c9aeb77ffc8ea44a3d723fd2e0ccc964f3444b/assets/assets/audio/sfx-ui-click-firstclick-01.mp3"
        playing={true}
      />
      <ReactHowler
        src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/universe-map/en_US/58c9aeb77ffc8ea44a3d723fd2e0ccc964f3444b/assets/assets/audio/sfx-trans-intro-01.mp3"
        playing={true}
      />
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
