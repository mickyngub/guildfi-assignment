import { useState } from "react";
import styled from "styled-components/macro";
import { Volume2, VolumeX } from "react-feather";
import VisuallyHidden from "components/VisuallyHidden";
import { cryptomindLogo, guildfiLogo } from "assets";
interface INavLists {
  name: string;
  link: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  handleClickSound?: () => void;
}

const Navbar = () => {
  const [clickSound, setClickSound] = useState<boolean>(false);
  let volumeComponent: JSX.Element = clickSound ? <VolumeX /> : <Volume2 />;

  const handleClickSound = () => {
    setClickSound((prev) => !prev);
  };
  const navLists: INavLists[] = [
    {
      name: "Guildfi",
      link: "https://www.guildfi.com",
      icon: <img src={guildfiLogo} alt="cryptomind logo" />,
    },
    {
      name: "Cryptomind",
      link: "https://cryptomind.group/",
      icon: <img src={cryptomindLogo} alt="cryptomind logo" />,
    },
  ];
  return (
    <NavWrapper>
      <Nav>
        {navLists.map((navList) => (
          <NavItem>
            <NavA href={navList.link} target="_blank" rel="noopener noreferrer">
              <VisuallyHidden>{navList.name}</VisuallyHidden>
              {navList.icon}
            </NavA>
          </NavItem>
        ))}
        <NavVolume onClick={handleClickSound}>{volumeComponent}</NavVolume>
      </Nav>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  max-height: 10%;
  position: fixed;
  z-index: 1;
  opacity: 0.6;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-white);

  @media ${(p) => p.theme.QUERIES.tabletAndBigger} {
    min-height: 100%;
    width: 35px;
  }
`;

const Nav = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 4rem;
  @media ${(p) => p.theme.QUERIES.tabletAndBigger} {
    flex-direction: column;
    height: 100vh;
    padding: 2rem 0;
  }
`;

const NavItem = styled.li`
  list-style: none;
  cursor: pointer;
`;

const NavVolume = styled(NavItem)`
  margin-top: auto;
`;

const NavA = styled.a`
  display: flex;
  text-decoration: none;
  color: var(--color-primary);
`;

export default Navbar;
