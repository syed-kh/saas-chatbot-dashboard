import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

export default function MainLayout({ children }) {
  const location = useLocation();
  const showRightSidebar = location.pathname === '/';

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 selection:text-white">
      <Sidebar />
      <main className="flex-1 min-w-0 h-full flex flex-col relative overflow-y-auto">
        {children}
      </main>
      {showRightSidebar && <RightSidebar />}
    </div>
  );
}
