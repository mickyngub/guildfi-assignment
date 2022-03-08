import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";

const useLoadTexture = () => {
  const [
    terrain,
    terrainDepth,
    ionia,
    demacia,
    bilgewater,
    shadowIsles,
    freljord,
    ixtal,
    noxus,
    shurima,
    targon,
    iconBilgewater,
    iconDemacia,
    iconFreljord,
    iconIonia,
    iconIxtal,
    iconNoxus,
    iconPiltoverZaun,
    iconShadowIsles,
    iconShurima,
    iconTargon,
    clouds,
  ] = useLoader(TextureLoader, [
    "terrain_z1.jpg",
    "depth_z1.jpg",
    "overlay_ionia.png",
    "overlay_demacia.png",
    "overlay_bilgewater.png",
    "overlay_shadow_isles.png",
    "overlay_freljord.png",
    "overlay_ixtal.png",
    "overlay_noxus.png",
    "overlay_shurima.png",
    "overlay_targon.png",
    "icon_bilgewater.png",
    "icon_demacia.png",
    "icon_freljord.png",
    "icon_ionia.png",
    "icon_ixtal.png",
    "icon_noxus.png",
    "icon_piltover-zaun.png",
    "icon_shadow-isles.png",
    "icon_shurima.png",
    "icon_targon.png",
    "clouds.jpg",
  ]);

  return {
    terrain,
    terrainDepth,
    ionia,
    demacia,
    bilgewater,
    shadowIsles,
    freljord,
    ixtal,
    noxus,
    shurima,
    targon,
    iconBilgewater,
    iconDemacia,
    iconFreljord,
    iconIonia,
    iconIxtal,
    iconNoxus,
    iconPiltoverZaun,
    iconShadowIsles,
    iconShurima,
    iconTargon,
    clouds,
  };
};

export default useLoadTexture;
