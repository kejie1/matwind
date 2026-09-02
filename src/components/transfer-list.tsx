import { useState } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Paper } from "./paper";

function ListBox({
  items,
  checked,
  onToggle,
}: {
  items: string[];
  checked: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <Paper className="h-52 w-44 overflow-auto py-2">
      {items.map((item) => (
        <label key={item} className="flex cursor-pointer items-center gap-1 px-1 hover:bg-[var(--md-action-hover)]">
          <Checkbox checked={checked.includes(item)} onChange={() => onToggle(item)} />
          <span className="text-sm">{item}</span>
        </label>
      ))}
    </Paper>
  );
}

export function TransferList({
  left,
  right,
  onChange,
}: {
  left: string[];
  right: string[];
  onChange: (left: string[], right: string[]) => void;
}) {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (item: string) =>
    setChecked((c) => (c.includes(item) ? c.filter((x) => x !== item) : [...c, item]));
  const leftChecked = checked.filter((c) => left.includes(c));
  const rightChecked = checked.filter((c) => right.includes(c));
  const clear = (pick: string[]) => setChecked((c) => c.filter((x) => !pick.includes(x)));
  return (
    <div className="flex items-center gap-2">
      <ListBox items={left} checked={checked} onToggle={toggle} />
      <div className="flex flex-col gap-1">
        <Button
          size="small"
          variant="outlined"
          disabled={!leftChecked.length}
          onClick={() => {
            onChange(
              left.filter((x) => !leftChecked.includes(x)),
              [...right, ...leftChecked],
            );
            clear(leftChecked);
          }}
        >
          &gt;
        </Button>
        <Button
          size="small"
          variant="outlined"
          disabled={!rightChecked.length}
          onClick={() => {
            onChange([...left, ...rightChecked], right.filter((x) => !rightChecked.includes(x)));
            clear(rightChecked);
          }}
        >
          &lt;
        </Button>
      </div>
      <ListBox items={right} checked={checked} onToggle={toggle} />
    </div>
  );
}
