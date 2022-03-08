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
      // console.log("provider", provider.getSigner());
      // console.log("signer is", await signer.getAddress());
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
  /* background: var(--color-primary); */
  background: url(${loadingBackground});
  background-repeat: no-repeat;
  background-size: cover;

  /* padding: 40px; */
`;
export default App;
