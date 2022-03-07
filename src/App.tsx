import styled from "styled-components/macro";
import Navbar from "components/Navbar";
import Map from "components/Map";

const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Map />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  background: var(--color-primary);
  padding: 40px;
`;
export default App;
