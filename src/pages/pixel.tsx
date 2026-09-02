import { useState } from "react";
import { Button } from "../components/button";
import { Fab } from "../components/fab";
import { IconButton } from "../components/icon-button";
import { IconClose, IconPlus } from "../docs-ui";
import { useT } from "../locale";
import { MuiStage } from "./pixel-mui";
import { stageStyle } from "./pixel-stage";

function KitStage() {
  return (
    <div className="kit" style={stageStyle}>
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
        <span className="mr-2 inline-flex [&>svg]:size-6">
          <IconPlus />
        </span>
        Create
      </Fab>
    </div>
  );
}

const modes = ["ghost", "diff", "side"] as const;

export function PixelPage() {
  const t = useT();
  const [mode, setMode] = useState<(typeof modes)[number]>("ghost");
  const labels = { ghost: t("半透明", "Ghost"), diff: t("差值", "Difference"), side: t("并排", "Side by side") };

  return (
    <div className="font-sans text-[13px] text-[var(--doc-muted)]">
      <div className="flex items-center gap-2 px-3 py-2.5">
        {modes.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={
              mode === id
                ? "rounded border-0 bg-[var(--doc-accent)] px-2.5 py-1 text-white"
                : "rounded border border-solid border-[var(--doc-line)] bg-white px-2.5 py-1"
            }
          >
            {labels[id]}
          </button>
        ))}
        <span>
          {mode === "ghost" && t("对上了就是一层，对不上会重影", "Match = one layer. Mismatch = ghosting.")}
          {mode === "diff" && t("对上了是一块黑", "Match = solid black.")}
          {mode === "side" && t("左 kit · 右 MUI", "Left kit · right MUI")}
        </span>
      </div>

      {mode === "side" ? (
        <div className="flex gap-4 bg-[#eee] p-3">
          <div>
            <div className="mb-1 text-[11px]">kit</div>
            <KitStage />
          </div>
          <div>
            <div className="mb-1 text-[11px]">MUI</div>
            <MuiStage />
          </div>
        </div>
      ) : (
        <div className="relative m-3 inline-block" style={{ background: mode === "diff" ? "#eee" : "#fff" }}>
          <KitStage />
          <div
            className="pointer-events-none absolute left-0 top-0"
            style={{
              opacity: mode === "ghost" ? 0.5 : 1,
              mixBlendMode: mode === "diff" ? "difference" : "normal",
            }}
          >
            <MuiStage />
          </div>
        </div>
      )}
    </div>
  );
}
