import React from 'react'
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';


const App = () => {
  return (
    /*BrowserRouter component provided by React Router, is a crucial tool for managing client-side routing and navigation in single-page applications
    Header is mainly used to place components as a heading
    We are giving styles in the className because of tailwind css
    Link to / - is for home*/

    // 1 - We created a header with styles and created a link tag for the home with logo open ai
    // 2 - We created a header with styles and created a link tag for the createpost which creates a button with link which renders a new page
    <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
    <Link to="/">
      <img src= {logo} alt="logo"
      className="w-28 object-contain"/>
    </Link>

    <Link to="/create-post"
      className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2
      rounded-md">Create</Link>
     
    </header>

    <main className="sm:p-8 px-4 py-8
      w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element ={<Home />} />
          <Route path="/create-post" element ={<CreatePost />} />
        </Routes>

      </main>
    </BrowserRouter>
// Main holds route to both home and createpost
  )
}

export default App