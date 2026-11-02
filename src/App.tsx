import { Route, Routes } from 'react-router-dom'
import Decor from './components/Decor'
import Home from './pages/Home'
import VideoPage from './pages/VideoPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Decor />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:code" element={<VideoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
