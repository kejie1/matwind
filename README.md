# matwind

Open-source Material 2 components you copy into a React + Tailwind app.

Looks like [`@mui/material`](https://mui.com/material-ui/) **9.3.1 default light**. No Emotion, no `sx`, no `@mui/*`. **MIT licensed.**

- **Docs:** clone and `npm run dev` (http://localhost:5177/)
- **Source:** https://github.com/kejie1/matwind

```bash
git clone https://github.com/kejie1/matwind.git
cd matwind
npm install
npm run dev
```

Copy `src/material.css` once, then copy the component files you need. Override with `className`. Dynamic pixels: `style`. Theme: `--md-*` in `material.css`.

Struck-through catalog names are out of scope (Autocomplete, Box, Grid, Stack, DatePicker, DataGrid, dark mode).

## License

MIT
