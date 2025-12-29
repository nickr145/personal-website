import { render } from "preact";
import "./style.css";
import "./components/theme.css"
import { App } from "./app";
import { MotionProvider } from "./contexts/MotionContext";
import { ThemeProvider } from "./contexts/ThemeContext";

render(
  <ThemeProvider>
    <MotionProvider>
      <App />
    </MotionProvider>
  </ThemeProvider>,
  document.getElementById("app")!
);
