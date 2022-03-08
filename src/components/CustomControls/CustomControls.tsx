import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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
export default CustomControls;
