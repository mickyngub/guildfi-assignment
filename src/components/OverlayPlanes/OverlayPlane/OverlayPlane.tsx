import { useRef } from "react";

const OverlayPlane = ({
  map,
  renderOrder = 0,
  transparent = false,
  boxPosition = [0, 0, 0.2],
  icon,
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
