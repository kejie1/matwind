import { useState } from "react";
import { Alert, AlertTitle } from "../components/alert";
import { Backdrop } from "../components/backdrop";
import { Button } from "../components/button";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "../components/dialog";
import { Divider } from "../components/divider";
import { CircularProgress, LinearProgress, Skeleton } from "../components/progress";
import { Snackbar } from "../components/snackbar";
import { Api, Code, Demo, Doc, Page, Row } from "../docs-ui";
import { useT } from "../locale";

export function FeedbackPage() {
  const t = useT();
  const [okAlert, setOkAlert] = useState(true);
  const [back, setBack] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [snack, setSnack] = useState(false);
  const vol = 40;

  return (
    <Page title="Feedback">
      <Doc id="alert" title="Alert" file="alert.tsx">
        <Demo>
          <div className="flex flex-col gap-3">
            {okAlert ? (
              <Alert severity="success" onClose={() => setOkAlert(false)}>
                This is a success alert.
              </Alert>
            ) : null}
            <Alert severity="error">This is an error alert.</Alert>
            <Alert severity="info" variant="outlined">
              <AlertTitle>Outlined</AlertTitle>
              Outlined info alert.
            </Alert>
            <Alert severity="warning" variant="filled">
              Filled warning.
            </Alert>
          </div>
        </Demo>
        <Code>{`<Alert severity="success" onClose={() => {}}>
  <AlertTitle>Success</AlertTitle>
  Saved.
</Alert>`}</Code>
        <Api
          rows={[
            ["severity", '"error" | "warning" | "info" | "success"', '"success"'],
            ["variant", '"standard" | "filled" | "outlined"', '"standard"'],
            ["onClose", "() => void", t("有则显示关闭钮", "shows a close button if set")],
          ]}
        />
      </Doc>

      <Doc id="backdrop" title="Backdrop" file="backdrop.tsx">
        <Demo>
          <Button variant="outlined" onClick={() => setBack(true)}>
            Show backdrop
          </Button>
        </Demo>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["onClick", t("点遮罩（通常用来关）", "click the overlay (usually to close)"), ""],
            ["children", t("居中内容，例如 CircularProgress", "centered content, e.g. CircularProgress"), ""],
          ]}
        />
        <Backdrop open={back} onClick={() => setBack(false)}>
          <CircularProgress />
        </Backdrop>
      </Doc>

      <Doc id="dialog" title="Dialog" file={t("dialog.tsx · 原生 dialog", "dialog.tsx · native dialog")}>
        <Demo>
          <Button variant="contained" onClick={() => setDialog(true)}>
            Open dialog
          </Button>
        </Demo>
        <Code>{`<Dialog open={open} onClose={close}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>
    <DialogContentText>Body</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={close}>Disagree</Button>
    <Button variant="contained">Agree</Button>
  </DialogActions>
</Dialog>`}</Code>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["onClose", "() => void", t("Esc / 点 backdrop", "Esc / click backdrop")],
          ]}
        />
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Use location service?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let the app determine your location. This is a native <code>&lt;dialog&gt;</code>, no Emotion.
            </DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={() => setDialog(false)}>Disagree</Button>
            <Button variant="contained" onClick={() => setDialog(false)}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Doc>

      <Doc id="progress" title="Progress" file="progress.tsx">
        <Demo>
          <Row>
            <CircularProgress />
            <CircularProgress value={vol} />
            <div className="min-w-48 flex-1">
              <LinearProgress />
              <LinearProgress value={vol} className="mt-3" />
            </div>
          </Row>
        </Demo>
        <p className="mb-1 mt-4 text-sm font-medium">CircularProgress</p>
        <Api
          rows={[
            ["size", "number", t("默认 40", "default 40")],
            ["value", "number", t("0–100 则为确定态，否则转圈", "0–100 = determinate, else spinning")],
          ]}
        />
        <p className="mb-1 mt-4 text-sm font-medium">LinearProgress</p>
        <Api rows={[["value", "number", t("有则确定条，无则不确定动画", "set = determinate bar, else indeterminate")]]} />
      </Doc>

      <Doc id="skeleton" title="Skeleton" file="progress.tsx">
        <Demo>
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" className="size-10" />
            <div className="flex-1">
              <Skeleton />
              <Skeleton className="mt-2 w-2/3" />
            </div>
          </div>
        </Demo>
        <Api rows={[["variant", '"text" | "circular" | "rectangular"', '"text"']]} />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t('尺寸用 className（如 className="size-10"）。', 'Size via className (e.g. className="size-10").')}
        </p>
      </Doc>

      <Doc id="snackbar" title="Snackbar" file="snackbar.tsx">
        <Demo>
          <Button variant="text" onClick={() => setSnack(true)}>
            Snackbar
          </Button>
        </Demo>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["onClose", "() => void", ""],
            ["message", "string", ""],
            ["autoHideDuration", "number", "4000"],
            ["action", "ReactNode", t("右侧按钮", "right-side button")],
          ]}
        />
        <Snackbar
          open={snack}
          onClose={() => setSnack(false)}
          message="Saved to drafts"
          action={
            <Button variant="text" className="text-[#90caf9]" onClick={() => setSnack(false)}>
              Undo
            </Button>
          }
        />
      </Doc>
    </Page>
  );
}
