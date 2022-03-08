import React from "react";
import OverlayPlane from "./OverlayPlane/OverlayPlane";
import { useLoadTexture } from "hooks";

const OverlayPlanes = () => {
  const {
    ionia,
    demacia,
    bilgewater,
    freljord,
    ixtal,
    noxus,
    shadowIsles,
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
  } = useLoadTexture();
  return (
    <>
      <OverlayPlane
        map={ionia}
        icon={iconIonia}
        boxPosition={[1.75, 0.7, 0.1]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={demacia}
        icon={iconDemacia}
        boxPosition={[-1.4, 0.18, 0.05]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={bilgewater}
        icon={iconBilgewater}
        boxPosition={[1.8, -0.6, 0.1]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={shadowIsles}
        icon={iconShadowIsles}
        boxPosition={[2.3, -1.3, 0.1]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={freljord}
        icon={iconFreljord}
        boxPosition={[-1.2, 0.9, 0.05]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={ixtal}
        icon={iconIxtal}
        boxPosition={[0.9, -1.1, 0.1]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={noxus}
        icon={iconNoxus}
        boxPosition={[-0, 0.55, 0.1]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={shurima}
        icon={iconShurima}
        boxPosition={[0.2, -1.15, 0.1]}
        renderOrder={1}
        transparent={true}
      />
      <OverlayPlane
        map={targon}
        icon={iconTargon}
        boxPosition={[-0.75, -1.25, 0.1]}
        renderOrder={1}
        transparent={true}
      />
    </>
  );
};

export default OverlayPlanes;
