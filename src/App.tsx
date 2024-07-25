import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { routes } from './lib/routes'


function App() {
  return <Router>
    {routes}
  </Router>
}

export default App
