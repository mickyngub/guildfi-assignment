import styled from "styled-components/macro";
import Navbar from "components/Navbar";

const App = () => {
  return (
    <Wrapper>
      <Navbar></Navbar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  background: var(--color-primary);
  color: var(--color-white);
  padding: 40px;
`;
export default App;
