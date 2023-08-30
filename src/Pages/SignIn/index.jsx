import { Link } from 'react-router-dom'
import { Layout } from '../../Components/Layout'

function SignIn() {

  return (
    <Layout>
      <h1 className='font-medium text-lg text-center mb-6 w-80'>Welcome</h1>
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email:</span>
          <span>ejemplo@loquesea.com</span>
        </p>
        <p>
          <span className='font-light text-sm'>Pasword:</span>
          <span>*******</span>
        </p>
        <Link to="/">
          <button className='bg-black text-white w-full rounded-lg py-3 mt-4 mb-2 disabled:bg-black/40'>Log In</button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline-offset-4' href="/">Forgot my password</a>
        </div>
        <button className='border border-black rounded-lg mt-6 py-3 disabled:text-black/40 disabled:border-black/50'>Sign Up</button>
      </div>
    </Layout>
  )
}

export default SignIn
