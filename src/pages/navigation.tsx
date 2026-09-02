import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "../components/bottom-navigation";
import { Breadcrumbs, Link } from "../components/breadcrumbs";
import { Button } from "../components/button";
import { Divider } from "../components/divider";
import { Drawer } from "../components/drawer";
import { Menu } from "../components/menu";
import { MobileStepper } from "../components/mobile-stepper";
import { Pagination } from "../components/pagination";
import { Paper } from "../components/paper";
import { MenuItem } from "../components/select";
import { SpeedDial, SpeedDialAction } from "../components/speed-dial";
import { Step, Stepper } from "../components/stepper";
import { Tab, Tabs } from "../components/tabs";
import { Api, Code, Demo, Doc, IconFav, IconHome, IconPerson, IconPlus, Page, Row } from "../docs-ui";
import { useT } from "../locale";

export function NavigationPage() {
  const t = useT();
  const [nav, setNav] = useState("recents");
  const [drawer, setDrawer] = useState(false);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const [page, setPage] = useState(2);
  const [dial, setDial] = useState(false);
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState(0);
  const [tab, setTab] = useState("one");

  return (
    <Page title="Navigation">
      <Doc id="bottom-navigation" title="Bottom Navigation" file="bottom-navigation.tsx">
        <Demo>
          <Paper elevation={1} className="overflow-hidden">
            <BottomNavigation value={nav} onChange={setNav}>
              <BottomNavigationAction value="recents" label="Recents" icon={<IconHome />} />
              <BottomNavigationAction value="favorites" label="Favorites" icon={<IconFav />} />
              <BottomNavigationAction value="nearby" label="Nearby" icon={<IconPerson />} />
            </BottomNavigation>
          </Paper>
        </Demo>
        <Code>{`<BottomNavigation value={nav} onChange={setNav}>
  <BottomNavigationAction value="recents" label="Recents" icon={<Home />} />
</BottomNavigation>`}</Code>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("选中项主色，未选中 text.secondary。", "Selected item uses primary; unselected uses text.secondary.")}
        </p>
      </Doc>

      <Doc id="breadcrumbs" title="Breadcrumbs" file="breadcrumbs.tsx">
        <Demo>
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Catalog</Link>
            <span className="text-[var(--md-text)]">Tyres</span>
          </Breadcrumbs>
        </Demo>
        <Code>{`<Breadcrumbs>
  <Link href="/">Home</Link>
  <span>Here</span>
</Breadcrumbs>`}</Code>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("子节点之间自动插入 chevron。", "Chevrons are inserted between children.")}
        </p>
      </Doc>

      <Doc id="drawer" title="Drawer" file={t("drawer.tsx · 原生 dialog", "drawer.tsx · native dialog")}>
        <Demo>
          <Button variant="outlined" onClick={() => setDrawer(true)}>
            Open drawer
          </Button>
        </Demo>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["onClose", "() => void", ""],
            ["anchor", '"left" | "right" | "top" | "bottom"', '"left"'],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("Esc 或点 backdrop 关闭。不做 SwipeableDrawer 手势。", "Esc or backdrop closes. No SwipeableDrawer gestures.")}
        </p>
        <Drawer open={drawer} onClose={() => setDrawer(false)}>
          <div className="px-4 py-4 text-xl font-medium">Drawer</div>
          <Divider />
          <div className="px-4 py-4 text-[var(--md-text-secondary)]">Slide-in panel. Esc or backdrop closes.</div>
          <div className="px-2 py-2">
            <Button onClick={() => setDrawer(false)}>Close</Button>
          </div>
        </Drawer>
      </Doc>

      <Doc id="link" title="Link" file="breadcrumbs.tsx">
        <Demo>
          <Link href="/inputs">Jump to Inputs</Link>
        </Demo>
        <Api
          rows={[
            ["href", "string", '"/"'],
            ["children", "ReactNode", ""],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("主色、默认无下划线、hover 有下划线。", "Primary color, no underline by default, underline on hover.")}
        </p>
      </Doc>

      <Doc id="menu" title="Menu" file="menu.tsx">
        <Demo>
          <Button variant="outlined" onClick={(e) => setMenuEl(menuEl ? null : e.currentTarget)}>
            Open menu
          </Button>
          <Menu open={!!menuEl} anchor={menuEl} onClose={() => setMenuEl(null)}>
            <MenuItem value="edit" onPick={() => setMenuEl(null)}>
              Edit
            </MenuItem>
            <MenuItem value="dup" onPick={() => setMenuEl(null)}>
              Duplicate
            </MenuItem>
            <MenuItem value="del" onPick={() => setMenuEl(null)}>
              Delete
            </MenuItem>
          </Menu>
        </Demo>
        <Code>{`<Menu open={!!el} anchor={el} onClose={() => setEl(null)}>
  <MenuItem value="edit" onPick={() => setEl(null)}>Edit</MenuItem>
</Menu>`}</Code>
        <Api
          rows={[
            ["open", "boolean", ""],
            ["anchor", "HTMLElement | null", ""],
            ["onClose", "() => void", ""],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("MenuItem 从 select.tsx 再导出。MenuList 是不定位的菜单列表。", "MenuItem is re-exported from select.tsx. MenuList is an unpositioned menu list.")}
        </p>
      </Doc>

      <Doc id="pagination" title="Pagination" file="pagination.tsx">
        <Demo>
          <Pagination count={5} page={page} onChange={setPage} />
        </Demo>
        <Api
          rows={[
            ["count", t("number 总页数", "number — page count"), ""],
            ["page", t("number 当前页，从 1", "number — current page, 1-based"), ""],
            ["onChange", "(page: number) => void", ""],
          ]}
        />
      </Doc>

      <Doc id="speed-dial" title="Speed Dial" file="speed-dial.tsx">
        <Demo>
          <div className="flex h-52 items-end">
            <SpeedDial open={dial} onOpen={() => setDial(true)} onClose={() => setDial(false)} icon={<IconPlus />}>
              <SpeedDialAction icon={<IconHome />} tooltipTitle="Home" onClick={() => setDial(false)} />
              <SpeedDialAction icon={<IconFav />} tooltipTitle="Fav" onClick={() => setDial(false)} />
            </SpeedDial>
          </div>
        </Demo>
        <Code>{`<SpeedDial open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} icon={<Plus />}>
  <SpeedDialAction icon={<Home />} tooltipTitle="Home" onClick={...} />
</SpeedDial>`}</Code>
      </Doc>

      <Doc id="stepper" title="Stepper" file="stepper.tsx">
        <Demo>
          <Stepper activeStep={step}>
            <Step>Select</Step>
            <Step>Create</Step>
            <Step>Done</Step>
          </Stepper>
          <div className="mt-4">
            <Row>
              <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </Button>
              <Button variant="contained" disabled={step >= 2} onClick={() => setStep(step + 1)}>
                Next
              </Button>
            </Row>
          </div>
        </Demo>
        <Code>{`<Stepper activeStep={1}>
  <Step>Select</Step>
  <Step>Create</Step>
  <Step>Done</Step>
</Stepper>`}</Code>
      </Doc>

      <Doc id="mobile-stepper" title="Mobile Stepper" file="mobile-stepper.tsx">
        <Demo>
          <MobileStepper
            steps={3}
            activeStep={mobile}
            nextButton={
              <Button size="small" disabled={mobile >= 2} onClick={() => setMobile(mobile + 1)}>
                Next
              </Button>
            }
            backButton={
              <Button size="small" disabled={mobile === 0} onClick={() => setMobile(mobile - 1)}>
                Back
              </Button>
            }
          />
        </Demo>
        <Api
          rows={[
            ["steps", "number", ""],
            ["activeStep", "number", ""],
            ["variant", '"dots" | "text" | "progress"', '"dots"'],
            ["nextButton / backButton", "ReactNode", ""],
          ]}
        />
      </Doc>

      <Doc id="tabs" title="Tabs" file="tabs.tsx">
        <Demo>
          <Tabs value={tab} onChange={setTab}>
            <Tab value="one" label="Item one" />
            <Tab value="two" label="Item two" />
            <Tab value="three" label="Item three" />
          </Tabs>
          <p className="mb-0 mt-4 text-[var(--md-text-secondary)]">Panel: {tab}</p>
        </Demo>
        <Code>{`<Tabs value={tab} onChange={setTab}>
  <Tab value="one" label="Item one" />
</Tabs>`}</Code>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("指示条宽度/位置跟 MUI 一样用 transform。", "Indicator width/position use transform, same as MUI.")}
        </p>
      </Doc>
    </Page>
  );
}
