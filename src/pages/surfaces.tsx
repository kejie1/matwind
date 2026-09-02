import { Accordion, AccordionActions } from "../components/accordion";
import { AppBar, Toolbar } from "../components/app-bar";
import { Button } from "../components/button";
import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia } from "../components/card";
import { IconButton } from "../components/icon-button";
import { Paper } from "../components/paper";
import { Typography } from "../components/typography";
import { Api, Code, Demo, Doc, IconMenu, Page } from "../docs-ui";
import { useT } from "../locale";

export function SurfacesPage() {
  const t = useT();
  return (
    <Page title="Surfaces">
      <Doc id="accordion" title="Accordion" file={t("accordion.tsx · 原生 details", "accordion.tsx · native details")}>
        <Demo>
          <Accordion title="Expansion panel 1" defaultOpen>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Accordion>
          <Accordion title="Expansion panel 2">Hidden until opened.</Accordion>
          <Accordion title="With actions" className="mt-4">
            Details here.
            <AccordionActions>
              <Button size="small">Cancel</Button>
              <Button size="small">Agree</Button>
            </AccordionActions>
          </Accordion>
        </Demo>
        <Code>{`<Accordion title="Panel" defaultOpen>
  Hidden until opened.
  <AccordionActions>
    <Button size="small">Agree</Button>
  </AccordionActions>
</Accordion>`}</Code>
        <Api
          rows={[
            ["title", "ReactNode", ""],
            ["defaultOpen", "boolean", ""],
            ["children", t("展开内容", "expanded content"), ""],
          ]}
        />
      </Doc>

      <Doc id="app-bar" title="App Bar" file="app-bar.tsx">
        <Demo>
          <AppBar position="static">
            <Toolbar>
              <IconButton aria-label="menu" className="mr-2" style={{ color: "#fff" }}>
                <IconMenu />
              </IconButton>
              <Typography variant="h6" component="div" className="flex-1">
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Demo>
        <Code>{`<AppBar position="static">
  <Toolbar>
    <Typography variant="h6" component="div" className="flex-1">News</Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>`}</Code>
        <Api
          rows={[
            ["position", '"fixed" | "sticky" | "static" | "relative"', '"static"'],
            ["color", '"primary" | "default" | "transparent"', '"primary"'],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t(
            "Toolbar：dense 高 48px；默认 56px / sm 64px。disableGutters 去掉左右 padding。",
            "Toolbar: dense is 48px; default 56px / sm 64px. disableGutters removes horizontal padding.",
          )}
        </p>
      </Doc>

      <Doc id="card" title="Card" file="card.tsx · Paper elevation 1">
        <Demo>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader title="Shrimp and Chorizo" subheader="September 14, 2016" />
              <CardContent>This impressive paella is a perfect party dish.</CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn more</Button>
              </CardActions>
            </Card>
            <Card>
              <CardActionArea>
                <CardMedia className="h-28 bg-[var(--md-primary)]" />
                <CardContent>
                  <Typography variant="h6">CardActionArea</Typography>
                  <Typography variant="body2" color="secondary">
                    Clickable surface.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Demo>
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t(
            "CardHeader：title / subheader。CardMedia：src 或 image。CardActionArea：整块可点。",
            "CardHeader: title / subheader. CardMedia: src or image. CardActionArea: the whole block is clickable.",
          )}
        </p>
      </Doc>

      <Doc id="paper" title="Paper" file="paper.tsx">
        <Demo>
          <Paper elevation={2} className="p-4">
            Paper elevation 2
          </Paper>
        </Demo>
        <Api
          rows={[
            ["elevation", "0 | 1 | 2 | 4 | 8 | 24", "1"],
            ["variant", '"elevation" | "outlined"', '"elevation"'],
          ]}
        />
      </Doc>
    </Page>
  );
}
