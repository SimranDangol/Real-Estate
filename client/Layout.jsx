import { Outlet } from "react-router-dom"
import Header from "./src/components/Header"

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Layout
