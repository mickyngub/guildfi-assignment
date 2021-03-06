import Model3D from "./Model3D/Model3D";
import { useLoadOBJ } from "hooks";

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
        object={sunDisc}
        scale={0.04}
        rotation={[1.3, 0, 0]}
        position={[0.05, -1.28, 0.1]}
      />
      <Model3D
        object={ixaocan}
        scale={0.03}
        rotation={[1.6, 0, 0]}
        position={[1.05, -1.25, 0.1]}
      />
      <Model3D
        object={ixaocanOrbs}
        scale={0.03}
        rotation={[1.6, 0, 0]}
        position={[1.05, -1.25, 0.1]}
      />
      <Model3D
        object={theVoid}
        scale={0.06}
        rotation={[1.5, 0, 0]}
        position={[0.85, -1.69, 0.08]}
      />
      <Model3D
        object={mountTargon}
        scale={0.04}
        rotation={[1.5, -1.5, 0]}
        position={[-0.65, -1.32, -0.1]}
      />
      <Model3D
        object={demaciaLandmark}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[-1.5, 0.18, 0.05]}
      />
      <Model3D
        object={frostguard}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[-0.7, 1.4, 0.1]}
      />
      <Model3D
        object={immortalBastion}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[-0, 0.4, 0.1]}
      />
      <Model3D
        object={placidium}
        scale={0.04}
        rotation={[1.5, 0, 0]}
        position={[1.65, 0.8, 0.1]}
      />
    </>
  );
};

export default Model3Ds;
