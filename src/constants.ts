const BREAKPOINTS = {
  tablet: 600,
  laptop: 950,
  desktop: 1300,
};

const QUERIES = {
  tabletAndBigger: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndBigger: `(min-width: ${BREAKPOINTS.laptop / 16}rem)`,
  desktopAndBigger: `(min-width: ${BREAKPOINTS.desktop / 16}rem)`,
};

export const COLORS = {
  primary: "hsl(209deg 100% 20%)",
  primaryDark: "hsl(211deg 100% 12%)",
  secondary: "hsl(46deg 100% 50%)",
  secondaryLight: "hsl(50deg 100% 52%)",
  black: "hsl(216deg 100% 4%)",
  white: "hsl(0deg 0% 100%)",
};

export const THEME = {
  QUERIES,
};
