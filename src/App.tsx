import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div className='h-screen w-screen flex flex-col bg-slate-100'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* TODO: route all unlisted routes to error page */}
        </Routes>
      </Router>
      <footer
        className='bg-blue-500
          text-l text-center
          mt-auto
          p-4'
      >
        <p>Hanna-Kai Barstad Golberg @{new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
