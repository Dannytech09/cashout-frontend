import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout(props) {
    const { children } = props
  return (
    <div className='flex flex-col min-h-screen relative bg-slate-900'>
         {/* <Header/> */}
         <hero className=''>
         {children}
         </hero>
         {/* <Footer/> */}
    </div>
  )
}
