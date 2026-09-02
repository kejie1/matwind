import { Alert } from "./components/alert";
import { Avatar } from "./components/avatar";
import { Button } from "./components/button";
import { Checkbox } from "./components/checkbox";
import { Chip } from "./components/chip";
import { Fab } from "./components/fab";
import { IconButton } from "./components/icon-button";
import { LinearProgress } from "./components/progress";
import { Switch } from "./components/switch";
import { TextField } from "./components/text-field";
import { IconPlus } from "./docs-ui";

export function ComponentThumb({ id }: { id: string }) {
  const inner = (() => {
    switch (id) {
      case "button":
        return <Button variant="contained">Button</Button>;
      case "icon-button":
        return (
          <IconButton aria-label="add" color="primary">
            <IconPlus />
          </IconButton>
        );
      case "fab":
        return (
          <Fab aria-label="add" size="small">
            <IconPlus />
          </Fab>
        );
      case "switch":
        return <Switch defaultChecked />;
      case "checkbox":
        return <Checkbox defaultChecked />;
      case "text-field":
        return <TextField label="Label" defaultValue="" className="w-28" />;
      case "chip":
        return <Chip>Chip</Chip>;
      case "alert":
        return <Alert severity="success">Alert</Alert>;
      case "avatar":
        return <Avatar>MK</Avatar>;
      case "progress":
        return <LinearProgress value={65} className="w-24" />;
      default:
        return (
          <span className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600">
            {id.slice(0, 2).toUpperCase()}
          </span>
        );
    }
  })();
  return (
    <div className="matwind pointer-events-none flex h-full w-full scale-90 items-center justify-center overflow-hidden">
      {inner}
    </div>
  );
}
