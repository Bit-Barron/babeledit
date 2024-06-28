import './assets/main.css'
import '../../index.css'

import { render } from 'solid-js/web'
import App from './App'
import { ThemeProvider } from '../components/provider/ThemeProvider'

render(
  () => (
    <div>
      {/* <Navbar /> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </div>
  ),
  document.getElementById('root') as HTMLElement
)
