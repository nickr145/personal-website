import { render } from 'preact'
import './style.css'
import { App } from "./app"
import { MotionProvider } from './contexts/MotionContext'

render(
	<MotionProvider>
		<App />
	</MotionProvider>,
	document.getElementById('app')!
)
