import { createTheme, Slide } from "@mui/material";
import { forwardRef } from "react";

export const customTheme = createTheme({
  breakpoints: {
    values: {
      vxs: 0,
      xs: 300,
      mxs: 475,
      sm: 640,
      md: 768,
      mdl: 850,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  zIndex: {
    drawer: 1200,
  },
});

export const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
