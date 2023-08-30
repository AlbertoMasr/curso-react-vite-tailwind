import { useContext } from "react"
import { Link } from 'react-router-dom';
import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import { OrderCard } from "../../Components/OrderCard"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"

function MyOrder() {

  const shoppingCartContext = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let orderId = currentPath.split('/').slice(-1)[0]

  if(orderId === 'last') orderId = shoppingCartContext.order?.length - 1

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <Link to={'/my-orders'} className='absolute left-0'>
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className="flex flex-col w-80">
            {
                shoppingCartContext.order?.[orderId]?.products.map((product) => {
                    return <OrderCard 
                        key={product.id}
                        id={product.id} 
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price}
                    />
                })
            }
            </div>
    </Layout>
  )
}

export { MyOrder }
