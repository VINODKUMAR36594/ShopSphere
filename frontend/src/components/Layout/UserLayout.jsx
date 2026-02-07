import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
// import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      {/* Herder */}
      <Header/>
      {/* Main contenet */}
      <main>
        <Outlet/>
      </main>
      {/* Footer */}
      <Footer/>
    </>
  )
}

export default UserLayout