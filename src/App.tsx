import { Outlet } from 'react-router'
import { Header } from './components/shared/header'
import { usePrivy } from "@privy-io/react-auth"

function App() {
  const { ready } = usePrivy();

  if ( !ready ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='w-full bg-gray-100'>
        <Header />
        <div className=''>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
