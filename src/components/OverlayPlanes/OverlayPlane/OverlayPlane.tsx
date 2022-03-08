import { Html } from "@react-three/drei";
import { useState, useRef } from "react";
import ReactHowler from "react-howler";

const OverlayPlane = ({
  map,
  renderOrder = 0,
  transparent = false,
  boxPosition = [0, 0, 0.2],
  icon,
  ...props
}: any) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const currentRef = useRef<THREE.Mesh>(null!);
  return (
    <>
      <Html>
        <ReactHowler
          src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/universe-map/en_US/58c9aeb77ffc8ea44a3d723fd2e0ccc964f3444b/assets/assets/audio/sfx-ui-hover-regions-01.mp3"
          playing={isHover}
        />
      </Html>
      <mesh
        position={boxPosition}
        onPointerEnter={() => {
          currentRef.current.position.z = 0.0001;
          setIsHover(true);
        }}
        onPointerLeave={() => {
          currentRef.current.position.z = -0.1;
          setIsHover(false);
        }}
      >
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial map={icon} />
      </mesh>
      <mesh ref={currentRef} position={[0, 0, -0.1]} renderOrder={renderOrder}>
        <planeBufferGeometry args={[6.8, 6.8, 64, 64]} />
        <meshStandardMaterial map={map} transparent={transparent} {...props} />
      </mesh>
    </>
  );
};

export default OverlayPlane;
