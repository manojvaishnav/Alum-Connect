import React from 'react'
import Navbar from '../../components/main/Navbar'
import Footer from '../../components/main/Footer'
import CollegeLoginForm from '../../components/auth/CollegeLoginForm'

const CollegeLogin = () => {
  return (
    <>
      <Navbar />
        <CollegeLoginForm />
      <Footer />
    </>
  )
}

export default CollegeLogin