import styled, { keyframes } from "styled-components/macro";
import { Html, useProgress } from "@react-three/drei";

const ProgressBar = () => {
  const { progress } = useProgress();
  console.log("progress is ", progress);
  return (
    <Html center>
      <Wrapper className="container">
        <Title>Loading...</Title>
        <ProgressContainer>
          <ProgressComplete style={{ width: `${progress}%` }}>
            <ProgressLiquid></ProgressLiquid>
          </ProgressComplete>
          <Progress>{progress}%</Progress>
        </ProgressContainer>
      </Wrapper>
    </Html>
  );
};

const gAnimation = keyframes`0% {
    background-color: #5225bd;
  }
  50% {
    background-color: #607e9e;
  }
  100% {
    background-color: #5225bd;
  }`;

const rAnimation = keyframes`
    from {
    transform: rotate(0deg);
  }
    from {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  width: 60vw;
  margin: 50px auto;
`;

const Title = styled.h3`
  text-align: center;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProgressComplete = styled.div`
  position: absolute;
  left: 0;
  top: 0px;
  height: 100%;
  background-color: #5225bd;
  border-radius: 10px;
  animation: ${gAnimation} 2500ms infinite ease-in-out;
  z-index: 2;
`;

const ProgressLiquid = styled.div`
  z-index: 1;
  width: 70px;
  height: 70px;
  animation: ${gAnimation} 2500ms infinite ease-in-out,
    ${rAnimation} 3000ms infinite cubic-bezier(0.5, 0.5, 0.5, 0.5);
  position: absolute;
  right: -5px;
  top: -10px;
  background-color: #5225bd;
  border-radius: 40%;
`;
const Progress = styled.div`
  z-index: 2;
`;

export default ProgressBar;
