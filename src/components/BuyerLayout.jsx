import { Outlet } from 'react-router-dom';
import BuyerSidebar from './BuyerSidebar';

const BuyerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200">
          <BuyerSidebar />
        </div>
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => document.querySelector('.mobile-sidebar').classList.toggle('hidden')}
            className="p-3 bg-mustard text-white rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Sidebar */}
        <div className="mobile-sidebar md:hidden fixed inset-0 z-40 hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => document.querySelector('.mobile-sidebar').classList.add('hidden')}
          />
          <div className="relative bg-white w-72 h-full z-50">
            <BuyerSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BuyerLayout;
