import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import ChatArea from './components/chat/ChatArea';
import Analytics from './pages/Analytics';
import ApiUsage from './pages/ApiUsage';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  const { authUser } = useStore();

  return (
    <Router>
      {!authUser ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<ChatArea />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/api-usage" element={<ApiUsage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      )}
    </Router>
  )
}

export default App
