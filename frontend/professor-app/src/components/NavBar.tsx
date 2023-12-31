import React from 'react';

function NavBar() {
    return (
    <nav className="bg-white border-gray-200 mb-5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              <a href="/">IntelliCourse</a>
            </span>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 nav-text">Home</a>
            </li>
            <li>
              <a href="/questionsindex" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 nav-text">Questions</a>
            </li>
            <li>
              <a href="/generaldashboard" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 nav-text">General Dashboard</a>
            </li>
            <li>
              <a href="/studentsindex" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 nav-text">Students Dashboard</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    )
}

export default NavBar;