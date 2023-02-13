import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  )
}

export default MainLayout