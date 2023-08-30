import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context';
import { OrdersCard } from '../../Components/OrdersCard'

function MyOrders() {

  const shoppingCartContext = useContext(ShoppingCartContext);
  console.log(shoppingCartContext.order);

  return (
    <Layout>
      <div className='flex items-center justify-center relative p-4 w-80 mb-4'>
        <h1 className='font-medium text-xl'>My Orders</h1>
      </div>
      {
        shoppingCartContext.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard 
              totalPrice = {order.totalPrice}
              totalProducts = {order.totalProducts}
            />
          </Link>
        ))
      }
    </Layout>
  )
}

export default MyOrders
