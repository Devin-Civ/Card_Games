import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { DEV_FONT_THEME } from "$lib/theme/fontTheme";

document.body.dataset.fontTheme = DEV_FONT_THEME;

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
