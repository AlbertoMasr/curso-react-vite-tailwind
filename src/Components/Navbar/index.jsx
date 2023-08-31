import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { ShoppingCart } from "../ShoppingCart"

const Navbar = () => {

    const shoppingCartContext = useContext(ShoppingCartContext)

    const activeStyle = 'underline underline-offset-4'

    const signOut = localStorage.getItem("sign-out")
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignedOut = shoppingCartContext.signOut || parsedSignOut

    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = shoppingCartContext.account ? Object.keys(shoppingCartContext.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        const stringfieddSignOut = JSON.stringify(true)
        localStorage.setItem("sign-out", stringfieddSignOut)
        shoppingCartContext.setSignOut(true)
    }

    const renderView = () => {
        if(isUserSignedOut && !hasUserAnAccount) {

            return (
                <li>
                    <NavLink 
                        to="/sign-in"
                        className={({ isActive } ) => isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}
                    >Sign out</NavLink>
                </li>
            )

        } else {

            return (
                <>
                    <li className="text-black/60">
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavLink to="/my-orders">My orders</NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-account">My account</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sign-in"
                            className={({ isActive } ) => isActive ? activeStyle : undefined}
                            onClick={() => handleSignOut()}
                        >Sign out</NavLink>
                    </li>
                    <li className="flex items-center">
                        <ShoppingCart />
                    </li>
                </>
            )

        }
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink 
                        to={`${isUserSignedOut ? '/sign-in' : '/'}`}
                        onClick={() => shoppingCartContext.setSearchByCategory()}
                    >Shopi</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/"
                        onClick={() => shoppingCartContext.setSearchByCategory()}
                        className={({ isActive } ) => isActive ? activeStyle : undefined
                    }>All</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/clothes"
                        onClick={() => shoppingCartContext.setSearchByCategory('cloth')}
                        className={({ isActive } ) => isActive ? activeStyle : undefined 
                    }>Clothes</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/electronics"
                        onClick={() => shoppingCartContext.setSearchByCategory('electronics')}
                        className={({ isActive } ) => isActive ? activeStyle : undefined 
                    }>Electronics</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/furnitures"
                        onClick={() => shoppingCartContext.setSearchByCategory('jewelery')}
                        className={({ isActive } ) => isActive ? activeStyle : undefined 
                    }>jewelery</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/toys"
                        onClick={() => shoppingCartContext.setSearchByCategory('toys')}
                        className={({ isActive } ) => isActive ? activeStyle : undefined 
                    }>Toys</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/others"
                        onClick={() => shoppingCartContext.setSearchByCategory('others')}
                        className={({ isActive } ) => isActive ? activeStyle : undefined 
                    }>Others</NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {renderView()}
            </ul>
        </nav>
    )   
}

export { Navbar }