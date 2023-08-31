import { useContext } from "react"
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom"
import Home from "../Home"
import MyAccount from "../MyAccount"
import {MyOrder} from "../MyOrder"
import MyOrders from "../MyOrders"
import NotFound from "../NotFound"
import SignIn from "../SignIn"
import { Navbar } from "../../Components/Navbar"
import { CheckOutSideMenu } from "../../Components/CheckOutSideMenu"
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from "../../Context"
import "./App.css"

const AppRoutes = () => {
  const shoppingCartContext = useContext(ShoppingCartContext)

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  // Sign Out
  const signOut = localStorage.getItem("sign-out")
  const parsedSignOut = JSON.parse(signOut)

  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = shoppingCartContext.account ? Object.keys(shoppingCartContext.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  const isUserSignedOut = shoppingCartContext.signOut || parsedSignOut

  let routes = useRoutes([
    { path: "/", element: hasUserAnAccount && !isUserSignedOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/clothes", element: hasUserAnAccount && !isUserSignedOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/electronics", element: hasUserAnAccount && !isUserSignedOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/furnitures", element: hasUserAnAccount && !isUserSignedOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/toys", element: hasUserAnAccount && !isUserSignedOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/others", element: hasUserAnAccount && !isUserSignedOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ])

  return routes

}

const App = () => {

  initializeLocalStorage()

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
          <AppRoutes />
          <Navbar />
          <CheckOutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
