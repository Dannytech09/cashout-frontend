import Sidebar from "../components/Sidebar";
// import Footer from './Footer'
// import Header from './Header'

export default function Layout({ children}) {

  return (
    <div className='h-screen flex flex-row min-h-screen bg-light-lighter'>
       <Sidebar/>
      {children}
    </div>
  )
}
