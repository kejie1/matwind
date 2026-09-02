import { useState } from "react";
import { Accordion, AccordionActions } from "./components/accordion";
import { Alert, AlertTitle } from "./components/alert";
import { AppBar, Toolbar } from "./components/app-bar";
import { Avatar, AvatarGroup, Badge } from "./components/avatar";
import { Backdrop } from "./components/backdrop";
import { BottomNavigation, BottomNavigationAction } from "./components/bottom-navigation";
import { Breadcrumbs, Link } from "./components/breadcrumbs";
import { Button } from "./components/button";
import { ButtonGroup } from "./components/button-group";
import { Card, CardActions, CardContent, CardHeader, CardMedia } from "./components/card";
import { Checkbox } from "./components/checkbox";
import { Chip } from "./components/chip";
import { Collapse, Fade, Grow, Slide, Zoom } from "./components/collapse";
import { Container } from "./components/container";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "./components/dialog";
import { Divider } from "./components/divider";
import { Drawer } from "./components/drawer";
import { Fab } from "./components/fab";
import { FormControl, FormHelperText, FormLabel } from "./components/form";
import { FormControlLabel } from "./components/form-control-label";
import { IconButton } from "./components/icon-button";
import { ImageList, ImageListItem, ImageListItemBar } from "./components/image-list";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "./components/list";
import { Menu } from "./components/menu";
import { MobileStepper } from "./components/mobile-stepper";
import { Modal } from "./components/modal";
import { NativeSelect } from "./components/native-select";
import { Pagination } from "./components/pagination";
import { Paper } from "./components/paper";
import { ClickAwayListener, Popover } from "./components/popover";
import { CircularProgress, LinearProgress, Skeleton } from "./components/progress";
import { Radio, RadioGroup } from "./components/radio";
import { Rating } from "./components/rating";
import { MenuItem, Select } from "./components/select";
import { Slider } from "./components/slider";
import { Snackbar } from "./components/snackbar";
import { SpeedDial, SpeedDialAction } from "./components/speed-dial";
import { Step, Stepper } from "./components/stepper";
import { SvgIcon } from "./components/svg-icon";
import { Switch } from "./components/switch";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "./components/table";
import { Tab, Tabs } from "./components/tabs";
import { TextField } from "./components/text-field";
import { ToggleButton, ToggleButtonGroup } from "./components/toggle-button";
import { Tooltip } from "./components/tooltip";
import { TransferList } from "./components/transfer-list";
import { Typography } from "./components/typography";
import { IconClose, IconFav, IconHome, IconMenu, IconPerson, IconPlus } from "./docs-ui";
import { emit, type PlaygroundSpec, type PreviewProps } from "./playground";

const colors = ["primary", "error", "inherit"];
const sizes = ["small", "medium", "large"];

function MenuPreview({ p: _p }: PreviewProps) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button variant="outlined" onClick={(e) => setEl(el ? null : e.currentTarget)}>
        Open menu
      </Button>
      <Menu open={!!el} anchor={el} onClose={() => setEl(null)}>
        <MenuItem value="edit" onPick={() => setEl(null)}>
          Edit
        </MenuItem>
        <MenuItem value="dup" onPick={() => setEl(null)}>
          Duplicate
        </MenuItem>
        <MenuItem value="del" onPick={() => setEl(null)}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

function PopoverPreview({ p: _p }: PreviewProps) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button variant="outlined" onClick={(e) => setEl(el ? null : e.currentTarget)}>
        Open popover
      </Button>
      <Popover open={!!el} anchor={el} onClose={() => setEl(null)}>
        <div className="px-4 py-3 text-sm">The content of the Popover.</div>
      </Popover>
    </>
  );
}

function ClickAwayPreview() {
  const [open, setOpen] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open
        </Button>
        {open ? <Paper className="mt-2 inline-block p-4">Click outside to close.</Paper> : null}
      </div>
    </ClickAwayListener>
  );
}

function TablePreview() {
  const [page, setPage] = useState(0);
  return (
    <div className="w-full">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active direction="asc">
                  Dessert
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>Frozen yoghurt</TableCell>
              <TableCell align="right">159</TableCell>
              <TableCell align="right">6</TableCell>
            </TableRow>
            <TableRow hover selected>
              <TableCell>Ice cream sandwich</TableCell>
              <TableCell align="right">237</TableCell>
              <TableCell align="right">9</TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>Eclair</TableCell>
              <TableCell align="right">262</TableCell>
              <TableCell align="right">16</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination count={13} page={page} rowsPerPage={5} onPageChange={setPage} />
    </div>
  );
}

