import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

const useLoadOBJ = () => {
  const [
    sunDisc,
    mountTargon,
    demaciaLandmark,
    placidium,
    theVoid,
    ixaocan,
    ixaocanOrbs,
    ixaocanGround,
    immortalBastion,
  ] = useLoader(OBJLoader, [
    "sun-disc.obj",
    "mount-targon.obj",
    "demacia-city-landmark.obj",
    "placidium.obj",
    "the-void.obj",
    "ixaocan.obj",
    "ixaocan_orbs.obj",
    "ixaocan_ground.obj",
    "immortal-bastion.obj",
  ]);
  return {
    sunDisc,
    mountTargon,
    demaciaLandmark,
    placidium,
    theVoid,
    ixaocan,
    ixaocanOrbs,
    ixaocanGround,
    immortalBastion,
  };
};

export default useLoadOBJ;
