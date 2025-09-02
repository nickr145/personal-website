import { render } from 'preact'
import './style.css'
import { App } from "./app"
import { applyTheme, getChoice } from './theme/theme';

applyTheme(getChoice());
render(<App />, document.getElementById('app')!)
