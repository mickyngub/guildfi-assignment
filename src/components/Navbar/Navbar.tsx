import { useState } from "react";
import styled from "styled-components/macro";
import { Anchor, Aperture, HelpCircle, Volume2, VolumeX } from "react-feather";
import VisuallyHidden from "components/VisuallyHidden";
interface INavLists {
  name: string;
  link: string;
  icon: React.ReactElement<any, any>;
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
      link: "www.guildfi.com",
      icon: <Anchor />,
    },
    {
      name: "Cryptomind",
      link: "https://cryptomind.group/",
      icon: <Aperture />,
    },
    {
      name: "Gala",
      link: "https://app.gala.games/",
      icon: <HelpCircle />,
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
        <NavItem onClick={handleClickSound}>{volumeComponent}</NavItem>
      </Nav>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  max-height: 10%;
  position: fixed;
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

  @media ${(p) => p.theme.QUERIES.tabletAndBigger} {
    flex-direction: column;
    height: 100vh;
  }
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavA = styled.a`
  display: flex;
  text-decoration: none;
  color: var(--color-primary);
`;

export default Navbar;
