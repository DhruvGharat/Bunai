import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const Orders = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <ShoppingBagIcon className="h-8 w-8 text-mustard mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Order History</h3>
          </div>
          
          <div className="px-6 py-12 text-center">
            <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-gray-500">When you place an order, you'll see its status here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