export const previews: Record<string, PlaygroundSpec> = {
  button: {
    file: "button.tsx",
    lead: ["按钮。点击触发操作。", "Communicates an action that can be taken."],
    defaults: { variant: "contained", color: "primary", size: "medium", disabled: false, fullWidth: false, children: "Button" },
    controls: [
      { name: "variant", kind: "radio", options: ["text", "outlined", "contained"] },
      { name: "color", kind: "select", options: colors },
      { name: "size", kind: "radio", options: sizes },
      { name: "disabled", kind: "boolean" },
      { name: "fullWidth", kind: "boolean" },
      { name: "children", kind: "text" },
    ],
    props: [
      ["children", "ReactNode", "", ["组件内容。", "The content of the component."]],
      ["variant", '"text" | "outlined" | "contained"', '"text"', ["使用的变体。", "The variant to use."]],
      ["color", '"primary" | "error" | "inherit"', '"primary"', ["组件颜色。", "The color of the component."]],
      ["size", '"small" | "medium" | "large"', '"medium"', ["组件尺寸。", "The size of the component."]],
      ["fullWidth", "boolean", "false", ["为 true 时占满父容器宽度。", "If true, the button takes the full width of its container."]],
      ["startIcon / endIcon", "ReactNode", "", ["起止图标。", "Icons before or after the label."]],
      ["disabled", "boolean", "false", ["为 true 时禁用。", "If true, the component is disabled."]],
      ["className", "string", "", ["覆盖根节点样式。", "Override styles on the root."]],
    ],
    code: (p) => emit("Button", p, p.children),
    Preview: ({ p }) => (
      <Button variant={p.variant} color={p.color} size={p.size} disabled={p.disabled} fullWidth={p.fullWidth}>
        {p.children}
      </Button>
    ),
  },
  "icon-button": {
    file: "icon-button.tsx",
    lead: ["图标按钮。必须 aria-label。", "Icon button. aria-label is required."],
    note: ["medium 热区 40px，必须 aria-label。", "medium hit area is 40px; aria-label is required."],
    defaults: { color: "primary", size: "medium", disabled: false },
    controls: [
      { name: "color", kind: "select", options: colors },
      { name: "size", kind: "radio", options: sizes },
      { name: "disabled", kind: "boolean" },
    ],
    props: [
      ["aria-label", "string", "required"],
      ["color", '"primary" | "error" | "inherit"', '"inherit"'],
      ["size", '"small" | "medium" | "large"', '"medium"'],
    ],
    code: (p) => emit("IconButton", { ...p, "aria-label": "add" }, "{icon}"),
    Preview: ({ p }) => (
      <IconButton aria-label="add" color={p.color} size={p.size} disabled={p.disabled}>
        <IconPlus />
      </IconButton>
    ),
  },
  "button-group": {
    file: "button-group.tsx",
    lead: ["按钮组。子节点必须是 Button。", "Button group. Children must be Button."],
    note: ["子节点必须是 Button。用子选择器切圆角、共用边框。", "Children must be Button. Child selectors clip corners and share the border."],
    defaults: { variant: "contained" },
    controls: [{ name: "variant", kind: "radio", options: ["contained", "outlined", "text"] }],
    props: [["variant", '"contained" | "outlined" | "text"', '"outlined"']],
    code: (p) => `<ButtonGroup variant="${p.variant}">\n  <Button variant="${p.variant}">One</Button>\n  <Button variant="${p.variant}">Two</Button>\n  <Button variant="${p.variant}">Three</Button>\n</ButtonGroup>`,
    Preview: ({ p }) => (
      <ButtonGroup variant={p.variant}>
        <Button variant={p.variant}>One</Button>
        <Button variant={p.variant}>Two</Button>
        <Button variant={p.variant}>Three</Button>
      </ButtonGroup>
    ),
  },
  checkbox: {
    file: "checkbox.tsx · FormControlLabel",
    defaults: { checked: true, indeterminate: false, disabled: false, size: "medium" },
    controls: [
      { name: "checked", kind: "boolean" },
      { name: "indeterminate", kind: "boolean" },
      { name: "disabled", kind: "boolean" },
      { name: "size", kind: "radio", options: ["medium", "small"] },
    ],
    props: [
      ["checked", "boolean", "", ["受控", "controlled"]],
      ["indeterminate", "boolean", "", ["横杠态", "dash state"]],
      ["disabled", "boolean", ""],
      ["size", '"medium" | "small"', ""],
      ["onChange", "(e: { target: { checked: boolean } }) => void", ""],
    ],
    code: (p) => `<FormControlLabel control={${emit("Checkbox", p)}} label="Agree" />`,
    Preview: ({ p, set }) => (
      <FormControlLabel
        disabled={p.disabled}
        control={<Checkbox checked={p.checked} indeterminate={p.indeterminate} disabled={p.disabled} size={p.size} onChange={(e) => set("checked", e.target.checked)} />}
        label="Agree"
      />
    ),
  },
  fab: {
    file: "fab.tsx",
    defaults: { variant: "circular", color: "primary", size: "medium" },
    controls: [
      { name: "variant", kind: "radio", options: ["circular", "extended"] },
      { name: "color", kind: "select", options: colors },
      { name: "size", kind: "radio", options: sizes },
    ],
    props: [
      ["variant", '"circular" | "extended"', '"circular"'],
      ["color", '"primary" | "error" | "inherit"', '"primary"'],
      ["size", '"small" | "medium" | "large"', '"medium"'],
    ],
    code: (p) => emit("Fab", { ...p, "aria-label": "add" }, p.variant === "extended" ? "Create" : "{icon}"),
    Preview: ({ p }) =>
      p.variant === "extended" ? (
        <Fab variant="extended" color={p.color} size={p.size}>
          <span className="mr-2 inline-flex [&>svg]:size-6">
            <IconPlus />
          </span>
          Create
        </Fab>
      ) : (
        <Fab aria-label="add" color={p.color} size={p.size}>
          <IconPlus />
        </Fab>
      ),
  },
  "radio-group": {
    file: "radio.tsx",
    note: ["Radio 的 value 必填。FormControlLabel：control + label。", "Radio value is required. FormControlLabel: control + label."],
    defaults: { value: "pro", row: true, disabled: false },
    controls: [
      { name: "value", kind: "select", options: ["free", "pro", "team"] },
      { name: "row", kind: "boolean" },
      { name: "disabled", kind: "boolean" },
    ],
    props: [
      ["value", "string", "", ["当前值", "current value"]],
      ["onChange", "(value: string) => void", ""],
      ["row", "boolean", "", ["横排", "horizontal"]],
    ],
    code: (p) => `<RadioGroup value="${p.value}" onChange={setValue}${p.row ? " row" : ""}>\n  <FormControlLabel control={<Radio value="free" />} label="Free" />\n</RadioGroup>`,
    Preview: ({ p, set }) => (
      <RadioGroup value={p.value} onChange={(v) => set("value", v)} row={p.row}>
        <FormControlLabel disabled={p.disabled} control={<Radio value="free" disabled={p.disabled} />} label="Free" />
        <FormControlLabel disabled={p.disabled} control={<Radio value="pro" disabled={p.disabled} />} label="Pro" />
        <FormControlLabel disabled={p.disabled} control={<Radio value="team" disabled={p.disabled} />} label="Team" />
      </RadioGroup>
    ),
  },
  rating: {
    file: "rating.tsx",
    defaults: { value: 3, size: "medium", readOnly: false },
    controls: [
      { name: "size", kind: "radio", options: sizes },
      { name: "readOnly", kind: "boolean" },
    ],
    props: [
      ["value", "number", "", ["必填", "required"]],
      ["onChange", "(value: number) => void", ""],
      ["max", "number", "5"],
      ["readOnly", "boolean", ""],
      ["size", '"small" | "medium" | "large"', '"medium"'],
    ],
    code: (p) => emit("Rating", { value: p.value, size: p.size, readOnly: p.readOnly }),
    Preview: ({ p, set }) => <Rating value={p.value} size={p.size} readOnly={p.readOnly} onChange={(v) => set("value", v)} />,
  },
  select: {
    file: "select.tsx",
    defaults: { label: "City", value: "kl", fullWidth: true, disabled: false },
    controls: [
      { name: "label", kind: "text" },
      { name: "disabled", kind: "boolean" },
      { name: "fullWidth", kind: "boolean" },
    ],
    props: [
      ["label", "string", ""],
      ["value", "string", ""],
      ["onChange", "(value: string) => void", ""],
      ["fullWidth / disabled", "boolean", ""],
    ],
    code: (p) => `<Select label="${p.label}" value="${p.value}" onChange={setValue}${p.fullWidth ? " fullWidth" : ""}${p.disabled ? " disabled" : ""}>\n  <MenuItem value="kl">Kuala Lumpur</MenuItem>\n</Select>`,
    Preview: ({ p, set }) => (
      <div className="w-64">
        <Select label={p.label} value={p.value} onChange={(v) => set("value", v)} fullWidth={p.fullWidth} disabled={p.disabled}>
          <MenuItem value="kl">Kuala Lumpur</MenuItem>
          <MenuItem value="pg">Penang</MenuItem>
          <MenuItem value="jb">Johor Bahru</MenuItem>
        </Select>
      </div>
    ),
  },
  "native-select": {
    file: "native-select.tsx",
    note: ["原生 select 加 MUI 下划线。", "Native select with the MUI underline."],
    defaults: { value: "apple" },
    controls: [{ name: "value", kind: "select", options: ["apple", "orange"] }],
    props: [],
    code: (p) => `<NativeSelect value="${p.value}" onChange={(e) => setValue(e.target.value)}>\n  <option value="apple">Apple</option>\n</NativeSelect>`,
    Preview: ({ p, set }) => (
      <FormControl>
        <FormLabel>Fruit</FormLabel>
        <NativeSelect value={p.value} onChange={(e) => set("value", e.target.value)}>
          <option value="apple">Apple</option>
          <option value="orange">Orange</option>
        </NativeSelect>
        <FormHelperText>Native select, MUI underline.</FormHelperText>
      </FormControl>
    ),
  },
  slider: {
    file: "slider.tsx · input type=range",
    defaults: { value: 40, disabled: false },
    controls: [{ name: "disabled", kind: "boolean" }],
    props: [
      ["value", "number", "0"],
      ["min / max", "number", "0 / 100"],
      ["onChange", "(value: number) => void", ""],
    ],
    code: (p) => emit("Slider", { value: p.value, disabled: p.disabled }),
    Preview: ({ p, set }) => (
      <div className="w-64">
        <Slider value={p.value} disabled={p.disabled} onChange={(v) => set("value", v)} />
      </div>
    ),
  },
  switch: {
    file: "switch.tsx",
    defaults: { checked: true, disabled: false, size: "medium" },
    controls: [
      { name: "checked", kind: "boolean" },
      { name: "disabled", kind: "boolean" },
      { name: "size", kind: "radio", options: ["medium", "small"] },
    ],
    props: [
      ["checked", "boolean", ""],
      ["onChange", "(e: { target: { checked: boolean } }) => void", ""],
      ["disabled / size", "", "", ["同 Checkbox", "same as Checkbox"]],
    ],
    code: (p) => `<FormControlLabel control={${emit("Switch", p)}} label="On" />`,
    Preview: ({ p, set }) => (
      <FormControlLabel
        disabled={p.disabled}
        control={<Switch checked={p.checked} disabled={p.disabled} size={p.size} onChange={(e) => set("checked", e.target.checked)} />}
        label="On"
      />
    ),
  },
  "text-field": {
    file: "text-field.tsx",
    defaults: { label: "Email", variant: "outlined", size: "medium", error: false, disabled: false, fullWidth: true, helperText: "", value: "" },
    controls: [
      { name: "label", kind: "text" },
      { name: "variant", kind: "radio", options: ["outlined", "filled"] },
      { name: "size", kind: "radio", options: ["medium", "small"] },
      { name: "error", kind: "boolean" },
      { name: "disabled", kind: "boolean" },
      { name: "helperText", kind: "text" },
    ],
    props: [
      ["label", "string", "", ["必填", "required"]],
      ["variant", '"outlined" | "filled"', '"outlined"'],
      ["size", '"medium" | "small"', '"medium"'],
      ["error / disabled / fullWidth / multiline", "boolean", ""],
      ["helperText", "string", ""],
      ["minRows", "number", "3"],
      ["startAdornment / endAdornment", "ReactNode", ""],
    ],
    code: (p) => emit("TextField", { label: p.label, variant: p.variant, size: p.size, error: p.error, disabled: p.disabled, helperText: p.helperText || undefined }),
    Preview: ({ p, set }) => (
      <div className="w-72">
        <TextField
          label={p.label}
          variant={p.variant}
          size={p.size}
          error={p.error}
          disabled={p.disabled}
          fullWidth
          helperText={p.helperText || undefined}
          value={p.value}
          onChange={(e) => set("value", e.target.value)}
        />
      </div>
    ),
  },
  "form-control": {
    file: "form.tsx",
    note: [
      "FormControl / FormGroup / FormLabel / FormHelperText。FormControlLabel 在 form-control-label.tsx，见 Checkbox、Radio。",
      "FormControl / FormGroup / FormLabel / FormHelperText. FormControlLabel is in form-control-label.tsx — see Checkbox and Radio.",
    ],
    defaults: { value: "apple" },
    controls: [],
    props: [],
    code: () => `<FormControl>\n  <FormLabel>Fruit</FormLabel>\n  <NativeSelect>...</NativeSelect>\n  <FormHelperText>Hint</FormHelperText>\n</FormControl>`,
    Preview: ({ p, set }) => (
      <FormControl>
        <FormLabel>Fruit</FormLabel>
        <NativeSelect value={p.value} onChange={(e) => set("value", e.target.value)}>
          <option value="apple">Apple</option>
          <option value="orange">Orange</option>
        </NativeSelect>
        <FormHelperText>Helper text under the field.</FormHelperText>
      </FormControl>
    ),
  },
  "transfer-list": {
    file: "transfer-list.tsx",
    defaults: { left: ["React", "Vue", "Svelte"], right: ["Angular"] },
    controls: [],
    props: [
      ["left / right", "string[]", ""],
      ["onChange", "(left: string[], right: string[]) => void", ""],
    ],
    code: () => `<TransferList left={left} right={right} onChange={setBoth} />`,
    Preview: ({ p, set }) => <TransferList left={p.left} right={p.right} onChange={(l, r) => { set("left", l); set("right", r); }} />,
  },
  "toggle-button": {
    file: "toggle-button.tsx · exclusive",
    defaults: { value: "left" },
    controls: [{ name: "value", kind: "radio", options: ["left", "center", "right"] }],
    propsHead: [
      ["组件", "Component"],
      ["Prop", "Prop"],
      ["类型", "Type"],
    ],
    props: [
      ["ToggleButtonGroup", "value / onChange", "string / (value: string) => void"],
      ["ToggleButton", "value", "string"],
    ],
    code: (p) => `<ToggleButtonGroup value="${p.value}" onChange={setAlign}>\n  <ToggleButton value="left">Left</ToggleButton>\n</ToggleButtonGroup>`,
    Preview: ({ p, set }) => (
      <ToggleButtonGroup value={p.value} onChange={(v) => set("value", v)}>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    ),
  },
  avatar: {
    file: "avatar.tsx",
    note: ["AvatarGroup：max 默认 5，超出显示 +N。", "AvatarGroup: max defaults to 5; overflow shows +N."],
    defaults: { children: "R", size: "40" },
    controls: [
      { name: "children", kind: "text" },
      { name: "size", kind: "select", options: ["32", "40", "56"] },
    ],
    props: [
      ["src / alt", "string", "", ["有 src 就显示图片", "image if src is set"]],
      ["size", "number", "40"],
      ["children", "ReactNode", "", ["字母", "initials"]],
    ],
    code: (p) => emit("Avatar", { size: Number(p.size) }, p.children),
    Preview: ({ p }) => (
      <div className="flex items-center gap-3">
        <Avatar size={Number(p.size)}>{p.children}</Avatar>
        <AvatarGroup max={3}>
          <Avatar>OP</Avatar>
          <Avatar>J</Avatar>
          <Avatar>K</Avatar>
          <Avatar>L</Avatar>
        </AvatarGroup>
      </div>
    ),
  },
  badge: {
    file: "avatar.tsx",
    defaults: { badgeContent: "4", color: "error", variant: "standard" },
    controls: [
      { name: "badgeContent", kind: "text" },
      { name: "color", kind: "radio", options: ["error", "primary"] },
      { name: "variant", kind: "radio", options: ["standard", "dot"] },
    ],
    props: [
      ["badgeContent", "ReactNode", ""],
      ["color", '"error" | "primary"', '"error"'],
      ["variant", '"standard" | "dot"', '"standard"'],
      ["max", "number", "99"],
    ],
    code: (p) => `<Badge badgeContent={${JSON.stringify(p.badgeContent)}} color="${p.color}" variant="${p.variant}">\n  <Avatar>R</Avatar>\n</Badge>`,
    Preview: ({ p }) => (
      <Badge badgeContent={p.badgeContent} color={p.color} variant={p.variant}>
        <Avatar>R</Avatar>
      </Badge>
    ),
  },
  chip: {
    file: "chip.tsx",
    defaults: { children: "Chip", variant: "filled", size: "medium", color: "default", deletable: false },
    controls: [
      { name: "children", kind: "text" },
      { name: "variant", kind: "radio", options: ["filled", "outlined"] },
      { name: "size", kind: "radio", options: ["medium", "small"] },
      { name: "color", kind: "radio", options: ["default", "primary"] },
      { name: "deletable", kind: "boolean" },
    ],
    props: [
      ["variant", '"filled" | "outlined"', '"filled"'],
      ["size", '"medium" | "small"', '"medium"'],
      ["color", '"default" | "primary"', ""],
      ["onClick", "handler", "", ["有则 clickable + ripple", "if set: clickable + ripple"]],
      ["onDelete", "() => void", "", ["删除叉", "delete ×"]],
      ["icon", "ReactNode", "", ["左侧图标", "left icon"]],
    ],
    code: (p) => emit("Chip", { variant: p.variant, size: p.size, color: p.color === "default" ? undefined : p.color }, p.children),
    Preview: ({ p }) => (
      <Chip variant={p.variant} size={p.size} color={p.color} onDelete={p.deletable ? () => {} : undefined}>
        {p.children}
      </Chip>
    ),
  },
  divider: {
    file: "divider.tsx",
    defaults: { children: "middle" },
    controls: [{ name: "children", kind: "text" }],
    props: [
      ["orientation", '"horizontal" | "vertical"', ""],
      ["children", "ReactNode", "", ["有则中间文字、两边线", "text in the middle, lines on both sides"]],
      ["flexItem", "boolean", "", ["垂直时随 flex 拉伸", "stretch with flex when vertical"]],
    ],
    code: (p) => (p.children ? `<Divider>${p.children}</Divider>` : `<Divider />`),
    Preview: ({ p }) => (
      <div className="w-64">
        <Divider>{p.children || undefined}</Divider>
      </div>
    ),
  },
  icons: {
    file: "svg-icon.tsx",
    defaults: { color: "primary", fontSize: "medium" },
    controls: [
      { name: "color", kind: "select", options: ["inherit", "primary", "secondary", "error", "action", "disabled"] },
      { name: "fontSize", kind: "radio", options: ["inherit", "small", "medium", "large"] },
    ],
    props: [
      ["color", '"inherit" | "primary" | "secondary" | "error" | "action" | "disabled"', '"inherit"'],
      ["fontSize", '"inherit" | "small" | "medium" | "large"', '"medium"'],
      ["viewBox", "string", '"0 0 24 24"'],
    ],
    code: (p) => `<SvgIcon color="${p.color}" fontSize="${p.fontSize}">\n  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />\n</SvgIcon>`,
    Preview: ({ p }) => (
      <SvgIcon color={p.color} fontSize={p.fontSize}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    ),
  },
  list: {
    file: "list.tsx",
    note: [
      "List → ul。ListItem 静态行；ListItemButton 可点 + ripple。ListItemText：primary / secondary。ListItemButton 有 selected。",
      "List → ul. ListItem is a static row; ListItemButton is clickable + ripple. ListItemText: primary / secondary. ListItemButton has selected.",
    ],
    defaults: {},
    controls: [],
    props: [],
    code: () => `<List>\n  <ListItemButton selected>\n    <ListItemText primary="Inbox" />\n  </ListItemButton>\n</List>`,
    Preview: () => (
      <Paper variant="outlined" className="w-72">
        <List>
          <ListSubheader>Inbox</ListSubheader>
          <ListItem>
            <ListItemIcon>
              <IconHome />
            </ListItemIcon>
            <ListItemText primary="Home" secondary="ListItem + icon" />
          </ListItem>
          <ListItemButton selected>
            <ListItemText primary="Inbox" secondary="2 new messages" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
      </Paper>
    ),
  },
  table: {
    file: "table.tsx",
    defaults: {},
    controls: [],
    propsHead: [
      ["组件", "Component"],
      ["关键 props", "Key props"],
    ],
    props: [
      ["TableRow", "hover, selected", ""],
      ["TableCell", 'align?: "left" | "right" | "center"', ""],
      ["TableSortLabel", "active, direction, onClick", ""],
      ["TablePagination", "count, page, rowsPerPage, onPageChange", ""],
    ],
    Preview: TablePreview,
  },
  tooltip: {
    file: "tooltip.tsx",
    defaults: { title: "Close", placement: "top" },
    controls: [
      { name: "title", kind: "text" },
      { name: "placement", kind: "radio", options: ["top", "bottom", "left", "right"] },
    ],
    props: [
      ["title", "string", "", ["必填", "required"]],
      ["placement", '"top" | "bottom" | "left" | "right"', '"top"'],
      ["children", "ReactNode", "", ["触发器", "trigger"]],
    ],
    code: (p) => `<Tooltip title="${p.title}" placement="${p.placement}">\n  <IconButton aria-label="close">{icon}</IconButton>\n</Tooltip>`,
    Preview: ({ p }) => (
      <Tooltip title={p.title} placement={p.placement}>
        <IconButton aria-label="close">
          <IconClose />
        </IconButton>
      </Tooltip>
    ),
  },
  typography: {
    file: "typography.tsx",
    defaults: { variant: "h4", color: "inherit", gutterBottom: true, children: "h4. Heading" },
    controls: [
      { name: "variant", kind: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "button", "caption", "overline"] },
      { name: "color", kind: "select", options: ["inherit", "primary", "secondary", "error"] },
      { name: "gutterBottom", kind: "boolean" },
      { name: "children", kind: "text" },
    ],
    props: [
      ["variant", "h1–h6 / subtitle1 / subtitle2 / body1 / body2 / button / caption / overline", '"body1"'],
      ["component", "string", "", ["按 variant 映射标签", "maps to a tag from variant"]],
      ["gutterBottom", "boolean", "", ["下边距 0.35em", "bottom margin 0.35em"]],
      ["color", '"primary" | "secondary" | "error" | "inherit"', ""],
    ],
    code: (p) => emit("Typography", { variant: p.variant, color: p.color === "inherit" ? undefined : p.color, gutterBottom: p.gutterBottom }, p.children),
    Preview: ({ p }) => (
      <Typography variant={p.variant} color={p.color} gutterBottom={p.gutterBottom}>
        {p.children}
      </Typography>
    ),
  },
  alert: {
    file: "alert.tsx",
    defaults: { severity: "success", variant: "standard", closable: true, children: "This is a success alert." },
    controls: [
      { name: "severity", kind: "radio", options: ["error", "warning", "info", "success"] },
      { name: "variant", kind: "radio", options: ["standard", "filled", "outlined"] },
      { name: "closable", kind: "boolean" },
      { name: "children", kind: "text" },
    ],
    props: [
      ["severity", '"error" | "warning" | "info" | "success"', '"success"'],
      ["variant", '"standard" | "filled" | "outlined"', '"standard"'],
      ["onClose", "() => void", "", ["有则显示关闭钮", "shows a close button if set"]],
    ],
    code: (p) => `<Alert severity="${p.severity}" variant="${p.variant}"${p.closable ? " onClose={() => {}}" : ""}>\n  ${p.children}\n</Alert>`,
    Preview: ({ p }) => (
      <div className="w-full max-w-md">
        <Alert severity={p.severity} variant={p.variant} onClose={p.closable ? () => {} : undefined}>
          <AlertTitle>{p.severity}</AlertTitle>
          {p.children}
        </Alert>
      </div>
    ),
  },
  backdrop: {
    file: "backdrop.tsx",
    defaults: { open: false },
    controls: [{ name: "open", kind: "boolean" }],
    props: [
      ["open", "boolean", ""],
      ["onClick", "", "", ["点遮罩（通常用来关）", "click the overlay (usually to close)"]],
      ["children", "ReactNode", "", ["居中内容，例如 CircularProgress", "centered content, e.g. CircularProgress"]],
    ],
    code: () => `<Backdrop open={open} onClick={() => setOpen(false)}>\n  <CircularProgress />\n</Backdrop>`,
    Preview: ({ p, set }) => (
      <>
        <Button variant="outlined" onClick={() => set("open", true)}>
          Show backdrop
        </Button>
        <Backdrop open={p.open} onClick={() => set("open", false)}>
          <CircularProgress />
        </Backdrop>
      </>
    ),
  },
  dialog: {
    file: "dialog.tsx · native dialog",
    defaults: { open: false },
    controls: [{ name: "open", kind: "boolean" }],
    props: [
      ["open", "boolean", ""],
      ["onClose", "() => void", "", ["Esc / 点 backdrop", "Esc / click backdrop"]],
    ],
    code: () => `<Dialog open={open} onClose={close}>\n  <DialogTitle>Title</DialogTitle>\n  <DialogContent>\n    <DialogContentText>Body</DialogContentText>\n  </DialogContent>\n</Dialog>`,
    Preview: ({ p, set }) => (
      <>
        <Button variant="contained" onClick={() => set("open", true)}>
          Open dialog
        </Button>
        <Dialog open={p.open} onClose={() => set("open", false)}>
          <DialogTitle>Use location service?</DialogTitle>
          <DialogContent>
            <DialogContentText>Let the app determine your location. Native dialog, no Emotion.</DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={() => set("open", false)}>Disagree</Button>
            <Button variant="contained" onClick={() => set("open", false)}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    ),
  },
  progress: {
    file: "progress.tsx",
    defaults: { value: "40" },
    controls: [{ name: "value", kind: "text" }],
    props: [
      ["size", "number", "", ["默认 40", "default 40"]],
      ["value", "number", "", ["0–100 则为确定态，否则转圈", "0–100 = determinate, else spinning"]],
    ],
    code: (p) => `<CircularProgress />\n<CircularProgress value={${Number(p.value) || 0}} />\n<LinearProgress value={${Number(p.value) || 0}} />`,
    Preview: ({ p }) => {
      const n = Number(p.value);
      return (
        <div className="flex w-full max-w-sm items-center gap-4">
          <CircularProgress />
          <CircularProgress value={Number.isFinite(n) ? n : 40} />
          <div className="min-w-32 flex-1">
            <LinearProgress />
            <LinearProgress value={Number.isFinite(n) ? n : 40} className="mt-3" />
          </div>
        </div>
      );
    },
  },
  skeleton: {
    file: "progress.tsx",
    note: ['尺寸用 className（如 className="size-10"）。', 'Size via className (e.g. className="size-10").'],
    defaults: { variant: "text" },
    controls: [{ name: "variant", kind: "radio", options: ["text", "circular", "rectangular"] }],
    props: [["variant", '"text" | "circular" | "rectangular"', '"text"']],
    code: (p) => emit("Skeleton", { variant: p.variant }),
    Preview: ({ p }) =>
      p.variant === "circular" ? (
        <Skeleton variant="circular" className="size-10" />
      ) : p.variant === "rectangular" ? (
        <Skeleton variant="rectangular" className="h-16 w-48" />
      ) : (
        <div className="w-48">
          <Skeleton />
          <Skeleton className="mt-2 w-2/3" />
        </div>
      ),
  },
  snackbar: {
    file: "snackbar.tsx",
    defaults: { open: false, message: "Saved to drafts" },
    controls: [
      { name: "open", kind: "boolean" },
      { name: "message", kind: "text" },
    ],
    props: [
      ["open", "boolean", ""],
      ["onClose", "() => void", ""],
      ["message", "string", ""],
      ["autoHideDuration", "number", "4000"],
      ["action", "ReactNode", "", ["右侧按钮", "right-side button"]],
    ],
    code: (p) => `<Snackbar open={open} onClose={close} message="${p.message}" />`,
    Preview: ({ p, set }) => (
      <>
        <Button variant="text" onClick={() => set("open", true)}>
          Snackbar
        </Button>
        <Snackbar open={p.open} onClose={() => set("open", false)} message={p.message} />
      </>
    ),
  },
  accordion: {
    file: "accordion.tsx · native details",
    defaults: { title: "Expansion panel 1", defaultOpen: true },
    controls: [
      { name: "title", kind: "text" },
      { name: "defaultOpen", kind: "boolean" },
    ],
    props: [
      ["title", "ReactNode", ""],
      ["defaultOpen", "boolean", ""],
      ["children", "ReactNode", "", ["展开内容", "expanded content"]],
    ],
    code: (p) => `<Accordion title="${p.title}"${p.defaultOpen ? " defaultOpen" : ""}>\n  Hidden until opened.\n</Accordion>`,
    Preview: ({ p }) => (
      <div className="w-full max-w-md">
        <Accordion key={String(p.defaultOpen) + p.title} title={p.title} defaultOpen={p.defaultOpen}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <AccordionActions>
            <Button size="small">Cancel</Button>
            <Button size="small">Agree</Button>
          </AccordionActions>
        </Accordion>
      </div>
    ),
  },
  "app-bar": {
    file: "app-bar.tsx",
    note: [
      "Toolbar：dense 高 48px；默认 56px / sm 64px。disableGutters 去掉左右 padding。",
      "Toolbar: dense is 48px; default 56px / sm 64px. disableGutters removes horizontal padding.",
    ],
    defaults: { position: "static", color: "primary" },
    controls: [
      { name: "position", kind: "select", options: ["fixed", "sticky", "static", "relative"] },
      { name: "color", kind: "radio", options: ["primary", "default", "transparent"] },
    ],
    props: [
      ["position", '"fixed" | "sticky" | "static" | "relative"', '"static"'],
      ["color", '"primary" | "default" | "transparent"', '"primary"'],
    ],
    code: (p) => `<AppBar position="${p.position}" color="${p.color}">\n  <Toolbar>…</Toolbar>\n</AppBar>`,
    Preview: ({ p }) => (
      <div className="w-full overflow-hidden rounded-[var(--md-radius)] ring-1 ring-[var(--md-divider)]">
        <AppBar position={p.position === "fixed" || p.position === "sticky" ? "static" : p.position} color={p.color}>
          <Toolbar>
            <IconButton aria-label="menu" className="mr-2" style={{ color: "inherit" }}>
              <IconMenu />
            </IconButton>
            <Typography variant="h6" component="div" className="flex-1">
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    ),
  },
  card: {
    file: "card.tsx · Paper elevation 1",
    note: [
      "CardHeader：title / subheader。CardMedia：src 或 image。CardActionArea：整块可点。",
      "CardHeader: title / subheader. CardMedia: src or image. CardActionArea: the whole block is clickable.",
    ],
    defaults: {},
    controls: [],
    props: [],
    code: () => `<Card>\n  <CardHeader title="Title" subheader="September 14, 2016" />\n  <CardContent>Body</CardContent>\n  <CardActions>\n    <Button size="small">Share</Button>\n  </CardActions>\n</Card>`,
    Preview: () => (
      <Card className="w-72">
        <CardHeader title="Shrimp and Chorizo" subheader="September 14, 2016" />
        <CardMedia className="h-28 bg-[var(--md-primary)]" />
        <CardContent>This impressive paella is a perfect party dish.</CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn more</Button>
        </CardActions>
      </Card>
    ),
  },
  paper: {
    file: "paper.tsx",
    defaults: { elevation: "2", variant: "elevation" },
    controls: [
      { name: "elevation", kind: "select", options: ["0", "1", "2", "4", "8", "24"] },
      { name: "variant", kind: "radio", options: ["elevation", "outlined"] },
    ],
    props: [
      ["elevation", "0 | 1 | 2 | 4 | 8 | 24", "1"],
      ["variant", '"elevation" | "outlined"', '"elevation"'],
    ],
    code: (p) => emit("Paper", { elevation: Number(p.elevation), variant: p.variant }, "Paper"),
    Preview: ({ p }) => (
      <Paper elevation={Number(p.elevation) as 0 | 1 | 2 | 4 | 8 | 24} variant={p.variant} className="p-4">
        Paper elevation {p.elevation}
      </Paper>
    ),
  },
  "bottom-navigation": {
    file: "bottom-navigation.tsx",
    note: ["选中项主色，未选中 text.secondary。", "Selected item uses primary; unselected uses text.secondary."],
    defaults: { value: "recents" },
    controls: [{ name: "value", kind: "radio", options: ["recents", "favorites", "nearby"] }],
    props: [],
    code: (p) => `<BottomNavigation value="${p.value}" onChange={setNav}>\n  <BottomNavigationAction value="recents" label="Recents" icon={<Home />} />\n</BottomNavigation>`,
    Preview: ({ p, set }) => (
      <Paper elevation={1} className="w-full max-w-md overflow-hidden">
        <BottomNavigation value={p.value} onChange={(v) => set("value", v)}>
          <BottomNavigationAction value="recents" label="Recents" icon={<IconHome />} />
          <BottomNavigationAction value="favorites" label="Favorites" icon={<IconFav />} />
          <BottomNavigationAction value="nearby" label="Nearby" icon={<IconPerson />} />
        </BottomNavigation>
      </Paper>
    ),
  },
  breadcrumbs: {
    file: "breadcrumbs.tsx",
    note: ["子节点之间自动插入 chevron。", "Chevrons are inserted between children."],
    defaults: {},
    controls: [],
    props: [],
    code: () => `<Breadcrumbs>\n  <Link href="/">Home</Link>\n  <span>Here</span>\n</Breadcrumbs>`,
    Preview: () => (
      <Breadcrumbs>
        <Link href="/components">Home</Link>
        <Link href="/components">Catalog</Link>
        <span className="text-[var(--md-text)]">Tyres</span>
      </Breadcrumbs>
    ),
  },
  drawer: {
    file: "drawer.tsx · native dialog",
    note: ["Esc 或点 backdrop 关闭。不做 SwipeableDrawer 手势。", "Esc or backdrop closes. No SwipeableDrawer gestures."],
    defaults: { open: false, anchor: "left" },
    controls: [
      { name: "open", kind: "boolean" },
      { name: "anchor", kind: "radio", options: ["left", "right", "top", "bottom"] },
    ],
    props: [
      ["open", "boolean", ""],
      ["onClose", "() => void", ""],
      ["anchor", '"left" | "right" | "top" | "bottom"', '"left"'],
    ],
    code: (p) => `<Drawer open={open} onClose={close} anchor="${p.anchor}">…</Drawer>`,
    Preview: ({ p, set }) => (
      <>
        <Button variant="outlined" onClick={() => set("open", true)}>
          Open drawer
        </Button>
        <Drawer open={p.open} onClose={() => set("open", false)} anchor={p.anchor}>
          <div className="px-4 py-4 text-xl font-medium">Drawer</div>
          <Divider />
          <div className="px-4 py-4 text-[var(--md-text-secondary)]">Slide-in panel. Esc or backdrop closes.</div>
          <div className="px-2 py-2">
            <Button onClick={() => set("open", false)}>Close</Button>
          </div>
        </Drawer>
      </>
    ),
  },
  link: {
    file: "breadcrumbs.tsx",
    note: ["主色、默认无下划线、hover 有下划线。", "Primary color, no underline by default, underline on hover."],
    defaults: { children: "Jump to components" },
    controls: [{ name: "children", kind: "text" }],
    props: [
      ["href", "string", '"/"'],
      ["children", "ReactNode", ""],
    ],
    code: (p) => `<Link href="/components">${p.children}</Link>`,
    Preview: ({ p }) => <Link href="/components">{p.children}</Link>,
  },
  menu: {
    file: "menu.tsx",
    note: ["MenuItem 从 select.tsx 再导出。MenuList 是不定位的菜单列表。", "MenuItem is re-exported from select.tsx. MenuList is an unpositioned menu list."],
    defaults: {},
    controls: [],
    props: [
      ["open", "boolean", ""],
      ["anchor", "HTMLElement | null", ""],
      ["onClose", "() => void", ""],
    ],
    code: () => `<Menu open={!!el} anchor={el} onClose={() => setEl(null)}>\n  <MenuItem value="edit" onPick={() => setEl(null)}>Edit</MenuItem>\n</Menu>`,
    Preview: MenuPreview,
  },
  pagination: {
    file: "pagination.tsx",
    defaults: { page: 2 },
    controls: [],
    props: [
      ["count", "number", "", ["总页数", "page count"]],
      ["page", "number", "", ["当前页，从 1", "current page, 1-based"]],
      ["onChange", "(page: number) => void", ""],
    ],
    code: (p) => emit("Pagination", { count: 5, page: p.page }),
    Preview: ({ p, set }) => <Pagination count={5} page={p.page} onChange={(n) => set("page", n)} />,
  },
  "speed-dial": {
    file: "speed-dial.tsx",
    defaults: { open: false },
    controls: [{ name: "open", kind: "boolean" }],
    props: [],
    code: () => `<SpeedDial open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} icon={<Plus />}>\n  <SpeedDialAction icon={<Home />} tooltipTitle="Home" />\n</SpeedDial>`,
    Preview: ({ p, set }) => (
      <div className="flex h-52 items-end">
        <SpeedDial open={p.open} onOpen={() => set("open", true)} onClose={() => set("open", false)} icon={<IconPlus />}>
          <SpeedDialAction icon={<IconHome />} tooltipTitle="Home" onClick={() => set("open", false)} />
          <SpeedDialAction icon={<IconFav />} tooltipTitle="Fav" onClick={() => set("open", false)} />
        </SpeedDial>
      </div>
    ),
  },
  stepper: {
    file: "stepper.tsx",
    defaults: { activeStep: "1" },
    controls: [{ name: "activeStep", kind: "radio", options: ["0", "1", "2"] }],
    props: [],
    code: (p) => `<Stepper activeStep={${p.activeStep}}>\n  <Step>Select</Step>\n  <Step>Create</Step>\n  <Step>Done</Step>\n</Stepper>`,
    Preview: ({ p, set }) => (
      <div className="w-full">
        <Stepper activeStep={Number(p.activeStep)}>
          <Step>Select</Step>
          <Step>Create</Step>
          <Step>Done</Step>
        </Stepper>
        <div className="mt-4 flex gap-3">
          <Button disabled={p.activeStep === "0"} onClick={() => set("activeStep", String(Number(p.activeStep) - 1))}>
            Back
          </Button>
          <Button variant="contained" disabled={p.activeStep === "2"} onClick={() => set("activeStep", String(Number(p.activeStep) + 1))}>
            Next
          </Button>
        </div>
      </div>
    ),
  },
  "mobile-stepper": {
    file: "mobile-stepper.tsx",
    defaults: { variant: "dots", activeStep: 0 },
    controls: [{ name: "variant", kind: "radio", options: ["dots", "text", "progress"] }],
    props: [
      ["steps", "number", ""],
      ["activeStep", "number", ""],
      ["variant", '"dots" | "text" | "progress"', '"dots"'],
      ["nextButton / backButton", "ReactNode", ""],
    ],
    code: (p) => emit("MobileStepper", { steps: 3, activeStep: p.activeStep, variant: p.variant }),
    Preview: ({ p, set }) => (
      <div className="w-full max-w-md">
        <MobileStepper
          steps={3}
          activeStep={p.activeStep}
          variant={p.variant}
          nextButton={
            <Button size="small" disabled={p.activeStep >= 2} onClick={() => set("activeStep", p.activeStep + 1)}>
              Next
            </Button>
          }
          backButton={
            <Button size="small" disabled={p.activeStep === 0} onClick={() => set("activeStep", p.activeStep - 1)}>
              Back
            </Button>
          }
        />
      </div>
    ),
  },
  tabs: {
    file: "tabs.tsx",
    note: ["指示条宽度/位置跟 MUI 一样用 transform。", "Indicator width/position use transform, same as MUI."],
    defaults: { value: "one" },
    controls: [{ name: "value", kind: "radio", options: ["one", "two", "three"] }],
    props: [],
    code: (p) => `<Tabs value="${p.value}" onChange={setTab}>\n  <Tab value="one" label="Item one" />\n</Tabs>`,
    Preview: ({ p, set }) => (
      <div className="w-full">
        <Tabs value={p.value} onChange={(v) => set("value", v)}>
          <Tab value="one" label="Item one" />
          <Tab value="two" label="Item two" />
          <Tab value="three" label="Item three" />
        </Tabs>
        <p className="mb-0 mt-4 text-[var(--md-text-secondary)]">Panel: {p.value}</p>
      </div>
    ),
  },
  container: {
    file: "container.tsx",
    note: ["宽度对标 MUI：xs 444、sm 600、md 900、lg 1200、xl 1536。", "Widths match MUI: xs 444, sm 600, md 900, lg 1200, xl 1536."],
    defaults: { maxWidth: "xs", disableGutters: false },
    controls: [
      { name: "maxWidth", kind: "select", options: ["xs", "sm", "md", "lg", "xl"] },
      { name: "disableGutters", kind: "boolean" },
    ],
    props: [
      ["maxWidth", '"xs" | "sm" | "md" | "lg" | "xl" | false', '"lg"'],
      ["disableGutters", "boolean", "", ["去掉 16/24px padding", "drop 16/24px padding"]],
    ],
    code: (p) => emit("Container", p, "Content"),
    Preview: ({ p }) => (
      <Container maxWidth={p.maxWidth} disableGutters={p.disableGutters} className="bg-[var(--md-action-hover)] py-2 text-center text-xs">
        Container maxWidth={p.maxWidth}
      </Container>
    ),
  },
  "image-list": {
    file: "image-list.tsx",
    note: ["标准 CSS grid，不做 masonry。", "Standard CSS grid. No masonry."],
    defaults: { cols: "3" },
    controls: [{ name: "cols", kind: "radio", options: ["2", "3"] }],
    props: [
      ["cols", "number", "2"],
      ["gap", "number", "4"],
      ["rowHeight", 'number | "auto"', "180"],
    ],
    code: (p) => `<ImageList cols={${p.cols}} gap={8} rowHeight={100}>\n  <ImageListItem>…</ImageListItem>\n</ImageList>`,
    Preview: ({ p }) => (
      <ImageList cols={Number(p.cols)} gap={8} rowHeight={100} className="w-72">
        {["#1976d2", "#9c27b0", "#2e7d32"].map((c) => (
          <ImageListItem key={c} rowHeight={100}>
            <div className="size-full" style={{ background: c }} />
            <ImageListItemBar title={c} />
          </ImageListItem>
        ))}
      </ImageList>
    ),
  },
  "click-away": {
    file: "popover.tsx · ClickAwayListener",
    defaults: {},
    controls: [],
    props: [
      ["onClickAway", "() => void", ""],
      ["children", "ReactNode", ""],
    ],
    code: () => `<ClickAwayListener onClickAway={() => setOpen(false)}>\n  <div>{children}</div>\n</ClickAwayListener>`,
    Preview: ClickAwayPreview,
  },
  modal: {
    file: "modal.tsx · native dialog, no Dialog Paper chrome",
    note: ["点 backdrop 关闭。需要标题栏/按钮用 Dialog。", "Click backdrop to close. Use Dialog if you need a title bar / buttons."],
    defaults: { open: false },
    controls: [{ name: "open", kind: "boolean" }],
    props: [
      ["open", "boolean", ""],
      ["onClose", "() => void", ""],
      ["children", "ReactNode", "", ["通常包 Paper elevation={24}", "usually wrap Paper elevation={24}"]],
    ],
    code: () => `<Modal open={open} onClose={close}>\n  <Paper elevation={24} className="p-6">…</Paper>\n</Modal>`,
    Preview: ({ p, set }) => (
      <>
        <Button variant="outlined" onClick={() => set("open", true)}>
          Open modal
        </Button>
        <Modal open={p.open} onClose={() => set("open", false)}>
          <Paper elevation={24} className="p-6">
            <Typography variant="h6" gutterBottom>
              Modal
            </Typography>
            <Typography variant="body2" color="secondary">
              Native dialog, no paper chrome from Dialog.
            </Typography>
            <Button className="mt-4" variant="contained" onClick={() => set("open", false)}>
              Close
            </Button>
          </Paper>
        </Modal>
      </>
    ),
  },
  popover: {
    file: "popover.tsx",
    note: ["Menu 是它的列表特化。", "Menu is a list-specialized Popover."],
    defaults: {},
    controls: [],
    props: [
      ["open", "boolean", ""],
      ["anchor", "HTMLElement | null", ""],
      ["onClose", "", "", ["Esc / 点外面", "Esc / click outside"]],
      ["children", "ReactNode", "", ["任意内容，锚点下方 8px", "any content, 8px below the anchor"]],
    ],
    code: () => `<Popover open={!!el} anchor={el} onClose={() => setEl(null)}>\n  <div className="px-4 py-3">Content</div>\n</Popover>`,
    Preview: PopoverPreview,
  },
  transitions: {
    file: "collapse.tsx",
    note: ["都接收 in: boolean 和 children。", "All take in: boolean and children."],
    defaults: { in: true },
    controls: [{ name: "in", kind: "boolean" }],
    propsHead: [
      ["组件", "Component"],
      ["行为", "Behavior"],
    ],
    props: [
      ["Collapse", "height 0fr → 1fr (CSS grid)", ""],
      ["Fade", "opacity", ""],
      ["Grow", "scale 0.75 → 1 + opacity", ""],
      ["Zoom", "scale 0 → 1", ""],
      ["Slide", 'direction?: "up" | "down" | "left" | "right"', ""],
    ],
    code: (p) => `<Collapse in={${p.in}}>\n  <Paper className="p-4">Collapse</Paper>\n</Collapse>`,
    Preview: ({ p, set }) => (
      <div className="w-full max-w-sm">
        <Button onClick={() => set("in", !p.in)}>{p.in ? "Hide" : "Show"}</Button>
        <div className="mt-4">
          <Collapse in={p.in}>
            <Paper className="p-4">Collapse uses CSS grid 0fr/1fr.</Paper>
          </Collapse>
          <Fade in={p.in}>
            <Paper className="mt-2 p-4">Fade</Paper>
          </Fade>
          <Grow in={p.in}>
            <Paper className="mt-2 p-4">Grow</Paper>
          </Grow>
          <Zoom in={p.in}>
            <Paper className="mt-2 inline-block p-4">Zoom</Paper>
          </Zoom>
          <div className="mt-2 overflow-hidden">
            <Slide in={p.in} direction="up">
              <Paper className="p-4">Slide up</Paper>
            </Slide>
          </div>
        </div>
      </div>
    ),
  },
};
