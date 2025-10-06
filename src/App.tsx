import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
function App() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-background/50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-screen-2xl">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;