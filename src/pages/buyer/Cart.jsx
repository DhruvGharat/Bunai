import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <ShoppingCartIcon className="h-8 w-8 text-mustard mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <ShoppingCartIcon className="h-16 w-16 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Browse our collection and add some items to your cart</p>
            <div className="mt-6">
              <Link
                to="/buyer/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mustard hover:bg-mustard/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mustard"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
