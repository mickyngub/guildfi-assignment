const Model3D = ({ obj, rotation, position, scale }: any) => {
  return (
    <primitive
      object={obj}
      scale={scale}
      rotation={rotation}
      position={position}
      renderOrder={100}
    />
  );
};

export default Model3D;
