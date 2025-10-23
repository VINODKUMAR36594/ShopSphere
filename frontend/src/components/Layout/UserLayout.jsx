import React from 'react'
import Header from '../common/Header'
import Footer  from '../common/Footer'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
    <>
    {/* Header */}
    <Header/>

    {/* Main contents */}
    <main>
      <Outlet/>
    </main>
    <Footer/>
    {/* footer */}
    </>
  )
}

export default UserLayout

