import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const FadeBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "direction" && prop !== "atEnd",
})(({ theme, direction, atEnd }) => ({
  position: "absolute",
  zIndex: 4,
  top: direction === "top" ? "102px" : undefined,
  bottom: direction === "bottom" ? "0" : undefined,
  left: 0,
  width: "calc(100% - 10px)",
  height: "80px",
  pointerEvents: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      direction === "top"
        ? `linear-gradient(to bottom, ${theme.palette.neutral[50]}, rgba(255, 255, 255, 0) 100%)`
        : `linear-gradient(to top, ${theme.palette.neutral[50]}, rgba(255, 255, 255, 0) 100%)`,
    opacity: atEnd ? 0 : 1,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
}));


export const HorizontalFade = styled(Box, {
  shouldForwardProp: (prop) => prop !== "direction" && prop !== "atEnd",
})(({ theme, direction, atEnd }) => {
  let gradientDirection;
  switch(direction) {
    case 'top':
      gradientDirection = 'to bottom';
      break;
    case 'bottom':
      gradientDirection = 'to top';
      break;
    case 'left':
      gradientDirection = 'to right';
      break;
    case 'right':
    default:
      gradientDirection = 'to left';
  }
  return {
    position: "absolute",
    zIndex: 4,
    [direction]: 0,
    top: (direction === 'left' || direction === 'right') ? 0 : undefined,
    width: (direction === 'left' || direction === 'right') ? '80px' : undefined,
    height: '100%',
    pointerEvents: "none",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `linear-gradient(${gradientDirection}, ${theme.palette.neutral[50]}, rgba(255, 255, 255, 0) 100%)`,
      opacity: atEnd ? 0 : 1,
      transition: theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
    },
  };
});
