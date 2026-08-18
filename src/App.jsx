import { useState } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Cursor } from './components/Cursor'
import { ThemeToggle } from './components/ThemeToggle'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Work from './pages/Work'
import ShippedDesigns from './pages/ShippedDesigns'
import About from './pages/About'
import Resume from './pages/Resume'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <ThemeProvider>
      <Cursor />
      <Nav page={page} setPage={setPage} />
      <div>
        <div style={{ display: page === 'home'    ? 'block' : 'none' }}><Home    setPage={setPage} /></div>
        <div style={{ display: page === 'work'    ? 'block' : 'none' }}><Work    setPage={setPage} /></div>
        <div style={{ display: page === 'shipped' ? 'block' : 'none' }}><ShippedDesigns setPage={setPage} /></div>
        <div style={{ display: page === 'about'   ? 'block' : 'none' }}><About   setPage={setPage} /></div>
        <div style={{ display: page === 'resume'  ? 'block' : 'none' }}><Resume  setPage={setPage} /></div>
      </div>
      <Footer setPage={setPage} />
      <ThemeToggle />
    </ThemeProvider>
  )
}
