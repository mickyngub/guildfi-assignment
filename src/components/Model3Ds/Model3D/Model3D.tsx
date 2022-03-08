const Model3D = ({ ...props }: JSX.IntrinsicElements["primitive"]) => {
  return <primitive {...props} renderOrder={100} />;
};

export default Model3D;
