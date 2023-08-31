import { useContext } from "react"
import { PlusIcon } from "@heroicons/react/24/solid"
import { CheckIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from "../../Context"

const Card = (data) => {

    const shoppingCartContext = useContext(ShoppingCartContext)

    const showProduct = (productDetail) => {
        shoppingCartContext.closeCheckoutSideMenu()
        shoppingCartContext.openProductDetail()
        shoppingCartContext.setProductToShow(productDetail)
    }

    const addProductToCart = (event, productData) => {

        event.stopPropagation()
    
        shoppingCartContext.setCount(shoppingCartContext.count + 1)
        shoppingCartContext.setCartProducts([...shoppingCartContext.cartProducts, productData])
        shoppingCartContext.closeProductDetail()
        shoppingCartContext.openCheckoutSideMenu()

    }

    const renderIcon = (data) => {

        const isInCart = shoppingCartContext.cartProducts.filter(product => product.id === data.id).length > 0

        if(!isInCart) {

            return (
                <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                    onClick={(event) => addProductToCart(event, data)}>
                        <PlusIcon className="h-6 w-6 text-black"/>
                </div>
            )

        } else {

            return (
                <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1">
                        <CheckIcon className="h-6 w-6 text-white"/>
                </div>
            )

        }
        

    }

    return (
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg"
            onClick={() => showProduct(data.data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.data.category}</span>
                <img className="w-full h-full object-cover rounded-lg" src={data.data.image} alt={data.data.title} />
                {renderIcon(data.data)}
            </figure>
            <p className="flex justify-between items-center">
                <span>{data.data.title}</span>
                <span>${data.data.price}</span>
            </p>
        </div>
    )

}

export { Card }