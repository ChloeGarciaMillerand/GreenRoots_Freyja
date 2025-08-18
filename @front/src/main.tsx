import { createRoot } from 'react-dom/client'
import { Home } from './app/features/home/Home'
import './style.scss'


const container = document.getElementById('app')!

const root = createRoot(container)
root.render(<Home />)
