export type CatalogItem = {
  id: string;
  title: string;
  file?: string;
  skip?: boolean;
};

export type CatalogGroup = {
  id: string;
  title: string;
  items: CatalogItem[];
};

export function hrefOf(groupId: string, itemId?: string) {
  return itemId ? `/${groupId}#${itemId}` : `/${groupId}`;
}

export function liveItems() {
  return catalog.flatMap((g) => g.items.filter((i) => !i.skip).map((i) => ({ ...i, group: g })));
}

export const docsNav: { href: string; title: string }[] = [
  { href: "/docs", title: "Introduction" },
  { href: "/docs/installation", title: "Installation" },
  { href: "/docs/usage", title: "Usage" },
  { href: "/docs/theming", title: "Theming" },
];

/** Same groups as https://mui.com/material-ui/all-components/ */
export const catalog: CatalogGroup[] = [
  {
    id: "inputs",
    title: "Inputs",
    items: [
      { id: "autocomplete", title: "Autocomplete", skip: true },
      { id: "button", title: "Button", file: "button.tsx" },
      { id: "icon-button", title: "Icon Button", file: "icon-button.tsx" },
      { id: "button-group", title: "Button Group", file: "button-group.tsx" },
      { id: "checkbox", title: "Checkbox", file: "checkbox.tsx" },
      { id: "fab", title: "Floating Action Button", file: "fab.tsx" },
      { id: "radio-group", title: "Radio Group", file: "radio.tsx" },
      { id: "rating", title: "Rating", file: "rating.tsx" },
      { id: "select", title: "Select", file: "select.tsx" },
      { id: "native-select", title: "Native Select", file: "native-select.tsx" },
      { id: "slider", title: "Slider", file: "slider.tsx" },
      { id: "switch", title: "Switch", file: "switch.tsx" },
      { id: "text-field", title: "Text Field", file: "text-field.tsx" },
      { id: "form-control", title: "Form Control", file: "form.tsx" },
      { id: "transfer-list", title: "Transfer List", file: "transfer-list.tsx" },
      { id: "toggle-button", title: "Toggle Button", file: "toggle-button.tsx" },
    ],
  },
  {
    id: "data-display",
    title: "Data display",
    items: [
      { id: "avatar", title: "Avatar", file: "avatar.tsx" },
      { id: "badge", title: "Badge", file: "avatar.tsx" },
      { id: "chip", title: "Chip", file: "chip.tsx" },
      { id: "divider", title: "Divider", file: "divider.tsx" },
      { id: "icons", title: "Icons", file: "svg-icon.tsx" },
      { id: "list", title: "List", file: "list.tsx" },
      { id: "table", title: "Table", file: "table.tsx" },
      { id: "tooltip", title: "Tooltip", file: "tooltip.tsx" },
      { id: "typography", title: "Typography", file: "typography.tsx" },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    items: [
      { id: "alert", title: "Alert", file: "alert.tsx" },
      { id: "backdrop", title: "Backdrop", file: "backdrop.tsx" },
      { id: "dialog", title: "Dialog", file: "dialog.tsx" },
      { id: "progress", title: "Progress", file: "progress.tsx" },
      { id: "skeleton", title: "Skeleton", file: "progress.tsx" },
      { id: "snackbar", title: "Snackbar", file: "snackbar.tsx" },
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces",
    items: [
      { id: "accordion", title: "Accordion", file: "accordion.tsx" },
      { id: "app-bar", title: "App Bar", file: "app-bar.tsx" },
      { id: "card", title: "Card", file: "card.tsx" },
      { id: "paper", title: "Paper", file: "paper.tsx" },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "bottom-navigation", title: "Bottom Navigation", file: "bottom-navigation.tsx" },
      { id: "breadcrumbs", title: "Breadcrumbs", file: "breadcrumbs.tsx" },
      { id: "drawer", title: "Drawer", file: "drawer.tsx" },
      { id: "link", title: "Link", file: "breadcrumbs.tsx" },
      { id: "menu", title: "Menu", file: "menu.tsx" },
      { id: "pagination", title: "Pagination", file: "pagination.tsx" },
      { id: "speed-dial", title: "Speed Dial", file: "speed-dial.tsx" },
      { id: "stepper", title: "Stepper", file: "stepper.tsx" },
      { id: "mobile-stepper", title: "Mobile Stepper", file: "mobile-stepper.tsx" },
      { id: "tabs", title: "Tabs", file: "tabs.tsx" },
    ],
  },
  {
    id: "layout",
    title: "Layout",
    items: [
      { id: "box", title: "Box", skip: true },
      { id: "container", title: "Container", file: "container.tsx" },
      { id: "grid", title: "Grid", skip: true },
      { id: "stack", title: "Stack", skip: true },
      { id: "image-list", title: "Image List", file: "image-list.tsx" },
    ],
  },
  {
    id: "utils",
    title: "Utils",
    items: [
      { id: "click-away", title: "Click-away listener", file: "popover.tsx" },
      { id: "modal", title: "Modal", file: "modal.tsx" },
      { id: "popover", title: "Popover", file: "popover.tsx" },
      { id: "transitions", title: "Transitions", file: "collapse.tsx" },
    ],
  },
];
