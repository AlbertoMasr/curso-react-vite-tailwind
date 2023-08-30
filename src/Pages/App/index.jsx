import { useRoutes, BrowserRouter } from "react-router-dom"

import "./App.css"

import Home from "../Home"
import MyAccount from "../MyAccount"
import {MyOrder} from "../MyOrder"
import MyOrders from "../MyOrders"
import NotFound from "../NotFound"
import SignIn from "../SignIn"
import { Navbar } from "../../Components/Navbar"
import { CheckOutSideMenu } from "../../Components/CheckOutSideMenu"

import { ShoppingCartProvider } from "../../Context"

const AppRouter = () => {

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/clothes", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/furnitures", element: <Home /> },
    { path: "/toys", element: <Home /> },
    { path: "/others", element: <Home /> },
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

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
          <AppRouter />
          <Navbar />
          <CheckOutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
