import { useState } from "react";
import { Button } from "../components/button";
import { ButtonGroup } from "../components/button-group";
import { Checkbox } from "../components/checkbox";
import { Fab } from "../components/fab";
import { FormControl, FormGroup, FormHelperText, FormLabel } from "../components/form";
import { FormControlLabel } from "../components/form-control-label";
import { IconButton } from "../components/icon-button";
import { NativeSelect } from "../components/native-select";
import { Radio, RadioGroup } from "../components/radio";
import { Rating } from "../components/rating";
import { MenuItem, Select } from "../components/select";
import { Slider } from "../components/slider";
import { Switch } from "../components/switch";
import { TextField } from "../components/text-field";
import { ToggleButton, ToggleButtonGroup } from "../components/toggle-button";
import { TransferList } from "../components/transfer-list";
import { Api, Code, Demo, Doc, IconClose, IconPlus, IconSearch, Page, Row } from "../docs-ui";
import { useT } from "../locale";

export function InputsPage() {
  const t = useT();
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(true);
  const [plan, setPlan] = useState("pro");
  const [city, setCity] = useState("kl");
  const [stars, setStars] = useState(3);
  const [vol, setVol] = useState(40);
  const [fruit, setFruit] = useState("apple");
  const [align, setAlign] = useState("left");
  const [left, setLeft] = useState(["React", "Vue", "Svelte"]);
  const [right, setRight] = useState(["Angular"]);

  return (
    <Page
      title="Inputs"
      lead={t("源码在 src/components/。每个组件都接受 className。不做 Autocomplete。", "Source lives in src/components/. Every component takes className. No Autocomplete.")}
    >
      <Doc id="button" title="Button" file="button.tsx">
        <Demo>
          <Row>
            <Button variant="contained">Contained</Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Row>
          <div className="mt-4">
            <Row>
              <Button variant="contained" size="small">
                Small
              </Button>
              <Button variant="contained" size="medium">
                Medium
              </Button>
              <Button variant="contained" size="large">
                Large
              </Button>
              <Button variant="contained" startIcon={<IconPlus />}>
                Start icon
              </Button>
              <Button variant="outlined" className="w-40">
                className
              </Button>
            </Row>
          </div>
        </Demo>
        <Code>{`<Button variant="contained" color="primary">Save</Button>`}</Code>
        <Api
          rows={[
            ["children", "ReactNode", "", t("组件内容。", "The content of the component.")],
            ["variant", '"text" | "outlined" | "contained"', '"text"', t("使用的变体。", "The variant to use.")],
            ["color", '"primary" | "error" | "inherit"', '"primary"', t("组件颜色。", "The color of the component.")],
            ["size", '"small" | "medium" | "large"', '"medium"', t("组件尺寸。", "The size of the component.")],
            ["fullWidth", "boolean", "false", t("为 true 时占满父容器宽度。", "If true, the button takes the full width of its container.")],
            ["startIcon / endIcon", "ReactNode", "", t("起止图标。", "Icons before or after the label.")],
            ["disabled", "boolean", "false", t("为 true 时禁用。", "If true, the component is disabled.")],
            ["className", "string", "", t("覆盖根节点样式。", "Override styles on the root.")],
          ]}
        />
      </Doc>

      <Doc id="icon-button" title="Icon Button" file="icon-button.tsx">
        <Demo>
          <Row>
            <IconButton aria-label="add" color="primary">
              <IconPlus />
            </IconButton>
            <IconButton aria-label="close">
              <IconClose />
            </IconButton>
          </Row>
        </Demo>
        <Code>{`<IconButton aria-label="add" color="primary"><Plus /></IconButton>`}</Code>
        <Api
          rows={[
            ["aria-label", "string", t("必填", "required")],
            ["color", '"primary" | "error" | "inherit"', '"inherit"'],
            ["size", '"small" | "medium" | "large"', '"medium"'],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("medium 热区 40px，必须 aria-label。", "medium hit area is 40px; aria-label is required.")}
        </p>
      </Doc>

      <Doc id="button-group" title="Button Group" file="button-group.tsx">
        <Demo>
          <ButtonGroup variant="contained">
            <Button variant="contained">One</Button>
            <Button variant="contained">Two</Button>
            <Button variant="contained">Three</Button>
          </ButtonGroup>
        </Demo>
        <Code>{`<ButtonGroup variant="contained">
  <Button variant="contained">One</Button>
  <Button variant="contained">Two</Button>
</ButtonGroup>`}</Code>
        <Api rows={[["variant", '"contained" | "outlined" | "text"', '"outlined"']]} />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("子节点必须是 Button。用子选择器切圆角、共用边框。", "Children must be Button. Child selectors clip corners and share the border.")}
        </p>
      </Doc>

      <Doc id="checkbox" title="Checkbox" file="checkbox.tsx · FormControlLabel">
        <Demo>
          <Row>
            <FormControlLabel
              control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
              label="Agree"
            />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
            <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
            <FormControlLabel control={<Checkbox disabled />} disabled label="Disabled" />
          </Row>
          <FormGroup row className="mt-3">
            <FormControlLabel control={<Checkbox defaultChecked />} label="One" />
            <FormControlLabel control={<Checkbox />} label="Two" />
          </FormGroup>
        </Demo>
        <Api
          rows={[
            ["checked", "boolean", t("受控", "controlled")],
            ["indeterminate", "boolean", t("横杠态", "dash state")],
            ["disabled", "boolean", ""],
            ["size", '"medium" | "small"', ""],
            ["onChange", "(e: { target: { checked: boolean } }) => void", ""],
          ]}
        />
      </Doc>

      <Doc id="fab" title="Floating Action Button" file="fab.tsx">
        <Demo>
          <Row>
            <Fab aria-label="add">
              <IconPlus />
            </Fab>
            <Fab variant="extended">
              <span className="mr-2 inline-flex [&>svg]:size-6">
                <IconPlus />
              </span>
              Create
            </Fab>
            <Fab color="error" size="small" aria-label="delete">
              <IconClose />
            </Fab>
          </Row>
        </Demo>
        <Api
          rows={[
            ["variant", '"circular" | "extended"', '"circular"'],
            ["color", '"primary" | "error" | "inherit"', '"primary"'],
            ["size", '"small" | "medium" | "large"', '"medium"'],
          ]}
        />
      </Doc>

      <Doc id="radio-group" title="Radio Group" file="radio.tsx">
        <Demo>
          <RadioGroup value={plan} onChange={setPlan} row>
            <FormControlLabel control={<Radio value="free" />} label="Free" />
            <FormControlLabel control={<Radio value="pro" />} label="Pro" />
            <FormControlLabel control={<Radio value="team" />} label="Team" />
          </RadioGroup>
        </Demo>
        <Code>{`<RadioGroup value={plan} onChange={setPlan} row>
  <FormControlLabel control={<Radio value="free" />} label="Free" />
</RadioGroup>`}</Code>
        <Api
          rows={[
            ["value", "string", t("当前值", "current value")],
            ["onChange", "(value: string) => void", ""],
            ["row", "boolean", t("横排", "horizontal")],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("Radio 的 value 必填。FormControlLabel：control + label。", "Radio value is required. FormControlLabel: control + label.")}
        </p>
      </Doc>

      <Doc id="rating" title="Rating" file="rating.tsx">
        <Demo>
          <Rating value={stars} onChange={setStars} />
        </Demo>
        <Api
          rows={[
            ["value", "number", t("必填", "required")],
            ["onChange", "(value: number) => void", ""],
            ["max", "number", "5"],
            ["readOnly", "boolean", ""],
            ["size", '"small" | "medium" | "large"', '"medium"'],
          ]}
        />
      </Doc>

      <Doc id="select" title="Select" file="select.tsx">
        <Demo>
          <Select label="City" value={city} onChange={setCity} fullWidth>
            <MenuItem value="kl">Kuala Lumpur</MenuItem>
            <MenuItem value="pg">Penang</MenuItem>
            <MenuItem value="jb">Johor Bahru</MenuItem>
          </Select>
        </Demo>
        <Code>{`<Select label="City" value={city} onChange={setCity}>
  <MenuItem value="kl">Kuala Lumpur</MenuItem>
</Select>`}</Code>
        <Api
          rows={[
            ["label", "string", ""],
            ["value", "string", ""],
            ["onChange", "(value: string) => void", ""],
            ["fullWidth / disabled", "boolean", ""],
          ]}
        />
      </Doc>

      <Doc id="native-select" title="Native Select" file="native-select.tsx">
        <Demo>
          <FormControl>
            <FormLabel>Fruit</FormLabel>
            <NativeSelect value={fruit} onChange={(e) => setFruit(e.target.value)}>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
            </NativeSelect>
            <FormHelperText>Native select, MUI underline.</FormHelperText>
          </FormControl>
        </Demo>
        <Code>{`<NativeSelect value={fruit} onChange={(e) => setFruit(e.target.value)}>
  <option value="apple">Apple</option>
</NativeSelect>`}</Code>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("原生 select 加 MUI 下划线。", "Native select with the MUI underline.")}
        </p>
      </Doc>

      <Doc id="slider" title="Slider" file="slider.tsx · input type=range">
        <Demo>
          <div className="max-w-xs">
            <Slider value={vol} onChange={setVol} />
          </div>
        </Demo>
        <Api
          rows={[
            ["value", "number", "0"],
            ["min / max", "number", "0 / 100"],
            ["onChange", "(value: number) => void", ""],
          ]}
        />
      </Doc>

      <Doc id="switch" title="Switch" file="switch.tsx">
        <Demo>
          <Row>
            <FormControlLabel
              control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />}
              label="On"
            />
            <FormControlLabel
              control={<Switch checked={off} onChange={(e) => setOff(e.target.checked)} />}
              label="Off"
            />
          </Row>
        </Demo>
        <Api
          rows={[
            ["checked", "boolean", ""],
            ["onChange", "(e: { target: { checked: boolean } }) => void", ""],
            ["disabled / size", t("同 Checkbox", "same as Checkbox"), ""],
          ]}
        />
      </Doc>

      <Doc id="text-field" title="Text Field" file="text-field.tsx">
        <Demo>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Email" />
            <TextField label="Search" startAdornment={<IconSearch />} />
            <TextField
              label="Controlled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={email ? `${email.length} chars` : "Type to shrink the label"}
            />
            <TextField label="Error" error helperText="Required" defaultValue="bad" />
            <TextField label="Notes" multiline minRows={3} fullWidth className="sm:col-span-2" />
          </div>
        </Demo>
        <Code>{`<TextField label="Email" error helperText="Required" />
<TextField label="Notes" multiline minRows={3} />
<TextField label="Search" startAdornment={<Icon />} />`}</Code>
        <Api
          rows={[
            ["label", "string", t("必填", "required")],
            ["variant", '"outlined" | "filled"', '"outlined"'],
            ["size", '"medium" | "small"', '"medium"'],
            ["error / disabled / fullWidth / multiline", "boolean", ""],
            ["helperText", "string", ""],
            ["minRows", "number", "3"],
            ["startAdornment / endAdornment", "ReactNode", ""],
          ]}
        />
      </Doc>

      <Doc id="form-control" title="Form Control" file="form.tsx">
        <Demo>
          <FormControl>
            <FormLabel>Fruit</FormLabel>
            <NativeSelect value={fruit} onChange={(e) => setFruit(e.target.value)}>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
            </NativeSelect>
            <FormHelperText>Helper text under the field.</FormHelperText>
          </FormControl>
        </Demo>
        <Code>{`<FormControl>
  <FormLabel>Fruit</FormLabel>
  <NativeSelect>...</NativeSelect>
  <FormHelperText>Hint</FormHelperText>
</FormControl>`}</Code>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t(
            "FormControl / FormGroup / FormLabel / FormHelperText。FormControlLabel 在 form-control-label.tsx，见 Checkbox、Radio。",
            "FormControl / FormGroup / FormLabel / FormHelperText. FormControlLabel is in form-control-label.tsx — see Checkbox and Radio.",
          )}
        </p>
      </Doc>

      <Doc id="transfer-list" title="Transfer List" file="transfer-list.tsx">
        <Demo>
          <TransferList
            left={left}
            right={right}
            onChange={(l, r) => {
              setLeft(l);
              setRight(r);
            }}
          />
        </Demo>
        <Api
          rows={[
            ["left / right", "string[]", ""],
            ["onChange", "(left: string[], right: string[]) => void", ""],
          ]}
        />
      </Doc>

      <Doc id="toggle-button" title="Toggle Button" file="toggle-button.tsx · exclusive">
        <Demo>
          <ToggleButtonGroup value={align} onChange={setAlign}>
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        </Demo>
        <Code>{`<ToggleButtonGroup value={align} onChange={setAlign}>
  <ToggleButton value="left">Left</ToggleButton>
</ToggleButtonGroup>`}</Code>
        <Api
          head={[t("组件", "Component"), "Prop", t("类型", "Type")]}
          rows={[
            ["ToggleButtonGroup", "value / onChange", "string / (value: string) => void"],
            ["ToggleButton", "value", "string"],
          ]}
        />
      </Doc>
    </Page>
  );
}
