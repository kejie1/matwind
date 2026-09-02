import { useState } from "react";
import { Button } from "../components/button";
import { Collapse, Fade, Grow, Slide, Zoom } from "../components/collapse";
import { Modal } from "../components/modal";
import { Paper } from "../components/paper";
import { ClickAwayListener, Popover } from "../components/popover";
import { Typography } from "../components/typography";
import { Api, Code, Demo, Doc, Page } from "../docs-ui";
import { useT } from "../locale";

export function UtilsPage() {
  const t = useT();
  const [away, setAway] = useState(false);
  const [modal, setModal] = useState(false);
  const [popEl, setPopEl] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(true);

  return (
    <Page
      title="Utils"
      lead={t(
        "CSS Baseline 在 material.css。Portal / Popper / useMediaQuery 不做。",
        "CSS Baseline is in material.css. No Portal / Popper / useMediaQuery.",
      )}
    >
      <Doc id="click-away" title="Click-away listener" file="popover.tsx · ClickAwayListener">
        <Demo>
          <ClickAwayListener onClickAway={() => setAway(false)}>
            <div>
              <Button variant="outlined" onClick={() => setAway(true)}>
                Open
              </Button>
              {away ? <Paper className="mt-2 inline-block p-4">Click outside to close.</Paper> : null}
            </div>
          </ClickAwayListener>
        </Demo>
        <Code>{`<ClickAwayListener onClickAway={() => setOpen(false)}>
  <div>{children}</div>
</ClickAwayListener>`}</Code>
        <Api
          rows={[
            ["onClickAway", "() => void", ""],
            ["children", "ReactNode", ""],
          ]}
        />
      </Doc>

      <Doc id="modal" title="Modal" file={t("modal.tsx · 原生 dialog，没有 Dialog 那层 Paper", "modal.tsx · native dialog, no Dialog Paper chrome")}>
        <Demo>
          <Button variant="outlined" onClick={() => setModal(true)}>
            Open modal
          </Button>
        </Demo>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["onClose", "() => void", ""],
            ["children", t("通常包 Paper elevation={24}", "usually wrap Paper elevation={24}"), ""],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("点 backdrop 关闭。需要标题栏/按钮用 Dialog。", "Click backdrop to close. Use Dialog if you need a title bar / buttons.")}
        </p>
        <Modal open={modal} onClose={() => setModal(false)}>
          <Paper elevation={24} className="p-6">
            <Typography variant="h6" gutterBottom>
              Modal
            </Typography>
            <Typography variant="body2" color="secondary">
              Native dialog, no paper chrome from Dialog.
            </Typography>
            <Button className="mt-4" variant="contained" onClick={() => setModal(false)}>
              Close
            </Button>
          </Paper>
        </Modal>
      </Doc>

      <Doc id="popover" title="Popover" file="popover.tsx">
        <Demo>
          <Button variant="outlined" onClick={(e) => setPopEl(popEl ? null : e.currentTarget)}>
            Open popover
          </Button>
          <Popover open={!!popEl} anchor={popEl} onClose={() => setPopEl(null)}>
            <div className="px-4 py-3 text-sm">The content of the Popover.</div>
          </Popover>
        </Demo>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["anchor", "HTMLElement | null", ""],
            ["onClose", t("Esc / 点外面", "Esc / click outside"), ""],
            ["children", t("任意内容，锚点下方 8px", "any content, 8px below the anchor"), ""],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("Menu 是它的列表特化。", "Menu is a list-specialized Popover.")}
        </p>
      </Doc>

      <Doc id="transitions" title="Transitions" file="collapse.tsx">
        <Demo>
          <Button onClick={() => setShown(!shown)}>{shown ? "Hide" : "Show"}</Button>
          <div className="mt-4">
            <Collapse in={shown}>
              <Paper className="p-4">Collapse uses CSS grid 0fr/1fr.</Paper>
            </Collapse>
            <Fade in={shown}>
              <Paper className="mt-2 p-4">Fade</Paper>
            </Fade>
            <Grow in={shown}>
              <Paper className="mt-2 p-4">Grow</Paper>
            </Grow>
            <Zoom in={shown}>
              <Paper className="mt-2 inline-block p-4">Zoom</Paper>
            </Zoom>
            <div className="mt-2 overflow-hidden">
              <Slide in={shown} direction="up">
                <Paper className="p-4">Slide up</Paper>
              </Slide>
            </div>
          </div>
        </Demo>
        <p className="mb-1 mt-4 text-sm text-[var(--md-text-secondary)]">
          {t("都接收 in: boolean 和 children。", "All take in: boolean and children.")}
        </p>
        <Api
          head={[t("组件", "Component"), t("行为", "Behavior")]}
          rows={[
            ["Collapse", t("高度 0fr → 1fr（CSS grid）", "height 0fr → 1fr (CSS grid)")],
            ["Fade", "opacity"],
            ["Grow", "scale 0.75 → 1 + opacity"],
            ["Zoom", "scale 0 → 1"],
            ["Slide", 'direction?: "up" | "down" | "left" | "right"'],
          ]}
        />
      </Doc>
    </Page>
  );
}
