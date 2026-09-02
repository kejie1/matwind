import { Container } from "../components/container";
import { ImageList, ImageListItem, ImageListItemBar } from "../components/image-list";
import { Api, Code, Demo, Doc, Page } from "../docs-ui";
import { useT } from "../locale";

export function LayoutPage() {
  const t = useT();
  return (
    <Page title="Layout" lead={t("Box / Grid / Stack 不做：用 Tailwind flex / grid / gap。", "No Box / Grid / Stack: use Tailwind flex / grid / gap.")}>
      <Doc id="container" title="Container" file="container.tsx">
        <Demo>
          <Container maxWidth="xs" className="bg-[var(--md-action-hover)] py-2 text-center text-xs">
            Container maxWidth=xs
          </Container>
        </Demo>
        <Api
          rows={[
            ["maxWidth", '"xs" | "sm" | "md" | "lg" | "xl" | false', '"lg"'],
            ["disableGutters", "boolean", t("去掉 16/24px padding", "drop 16/24px padding")],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("宽度对标 MUI：xs 444、sm 600、md 900、lg 1200、xl 1536。", "Widths match MUI: xs 444, sm 600, md 900, lg 1200, xl 1536.")}
        </p>
      </Doc>

      <Doc id="image-list" title="Image List" file="image-list.tsx">
        <Demo>
          <ImageList cols={3} gap={8} rowHeight={100} className="w-72">
            {["#1976d2", "#9c27b0", "#2e7d32"].map((c) => (
              <ImageListItem key={c} rowHeight={100}>
                <div className="size-full" style={{ background: c }} />
                <ImageListItemBar title={c} />
              </ImageListItem>
            ))}
          </ImageList>
        </Demo>
        <Code>{`<ImageList cols={3} gap={8} rowHeight={180}>
  <ImageListItem>
    <img src="..." alt="" />
    <ImageListItemBar title="Title" subtitle="Author" />
  </ImageListItem>
</ImageList>`}</Code>
        <Api
          rows={[
            ["cols", "number", "2"],
            ["gap", "number", "4"],
            ["rowHeight", 'number | "auto"', "180"],
          ]}
        />
        <p className="mb-0 mt-3 text-sm text-[var(--md-text-secondary)]">
          {t("标准 CSS grid，不做 masonry。", "Standard CSS grid. No masonry.")}
        </p>
      </Doc>
    </Page>
  );
}
