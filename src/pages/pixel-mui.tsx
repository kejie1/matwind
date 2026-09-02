// @ts-nocheck — MUI types vs React 18; overlay only
import type { CSSProperties } from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { stageStyle } from "./pixel-stage";

const muiTheme = createTheme({ cssVariables: false });

function IconPlus({ size = "1em", style }: { size?: number | string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} style={style} aria-hidden>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

export function MuiStage() {
  return (
    <ThemeProvider theme={muiTheme}>
      <div style={stageStyle}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <IconButton color="primary" aria-label="add">
          <IconPlus />
        </IconButton>
        <IconButton aria-label="close">
          <IconClose />
        </IconButton>
        <Fab color="primary" aria-label="add">
          <IconPlus />
        </Fab>
        <Fab color="primary" variant="extended">
          <IconPlus size={24} style={{ marginRight: 8 }} />
          Create
        </Fab>
      </div>
    </ThemeProvider>
  );
}
