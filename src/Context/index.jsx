import { createContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem("account")
  const signOutInLocalStorage = localStorage.getItem("sign-out")

  let parsedAccount
  let parsedSignOut

  if(!accountInLocalStorage) {
    localStorage.setItem("account", JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  }

  if(!signOutInLocalStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }

}

export const ShoppingCartProvider = ({ children }) => {
    
    // My account
    const [account, setAccount] = useState({})

    // Sign out
    const [signOut, setSignOut] = useState(false)

    // Shopping Cart - Increment quantity
    const [count, setCount] = useState(0);

    // Product Detail - Open and close modal
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    // CheckOut Side Menu - Open and close modal
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Product Detail - Show product
    const[productToShow, setProductToShow] = useState({});

    // Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([]);

    // Shopping Cart - Order
    const [order, setOrder] = useState([])

    // Get Products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)
    
    // Get Products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Get Products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
    
          try {
    
            const response = await fetch('https://fakestoreapi.com/products')
    
            const data = await response.json()
    
            setItems(data)
    
          } catch (error) {
            console.log(`Ocurrio un error: ${error}`)
          }
        
        }
    
        fetchData()
          
      }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {      
      return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if(searchType === "BY_TITLE") return filteredItemsByTitle(items, searchByTitle)
      if(searchType === "BY_CATEGORY") return filteredItemsByCategory(items, searchByCategory)
      if(searchType === "BY_TITLE_CATEGORY") {
        return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
      if(!searchType) return items
    }

    useEffect(() => {

      if(searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_TITLE_CATEGORY", items, searchByTitle, searchByCategory))
      if(searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE", items, searchByTitle, searchByCategory))
      if(!searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory))
      if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))

    }, [items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{
            count, 
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}

export { ShoppingCartContext }