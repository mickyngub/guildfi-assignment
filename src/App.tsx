import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components/macro";
import Navbar from "components/Navbar";
import Map from "components/Map";
import ConnectPrompt from "components/ConnectPrompt";
import { loadingBackground } from "assets";

const App = () => {
  const [address, setAddress] = useState<string>("");
  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      let signerAddress = await signer.getAddress();
      setAddress(signerAddress);
    })();
  }, []);
  return (
    <Wrapper>
      <Navbar />
      {address ? <Map /> : <ConnectPrompt />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  background: url(${loadingBackground});
  background-repeat: no-repeat;
  background-size: cover;
`;
export default App;
