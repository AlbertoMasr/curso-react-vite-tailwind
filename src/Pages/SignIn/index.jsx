import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'

function SignIn() {

  const shoppingCartContext = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = shoppingCartContext.account ? Object.keys(shoppingCartContext.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    shoppingCartContext.setSignOut(false)
    // Redirect to home
    return <Navigate to='/' />
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      password: formData.get('password'),
      email: formData.get('email')

    }
    const stringidiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringidiedAccount)
    shoppingCartContext.setAccount(data)
    handleSignIn()
  }

  const renderLogIn = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email:</span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Pasword:</span>
          <span>{parsedAccount?.paswword}</span>
        </p>
        <Link to="/">
          <button className='bg-black text-white w-full rounded-lg py-3 mt-4 mb-2 disabled:bg-black/40'
          onClick={() => handleSignIn()}
          disabled={!hasUserAnAccount}>Log In</button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline-offset-4' href="/">Forgot my password</a>
        </div>
        <button className='border border-black rounded-lg mt-6 py-3 disabled:text-black/40 disabled:border-black/50'
        onClick={() => setView('create-user-info')}
        disabled={hasUserAnAccount}>Sign Up</button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input 
            type="text" 
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='Your email'
            className='rounded-lg border border-black py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name:</label>
          <input 
            type="text" 
            id='name'
            name='name'
            defaultValue={parsedAccount?.name}
            placeholder='Your name'
            className='rounded-lg border border-black py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password:</label>
          <input 
            type="text" 
            id='password'
            name='password'
            defaultValue={parsedAccount?.password}
            placeholder='********'
            className='rounded-lg border border-black py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none'
          />
        </div>
        <Link to="/">
          <button 
            className='bg-black text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}
          >
            Create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <Layout>
      <h1 className='font-medium text-lg text-center mb-6 w-80'>Welcome</h1>
      {renderView()}
    </Layout>
  )
}

export default SignIn
