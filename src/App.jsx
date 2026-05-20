import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ChatArea from './components/chat/ChatArea';
import Analytics from './pages/Analytics';
import ApiUsage from './pages/ApiUsage';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ChatArea />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/api-usage" element={<ApiUsage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
