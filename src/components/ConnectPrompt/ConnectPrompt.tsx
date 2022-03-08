import React from "react";
import styled from "styled-components/macro";
import { metamask } from "assets";
const ConnectPrompt = () => {
  return (
    <Wrapper>
      <Title>Please connect to Metamask</Title>
      <Img src={metamask} alt="metamask" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 350px;
  height: 150px;
  margin: auto;
`;

const Title = styled.h1`
  display: inline;
  text-align: center;
  color: var(--color-white);
`;

const Img = styled.img`
  display: inline-block;
  margin-inline: 1rem;
  width: 45px;
`;

export default ConnectPrompt;
