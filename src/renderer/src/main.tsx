import './assets/main.css'
import './index.css'

import { render } from 'solid-js/web'
import App from './App'

render(
  () => (
    <div>
      {/* <Navbar /> */}
      <App />
    </div>
  ),
  document.getElementById('root') as HTMLElement
)
