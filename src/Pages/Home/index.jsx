import { useContext } from 'react'
import { Layout } from '../../Components/Layout'
import { Card } from '../../Components/Card'
import { ProductDetail } from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {

  const shoppingCartContext = useContext(ShoppingCartContext)

  const renderView = () => {
    if(shoppingCartContext.filteredItems?.length > 0) {
        return (
          shoppingCartContext.filteredItems?.map(item => (
            <Card key={item.id} data={item}/>
          ))
        )
    } else {
      return (
        <div>We don't have products</div>
      )
    }
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative p-4 w-80 mb-4'>
        <h1 className='font-medium text-xl'>Home</h1>
      </div>
      <input type="text" placeholder='Search a product' className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
      onChange={(event) => shoppingCartContext.setSearchByTitle(event.target.value)} />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {
          renderView()
        }
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home
