import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from '../../Context'
import "./styles.css"

const ProductDetail = () => {

    const shoppingCartContext = useContext(ShoppingCartContext);

    return(
        <aside className={`${shoppingCartContext.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white overflow-y-scroll`}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">Detail</h2>
                <div>
                    <XMarkIcon className="h-6 w-6 text-black cursor-pointer" 
                        onClick={() => shoppingCartContext.closeProductDetail()}/>
                </div>
            </div>
            <figure className="px-6">
               <img className="w-full h-full rounded-lg" src={shoppingCartContext.productToShow.image} alt={shoppingCartContext.productToShow.title} /> 
            </figure>
            <p className="flex flex-col p-6">
                <span className="font-medium text-2xl">{shoppingCartContext.productToShow.price}</span>
                <span className="font-medium text-2xl">{shoppingCartContext.productToShow.title}</span>
                <span className="font-light text-sm">{shoppingCartContext.productToShow.description}</span>
            </p>
        </aside>
    )

}

export { ProductDetail }