import './assets/main.css'
import '../../index.css'

import { render } from 'solid-js/web'
import App from './App'
import { ThemeProvider } from '../components/provider/theme-provider'
import { Router } from 'solid-app-router'

render(
  () => (
    <div>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </div>
  ),
  document.getElementById('root') as HTMLElement
)
