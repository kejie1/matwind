import { useState } from "react";
import { Avatar, AvatarGroup, Badge } from "../components/avatar";
import { Chip } from "../components/chip";
import { Divider } from "../components/divider";
import { IconButton } from "../components/icon-button";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "../components/list";
import { Paper } from "../components/paper";
import { SvgIcon } from "../components/svg-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "../components/table";
import { Tooltip } from "../components/tooltip";
import { Typography } from "../components/typography";
import { Api, Code, Demo, Doc, IconClose, IconHome, IconSearch, Page, Row } from "../docs-ui";
import { useT } from "../locale";

export function DataDisplayPage() {
  const t = useT();
  const [chips, setChips] = useState(["React", "Tailwind"]);
  const [tblPage, setTblPage] = useState(0);

  return (
    <Page title="Data display">
      <Doc id="avatar" title="Avatar" file="avatar.tsx">
        <Demo>
          <Row>
            <Avatar>R</Avatar>
            <Avatar>B</Avatar>
            <AvatarGroup max={3}>
              <Avatar>OP</Avatar>
              <Avatar>J</Avatar>
              <Avatar>K</Avatar>
              <Avatar>L</Avatar>
            </AvatarGroup>
          </Row>
        </Demo>
        <Api
          rows={[
            ["src / alt", "string", t("有 src 就显示图片", "image if src is set")],
            ["size", "number", "40"],
            ["children", "ReactNode", t("字母", "initials")],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("AvatarGroup：max 默认 5，超出显示 +N。", "AvatarGroup: max defaults to 5; overflow shows +N.")}
        </p>
      </Doc>

      <Doc id="badge" title="Badge" file="avatar.tsx">
        <Demo>
          <Row>
            <Badge badgeContent={4}>
              <Avatar>R</Avatar>
            </Badge>
            <Badge variant="dot" color="primary">
              <Avatar>B</Avatar>
            </Badge>
          </Row>
        </Demo>
        <Api
          rows={[
            ["badgeContent", "ReactNode", ""],
            ["color", '"error" | "primary"', '"error"'],
            ["variant", '"standard" | "dot"', '"standard"'],
            ["max", "number", "99"],
          ]}
        />
      </Doc>

      <Doc id="chip" title="Chip" file="chip.tsx">
        <Demo>
          <Row>
            <Chip>Filled</Chip>
            <Chip variant="outlined">Outlined</Chip>
            <Chip color="primary">Primary</Chip>
            <Chip onClick={() => {}}>Clickable</Chip>
            {chips.map((c) => (
              <Chip key={c} onDelete={() => setChips(chips.filter((x) => x !== c))}>
                {c}
              </Chip>
            ))}
          </Row>
        </Demo>
        <Api
          rows={[
            ["variant", '"filled" | "outlined"', '"filled"'],
            ["size", '"medium" | "small"', '"medium"'],
            ["color", '"default" | "primary"', ""],
            ["onClick", "handler", t("有则 clickable + ripple", "if set: clickable + ripple")],
            ["onDelete", "() => void", t("删除叉", "delete ×")],
            ["icon", "ReactNode", t("左侧图标", "left icon")],
          ]}
        />
      </Doc>

      <Doc id="divider" title="Divider" file="divider.tsx">
        <Demo>
          <Divider>middle</Divider>
        </Demo>
        <Api
          rows={[
            ["orientation", '"horizontal" | "vertical"', ""],
            ["children", "ReactNode", t("有则中间文字、两边线", "text in the middle, lines on both sides")],
            ["flexItem", "boolean", t("垂直时随 flex 拉伸", "stretch with flex when vertical")],
          ]}
        />
      </Doc>

      <Doc id="icons" title="Icons" file="svg-icon.tsx">
        <Demo>
          <Row>
            <SvgIcon color="primary">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
            <SvgIcon color="secondary" fontSize="large">
              <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
            </SvgIcon>
          </Row>
        </Demo>
        <Code>{`<SvgIcon color="primary">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
</SvgIcon>`}</Code>
        <Api
          rows={[
            ["color", '"inherit" | "primary" | "secondary" | "error" | "action" | "disabled"', '"inherit"'],
            ["fontSize", '"inherit" | "small" | "medium" | "large"', '"medium"'],
            ["viewBox", "string", '"0 0 24 24"'],
          ]}
        />
      </Doc>

      <Doc id="list" title="List" file="list.tsx">
        <Demo>
          <Paper variant="outlined">
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
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </List>
          </Paper>
        </Demo>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t(
            "List → ul。ListItem 静态行；ListItemButton 可点 + ripple。ListItemText：primary / secondary。ListItemButton 有 selected。",
            "List → ul. ListItem is a static row; ListItemButton is clickable + ripple. ListItemText: primary / secondary. ListItemButton has selected.",
          )}
        </p>
      </Doc>

      <Doc id="table" title="Table" file="table.tsx">
        <Demo>
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
          <TablePagination count={13} page={tblPage} rowsPerPage={5} onPageChange={setTblPage} />
        </Demo>
        <Api
          head={[t("组件", "Component"), t("关键 props", "Key props")]}
          rows={[
            ["TableRow", "hover, selected"],
            ["TableCell", t('align?: "left" | "right" | "center"（Head 里自动 th）', 'align?: "left" | "right" | "center" (th inside Head)')],
            ["TableSortLabel", "active, direction, onClick"],
            ["TablePagination", "count, page, rowsPerPage, onPageChange"],
          ]}
        />
      </Doc>

      <Doc id="tooltip" title="Tooltip" file="tooltip.tsx">
        <Demo>
          <Row>
            <Tooltip title="Close">
              <IconButton aria-label="close">
                <IconClose />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bottom" placement="bottom">
              <IconButton aria-label="search">
                <IconSearch />
              </IconButton>
            </Tooltip>
          </Row>
        </Demo>
        <Api
          rows={[
            ["title", "string", t("必填", "required")],
            ["placement", '"top" | "bottom" | "left" | "right"', '"top"'],
            ["children", "ReactNode", t("触发器", "trigger")],
          ]}
        />
      </Doc>

      <Doc id="typography" title="Typography" file="typography.tsx">
        <Demo>
          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>
          <Typography variant="subtitle1" color="secondary" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet.
          </Typography>
          <Typography variant="body2">body2. Used for dense supporting text. Override with className.</Typography>
        </Demo>
        <Api
          rows={[
            ["variant", "h1–h6 / subtitle1 / subtitle2 / body1 / body2 / button / caption / overline", '"body1"'],
            ["component", "string", t("按 variant 映射标签", "maps to a tag from variant")],
            ["gutterBottom", "boolean", t("下边距 0.35em", "bottom margin 0.35em")],
            ["color", '"primary" | "secondary" | "error" | "inherit"', ""],
          ]}
        />
      </Doc>
    </Page>
  );
}
