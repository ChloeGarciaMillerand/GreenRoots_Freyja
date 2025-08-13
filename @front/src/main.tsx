import { render } from 'preact'
import { Home } from './app/features/home/Home'  // Import your Home component
import './style.scss'

// Render the Home component to the DOM
render(<Home />, document.getElementById('app')!)