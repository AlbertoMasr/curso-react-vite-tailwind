import { useContext } from "react"
import { Link } from "react-router-dom"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from '../../Context'
import { OrderCard } from "../OrderCard"
import { totalPrice } from "../../utils"
import "./styles.css"

const CheckOutSideMenu = () => {

    const shoppingCartContext = useContext(ShoppingCartContext);

    const handleDelete = (id) => {
        const filterProducts = shoppingCartContext.cartProducts.filter((product) => product.id !== id);
        shoppingCartContext.setCartProducts(filterProducts);
    }

    const handleCheckout = () => {

        const orderToAdd = {
            date: new Date(),
            products: shoppingCartContext.cartProducts,
            totalProducts: shoppingCartContext.cartProducts.length,
            totalPrice: totalPrice(shoppingCartContext.cartProducts)
        }

        shoppingCartContext.setOrder([...shoppingCartContext.order, orderToAdd]);
        shoppingCartContext.setCartProducts([]);
        shoppingCartContext.setSearchByTitle(null);

    }

    return(
        <aside className={`${shoppingCartContext.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} check-out-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My order</h2>
                <div>
                    <XMarkIcon className="h-6 w-6 text-black cursor-pointer" 
                        onClick={() => shoppingCartContext.closeCheckoutSideMenu()}/>
                </div>
            </div>
            <div className="px-6 overflow-y-scroll flex-1">
            {
                shoppingCartContext.cartProducts.map(product => {
                    return <OrderCard 
                        key={product.id}
                        id={product.id} 
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                })
            }
            </div>
            <div className="px-6 mb-6">
                <p className="flex justify-between items-center mb-2">
                    <span className="font-light">Total:</span>
                    <span className="font-medium text-2xl">${totalPrice(shoppingCartContext.cartProducts)}</span>
                </p>
                <Link to="/my-orders/last">
                    <button className="bg-black py-3 text-white w-full rounded-lg" 
                        onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )

}

export { CheckOutSideMenu }