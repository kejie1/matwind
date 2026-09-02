import type { ReactNode } from "react";
import { Api, Code, CopyButton, Page } from "../docs-ui";
import { REPO } from "../repo";
import { useLang, useT } from "../locale";
import { formatBundle, KERNEL, sources } from "../sources";

function H2({ children }: { children: ReactNode }) {
  return <h2 className="doc-h2">{children}</h2>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="doc-p">{children}</p>;
}

function Ul({ children }: { children: ReactNode }) {
  return <ul className="doc-ul">{children}</ul>;
}

function Pager({
  prev,
  next,
}: {
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}) {
  return (
    <nav className="doc-pager">
      {prev ? <a href={prev.href}>← {prev.title}</a> : <span />}
      {next ? <a href={next.href}>{next.title} →</a> : <span />}
    </nav>
  );
}

export function IntroPage() {
  const t = useT();
  const lang = useLang();
  return (
    <Page
      title={t("简介", "Introduction")}
      lead={t(
        "开源的 Material 2 组件，MIT 许可。像 shadcn 一样拷文件进仓库；本仓库同时是文档站。",
        "Open-source Material 2 components, MIT licensed. Copy files into your repo like shadcn — this repo is also the docs site.",
      )}
    >
      <H2>{t("这是什么", "What this is")}</H2>
      {lang === "zh" ? (
        <P>
          Material Kit 是一个开源仓库：皮肤对齐 <code className="font-mono text-[13px]">@mui/material</code> 9.3.1 的{" "}
          <strong className="font-medium text-[var(--doc-ink)]">default light</strong>（Material 2）。组件是普通 React + Tailwind
          className，源文件在 <code className="font-mono text-[13px]">src/components/</code>。克隆仓库，或把文件拷进你的项目，文件归你改。
        </P>
      ) : (
        <P>
          Material Kit is an open-source repo. Skin matches <code className="font-mono text-[13px]">@mui/material</code> 9.3.1{" "}
          <strong className="font-medium text-[var(--doc-ink)]">default light</strong> (Material 2). Components are plain React +
          Tailwind className. Source lives in <code className="font-mono text-[13px]">src/components/</code>. Clone it, or copy
          files into your project — they're yours to edit.
        </P>
      )}
      <P>
        {t(
          "许可是 MIT。每个组件一页 Demo、一段用法、一份可复制的源码。Issue 和 PR 去 GitHub。",
          "The license is MIT. Each component has a demo, usage, and copyable source. Issues and PRs go to GitHub.",
        )}{" "}
        <a href={REPO} className="doc-link" target="_blank" rel="noreferrer">
          github.com/kejie1/Material-Kit
        </a>
        。
      </P>

      <H2>{t("和 MUI、shadcn 的差别", "Vs MUI and shadcn")}</H2>
      <Api
        head={["", t("本 kit", "This kit"), "MUI", "shadcn/ui"]}
        rows={[
          [t("安装", "Install"), t("拷文件", "Copy files"), "npm @mui/material", t("拷文件", "Copy files")],
          [t("样式", "Style"), "className + CSS " + t("变量", "variables"), "Emotion / sx", "className + CSS " + t("变量", "variables")],
          [t("皮肤", "Skin"), "MUI default light", t("你选的 theme", "Your theme"), t("你选的 theme", "Your theme")],
          [t("依赖", "Deps"), "React + Tailwind", "Emotion、@mui/*", "Radix + Tailwind"],
          [t("覆盖", "Override"), "className；" + t("动态值用", "dynamic values via") + " style", "sx / styled", "className"],
        ]}
      />

      <H2>{t("你不会做的事", "What you won't do")}</H2>
      <Ul>
        <li>
          {t("不", "Don't")} <code className="font-mono text-[13px]">npm install @mui/material</code>
          {t("。Demo 的 ", ". The demo's ")}
          <code className="font-mono text-[13px]">npm install</code>
          {t(" 只装 React、Vite、Tailwind，用来跑这个文档站。", " only installs React, Vite, and Tailwind to run this docs site.")}
        </li>
        <li>
          {t("不写 ", "Don't write ")}
          <code className="font-mono text-[13px]">sx</code>
          {t("，不用 Emotion，不引入 ", ", don't use Emotion, don't import ")}
          <code className="font-mono text-[13px]">@mui/*</code>
          {t(" 或 Radix。", " or Radix.")}
        </li>
        <li>
          {t("不用 Box / Grid / Stack：布局用 Tailwind 的 ", "No Box / Grid / Stack: layout with Tailwind ")}
          <code className="font-mono text-[13px]">flex</code> / <code className="font-mono text-[13px]">grid</code>。
        </li>
        <li>{t("不做 Autocomplete、DatePicker、DataGrid、dark mode。", "No Autocomplete, DatePicker, DataGrid, or dark mode.")}</li>
      </Ul>

      <H2>{t("下一步", "Next")}</H2>
      <P>
        {t("接到项目看 ", "To wire it into a project see ")}
        <a href="/docs/installation" className="doc-link">
          {t("安装", "Installation")}
        </a>
        {t("。拷组件的完整步骤在 ", ". Full copy steps are in ")}
        <a href="/docs/usage" className="doc-link">
          {t("用法", "Usage")}
        </a>
        {t("。改颜色看 ", ". Colors: ")}
        <a href="/docs/theming" className="doc-link">
          {t("主题", "Theming")}
        </a>
        {t("。组件目录在 ", ". Catalog: ")}
        <a href="/components" className="doc-link">
          {t("组件", "Components")}
        </a>
        。
      </P>
      <Pager next={{ href: "/docs/installation", title: t("安装", "Installation") }} />
    </Page>
  );
}

export function InstallPage() {
  const t = useT();
  const lang = useLang();
  return (
    <Page
      title={t("安装", "Installation")}
      lead={t(
        "克隆本仓库跑文档站，或把 token 和组件拷进已有的 React + Tailwind v4 项目。",
        "Clone this repo to run the docs, or copy tokens and components into an existing React + Tailwind v4 app.",
      )}
    >
      <H2>{t("跑文档站", "Run the docs site")}</H2>
      <P>{t("克隆后在仓库里：", "After cloning:")}</P>
      <div className="mt-4">
        <Code label="terminal">{`git clone https://github.com/kejie1/Material-Kit.git
cd Material-Kit
npm install
npm run dev`}</Code>
      </div>
      {lang === "zh" ? (
        <P>
          打开 <code className="font-mono text-[13px]">http://localhost:5177/</code>。首页是介绍，侧栏 Docs 是手册，Components
          是组件目录。
        </P>
      ) : (
        <P>
          Open <code className="font-mono text-[13px]">http://localhost:5177/</code>. Home is the intro, the Docs sidebar is the
          handbook, Components is the catalog.
        </P>
      )}

      <H2>{t("接到已有项目", "Into an existing project")}</H2>
      <P>
        {t(
          "项目需要已经能跑 React 18 和 Tailwind CSS v4。没有 Tailwind 的话，先按官方文档加上，再继续。",
          "The project already needs React 18 and Tailwind CSS v4. If you don't have Tailwind, add it from the official docs first.",
        )}
      </P>
      {lang === "zh" ? (
        <P>
          Tailwind v4 在入口 CSS 里写 <code className="font-mono text-[13px]">@import "tailwindcss"</code>，不要再配一份
          Tailwind v3 的 <code className="font-mono text-[13px]">tailwind.config.js</code> 才用本 kit。
        </P>
      ) : (
        <P>
          Tailwind v4 goes in your entry CSS as <code className="font-mono text-[13px]">@import "tailwindcss"</code>. Don't add a
          Tailwind v3 <code className="font-mono text-[13px]">tailwind.config.js</code> just to use this kit.
        </P>
      )}

      <H2>{t("1. 拷 CSS（只拷一次）", "1. Copy CSS (once)")}</H2>
      {lang === "zh" ? (
        <P>
          拷 <code className="font-mono text-[13px]">src/material.css</code> 到你的项目，在入口 CSS 里{" "}
          <code className="font-mono text-[13px]">@import "./material.css"</code>。里面是全部{" "}
          <code className="font-mono text-[13px]">--md-*</code> 和组件用的{" "}
          <code className="font-mono text-[13px]">.md-*</code>。不要拷文档站的{" "}
          <code className="font-mono text-[13px]">index.css</code>。
        </P>
      ) : (
        <P>
          Copy <code className="font-mono text-[13px]">src/material.css</code> into your project and{" "}
          <code className="font-mono text-[13px]">@import "./material.css"</code> in the entry CSS. It has every{" "}
          <code className="font-mono text-[13px]">--md-*</code> token and the{" "}
          <code className="font-mono text-[13px]">.md-*</code> helpers. Don't copy the docs site's{" "}
          <code className="font-mono text-[13px]">index.css</code>.
        </P>
      )}
      <div className="mt-3">
        <CopyButton
          text={sources["material.css"]}
          label={t("复制 material.css", "Copy material.css")}
          className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-solid border-[var(--doc-line)] px-2.5 text-[13px] text-[var(--md-primary)] hover:bg-[var(--doc-hover)]"
        />
      </div>
      {lang === "zh" ? (
        <P>
          字体：<code className="font-mono text-[13px]">index.html</code> 里有 Roboto 的 Google Fonts link。你也可以自己托管。
        </P>
      ) : (
        <P>
          Fonts: <code className="font-mono text-[13px]">index.html</code> has the Roboto Google Fonts link. You can self-host.
        </P>
      )}

      <H2>{t("2. 拷共享核（只拷一次）", "2. Copy the shared kernel (once)")}</H2>
      {lang === "zh" ? (
        <P>
          几乎所有组件都依赖这三份：<code className="font-mono text-[13px]">cn.ts</code>、
          <code className="font-mono text-[13px]">ripple.ts</code>、
          <code className="font-mono text-[13px]">ripple.tsx</code>。不要再加 class 工具库或 ripple 封装，拷过就复用。
        </P>
      ) : (
        <P>
          Almost every component depends on these three: <code className="font-mono text-[13px]">cn.ts</code>,{" "}
          <code className="font-mono text-[13px]">ripple.ts</code>, <code className="font-mono text-[13px]">ripple.tsx</code>.
          Don't add another class helper or ripple wrapper — copy once and reuse.
        </P>
      )}
      <div className="mt-3">
        <CopyButton
          text={formatBundle([...KERNEL])}
          label={t("复制共享核", "Copy kernel")}
          className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-solid border-[var(--doc-line)] px-2.5 text-[13px] text-[var(--md-primary)] hover:bg-[var(--doc-hover)]"
        />
      </div>
      {lang === "zh" ? (
        <P>
          剪贴板里按 <code className="font-mono text-[13px]">// ===== 文件名 =====</code> 拆成三个文件。
        </P>
      ) : (
        <P>
          Split the clipboard on <code className="font-mono text-[13px]">// ===== filename =====</code> into three files.
        </P>
      )}

      <H2>{t("3. 推荐目录", "3. Suggested folders")}</H2>
      <P>{t("保持和本仓库相同的相对路径，就不用改 import：", "Keep the same relative paths as this repo so imports don't change:")}</P>
      <div className="mt-4">
        <Code label="your-app">{`src/
  material.css
  components/
    button.tsx
    ripple.tsx
    …
  lib/
    cn.ts
    ripple.ts`}</Code>
      </div>
      {lang === "zh" ? (
        <P>
          组件里写的是 <code className="font-mono text-[13px]">from "../lib/cn"</code> 和{" "}
          <code className="font-mono text-[13px]">from "./ripple"</code>。你要换目录，改这两处即可，不要加新的依赖去「解决」路径。
        </P>
      ) : (
        <P>
          Components import <code className="font-mono text-[13px]">from "../lib/cn"</code> and{" "}
          <code className="font-mono text-[13px]">from "./ripple"</code>. If you move folders, change those two lines — don't add
          a dependency to "fix" the path.
        </P>
      )}

      <H2>{t("4. 拷第一个组件", "4. Copy the first component")}</H2>
      {lang === "zh" ? (
        <P>
          打开{" "}
          <a href="/inputs/button" className="doc-link">
            Button
          </a>
          ，到源码区点复制全部，按文件名拆开放进{" "}
          <code className="font-mono text-[13px]">src/components/</code>
          。cn / ripple 上一步已经拷过。细节在{" "}
          <a href="/docs/usage" className="doc-link">
            {t("用法", "Usage")}
          </a>
          。
        </P>
      ) : (
        <P>
          Open{" "}
          <a href="/inputs/button" className="doc-link">
            Button
          </a>
          , copy all from Source, and split files into{" "}
          <code className="font-mono text-[13px]">src/components/</code>. cn / ripple were copied in the previous step. Details
          in{" "}
          <a href="/docs/usage" className="doc-link">
            Usage
          </a>
          .
        </P>
      )}
      <Pager prev={{ href: "/docs", title: t("简介", "Introduction") }} next={{ href: "/docs/usage", title: t("用法", "Usage") }} />
    </Page>
  );
}

export function UsagePage() {
  const t = useT();
  const lang = useLang();
  return (
    <Page
      title={t("用法", "Usage")}
      lead={t(
        "从打开文档到组件在你仓库里能跑。本页是完整手册，组件页只给 Demo 和 API。",
        "From opening the docs to the component running in your repo. This is the handbook; component pages only show demo and API.",
      )}
    >
      <H2>{t("工作流", "Workflow")}</H2>
      <P>{t("每个组件一页：", "Each component is its own page:")}</P>
      <Ul>
        <li>
          <strong className="font-medium text-[var(--doc-ink)]">{t("交互预览", "Interactive preview")}</strong>
          {t(" — 右侧改 props，左侧实时更新，下面是生成的用法。", " — change props on the right, the live instance updates, with a generated snippet below.")}
        </li>
        <li>
          <strong className="font-medium text-[var(--doc-ink)]">{t("源码", "Source")}</strong>
          {t(" — 该文件的完整 ", " — the full ")}
          <code className="font-mono text-[13px]">.tsx</code>
          {t("。点复制全部拿走该组件文件（不含 cn / ripple）；右上角复制只拷当前这份。", ". Copy all takes this component (not cn / ripple); the top-right copy is this file only.")}
        </li>
      </Ul>
      <P>{t("步骤：", "Steps:")}</P>
      <ol className="doc-ol">
        <li>{t("侧栏进分类，点组件标题（例如 /inputs/button）。", "Pick a category in the sidebar, then a component (for example /inputs/button).")}</li>
        <li>{t("先在预览里试 variant / color / 受控写法。", "Try variant / color / controlled API in the preview first.")}</li>
        <li>
          {lang === "zh" ? (
            <>
              到源码区点复制全部。剪贴板按 <code className="font-mono text-[13px]">// ===== 文件名 =====</code>{" "}
              拆开贴。cn.ts / ripple 在安装时已经拷过，这里不会带上。
            </>
          ) : (
            <>
              Copy all from Source. Split the clipboard on{" "}
              <code className="font-mono text-[13px]">// ===== filename =====</code>. cn.ts / ripple were copied during
              Installation and are not included.
            </>
          )}
        </li>
        <li>{t("按 Installation 的目录贴进项目。主文件名保持原样，import 才不用改。", "Paste into the Installation folders. Keep filenames so imports don't change.")}</li>
        <li>{t("在页面里按 Demo 那样 import 和使用。", "Import and use it the way the demo does.")}</li>
      </ol>

      <H2>{t("第一个 Button", "First Button")}</H2>
      <div className="mt-4">
        <Code label="App.tsx">{`import { Button } from "./components/button";

export function SaveBar() {
  return (
    <Button variant="contained" className="w-40">
      Save
    </Button>
  );
}`}</Code>
      </div>
      {lang === "zh" ? (
        <P>
          <code className="font-mono text-[13px]">variant</code> 是 <code className="font-mono text-[13px]">text</code> /{" "}
          <code className="font-mono text-[13px]">outlined</code> / <code className="font-mono text-[13px]">contained</code>
          。<code className="font-mono text-[13px]">color</code> 是 <code className="font-mono text-[13px]">primary</code> /{" "}
          <code className="font-mono text-[13px]">error</code> / <code className="font-mono text-[13px]">inherit</code>。其余 props
          跟原生 <code className="font-mono text-[13px]">button</code> 一样（<code className="font-mono text-[13px]">disabled</code>、
          <code className="font-mono text-[13px]">onClick</code>、<code className="font-mono text-[13px]">type</code>）。
        </P>
      ) : (
        <P>
          <code className="font-mono text-[13px]">variant</code> is <code className="font-mono text-[13px]">text</code> /{" "}
          <code className="font-mono text-[13px]">outlined</code> / <code className="font-mono text-[13px]">contained</code>.{" "}
          <code className="font-mono text-[13px]">color</code> is <code className="font-mono text-[13px]">primary</code> /{" "}
          <code className="font-mono text-[13px]">error</code> / <code className="font-mono text-[13px]">inherit</code>. Other
          props match a native <code className="font-mono text-[13px]">button</code> (
          <code className="font-mono text-[13px]">disabled</code>, <code className="font-mono text-[13px]">onClick</code>,{" "}
          <code className="font-mono text-[13px]">type</code>).
        </P>
      )}

      <H2>className {t("和", "and")} style</H2>
      <P>
        {t(
          "每个组件都把 className 拼到根节点上。静态外观用 Tailwind / 你的 class；运行时才知道的像素用 style。",
          "Every component merges className onto the root. Static looks use Tailwind / your classes; pixels you only know at runtime use style.",
        )}
      </P>
      <div className="mt-4">
        <Code>{`<Button className="w-40" style={{ marginTop: offset }}>
  Save
</Button>`}</Code>
      </div>
      <P>
        {t("不要发明 ", "Don't invent ")}
        <code className="font-mono text-[13px]">sx</code>
        {t("。颜色、圆角、阴影走 CSS 变量，见 ", ". Color, radius, and shadow are CSS variables. See ")}
        <a href="/docs/theming" className="doc-link">
          {t("主题", "Theming")}
        </a>
        。
      </P>

      <H2>CSS</H2>
      {lang === "zh" ? (
        <P>
          只拷 <code className="font-mono text-[13px]">material.css</code> 一次。组件用{" "}
          <code className="font-mono text-[13px]">var(--md-primary)</code> 和里面的{" "}
          <code className="font-mono text-[13px]">.md-*</code>
          。漏这份文件，页面能编译但长得不对。
        </P>
      ) : (
        <P>
          Copy <code className="font-mono text-[13px]">material.css</code> once. Components use{" "}
          <code className="font-mono text-[13px]">var(--md-primary)</code> and the{" "}
          <code className="font-mono text-[13px]">.md-*</code> helpers. Skip this file and the page compiles but looks wrong.
        </P>
      )}

      <H2>{t("受控组件", "Controlled components")}</H2>
      <P>
        {t(
          "表单类组件跟 React 常规受控写法一样：你持有 state，通过 value / checked + onChange 传进去。Demo 里的例子就是你该抄的用法，不要在组件文件里加全局 store。",
          "Form components are normal React controlled inputs: you own state and pass value / checked + onChange. Copy the demo. Don't add a global store inside the component file.",
        )}
      </P>
      <div className="mt-4">
        <Code>{`const [email, setEmail] = useState("");

<TextField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`}</Code>
      </div>

      <H2>{t("布局", "Layout")}</H2>
      <P>{t("没有 Box、Grid、Stack。用 Tailwind：", "No Box, Grid, or Stack. Use Tailwind:")}</P>
      <div className="mt-4">
        <Code>{`<div className="flex flex-wrap items-center gap-3">
  <Button variant="contained">Save</Button>
  <Button variant="outlined">Cancel</Button>
</div>

<div className="grid gap-4 md:grid-cols-2">
  <TextField label="First" />
  <TextField label="Last" />
</div>`}</Code>
      </div>
      <P>
        {t("页面宽度可以用 ", "Page width: use ")}
        <a href="/layout/container" className="doc-link">
          Container
        </a>
        {t("，或自己写 ", ", or write your own ")}
        <code className="font-mono text-[13px]">max-w-*</code>。
      </P>

      <H2>{t("图标", "Icons")}</H2>
      {lang === "zh" ? (
        <P>
          没有打包 Material Icons 字体。需要图标时，拷{" "}
          <a href="/data-display/icons" className="doc-link">
            SvgIcon
          </a>{" "}
          或直接内联 24×24 SVG（viewBox=&quot;0 0 24 24&quot;），和 MUI 图标路径兼容。
        </P>
      ) : (
        <P>
          No Material Icons font is bundled. Copy{" "}
          <a href="/data-display/icons" className="doc-link">
            SvgIcon
          </a>{" "}
          or inline a 24×24 SVG (viewBox=&quot;0 0 24 24&quot;). Paths match MUI icons.
        </P>
      )}

      <H2>{t("本 kit 不做", "Out of scope")}</H2>
      <Ul>
        <li>Autocomplete、DatePicker、DataGrid</li>
        <li>Box、Grid、Stack</li>
        <li>dark mode / ColorScheme</li>
        <li>{t("把这套组件发成 npm 包再让业务去 install", "Publishing this as an npm package for apps to install")}</li>
      </Ul>
      <P>
        {t("侧栏划线的名字是为了和 ", "Struck-through sidebar names match the ")}
        <a href="https://mui.com/material-ui/all-components/" className="doc-link">
          {t("MUI 目录", "MUI catalog")}
        </a>
        {t(" 对齐，不是待办。", ". They are not a todo list.")}
      </P>
      <Pager prev={{ href: "/docs/installation", title: t("安装", "Installation") }} next={{ href: "/docs/theming", title: t("主题", "Theming") }} />
    </Page>
  );
}

export function ThemingPage() {
  const t = useT();
  const lang = useLang();
  return (
    <Page
      title={t("主题", "Theming")}
      lead={t("主题是 src/material.css 里的 --md-*。改一处，所有已拷组件跟着变。", "The theme is --md-* in src/material.css. Change it once; every copied component follows.")}
    >
      <H2>{t("怎么改", "How to change it")}</H2>
      {lang === "zh" ? (
        <P>
          打开 <code className="font-mono text-[13px]">material.css</code> 的{" "}
          <code className="font-mono text-[13px]">:root</code>，改变量值。不要在每个组件里写死{" "}
          <code className="font-mono text-[13px]">#1976d2</code>。
        </P>
      ) : (
        <P>
          Open <code className="font-mono text-[13px]">:root</code> in{" "}
          <code className="font-mono text-[13px]">material.css</code> and change the values. Don't hardcode{" "}
          <code className="font-mono text-[13px]">#1976d2</code> in each component.
        </P>
      )}
      <div className="mt-4">
        <Code label="material.css">{`:root {
  --md-primary: #1976d2;
  --md-primary-dark: #1565c0;
  --md-primary-contrast: #fff;
  --md-error: #d32f2e;
  --md-radius: 4px;
}`}</Code>
      </div>
      {lang === "zh" ? (
        <P>
          主色一改，Button contained、outlined 边框、TextField focus、Tab 指示条都会走{" "}
          <code className="font-mono text-[13px]">var(--md-primary)</code>。
        </P>
      ) : (
        <P>
          Change the primary color and contained Button, outlined borders, TextField focus, and the Tab indicator all use{" "}
          <code className="font-mono text-[13px]">var(--md-primary)</code>.
        </P>
      )}

      <H2>{t("常用 token", "Common tokens")}</H2>
      <Api
        head={[t("变量", "Variable"), t("用途", "Use")]}
        rows={[
          ["--md-primary / -dark / -contrast", t("主色、按下去的主色、主色上的字", "Primary, pressed, contrast text")],
          ["--md-error / -dark / -contrast", t("错误色", "Error")],
          ["--md-text / -secondary / -disabled", t("正文、次要、禁用字色", "Body, secondary, disabled text")],
          ["--md-divider", t("分割线、边框", "Dividers and borders")],
          ["--md-action-hover / -disabled / -disabled-bg", t("悬停层、禁用", "Hover overlay, disabled")],
          ["--md-radius", t("默认圆角 4px（MUI 默认）", "Default radius 4px (MUI default)")],
          ["--md-elev-2 / -4 / -8 / …", t("contained 按钮和 Paper 的阴影", "Contained button and Paper shadows")],
          ["--md-duration-short / --md-ease", t("过渡时长和曲线", "Duration and easing")],
        ]}
      />

      <H2>{t("字号和字体", "Type size and font")}</H2>
      {lang === "zh" ? (
        <P>
          组件用 Tailwind 字号（<code className="font-mono text-[13px]">text-sm</code> 等）对齐 MUI 的 px。用{" "}
          <code className="font-mono text-[13px]">.kit</code> 包一层会套 Roboto。换字体改{" "}
          <code className="font-mono text-[13px]">.kit</code> 的 font-family 和你加载的 font-face，不要在单个 Button 上设
          font-family，除非你就要那一个例外。
        </P>
      ) : (
        <P>
          Components use Tailwind type sizes (<code className="font-mono text-[13px]">text-sm</code> and so on) to match MUI px.
          Wrap with <code className="font-mono text-[13px]">.kit</code> for Roboto. To change the font, edit{" "}
          <code className="font-mono text-[13px]">.kit</code> font-family and the face you load — don't set font-family on a
          single Button unless that one is the exception.
        </P>
      )}

      <H2>{t("动态值仍用 style", "Dynamic values still use style")}</H2>
      <P>
        {t(
          "主题管调色板。Slider 宽度、Dialog 最大高度这类实例值继续走 style，不要为此新增 CSS 变量。",
          "The theme is the palette. Instance values like Slider width or Dialog max-height stay on style — don't add a CSS variable for a one-off.",
        )}
      </P>
      <div className="mt-4">
        <Code>{`<div className="w-[var(--md-whatever)]">  {/* don't add a token for one width */}
<Paper style={{ maxWidth: 480 }}>OK</Paper>`}</Code>
      </div>

      <H2>{t("没有 dark mode", "No dark mode")}</H2>
      {lang === "zh" ? (
        <P>
          不提供 <code className="font-mono text-[13px]">.dark</code> 一套变量。你要暗色就自己加一组 token 并改根节点 class，这是你的主题，不是本
          kit 的范围。
        </P>
      ) : (
        <P>
          There is no <code className="font-mono text-[13px]">.dark</code> token set. If you want dark, add your own tokens and
          a root class — that's your theme, not this kit.
        </P>
      )}
      <Pager prev={{ href: "/docs/usage", title: t("用法", "Usage") }} next={{ href: "/components", title: t("组件", "Components") }} />
    </Page>
  );
}
