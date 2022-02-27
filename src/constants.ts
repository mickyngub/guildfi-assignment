const BREAKPOINTS = {
  tablet: 600,
  laptop: 950,
  desktop: 1300,
};

const QUERIES = {
  tabletAndBigger: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndBigger: `(min-width; ${BREAKPOINTS.laptop / 16}rem)`,
  desktopAndBigger: `(min-width: ${BREAKPOINTS.desktop / 16}rem)`,
};

export const THEME = {
  QUERIES,
};
