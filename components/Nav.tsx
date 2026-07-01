import React from 'react'

const Nav = () => {
  return (
    <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          <div className="font-display text-body-lg font-bold text-text-primary tracking-tighter">
            kibria.dev
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="font-body-md text-text-secondary hover:text-text-primary transition-colors duration-300"
              href="#"
            >
              Work
            </a>
            <a
              className="font-body-md text-text-secondary hover:text-text-primary transition-colors duration-300"
              href="#"
            >
              Labs
            </a>
            <a
              className="font-body-md text-text-secondary hover:text-text-primary transition-colors duration-300"
              href="#"
            >
              About
            </a>
            <button className="bg-primary text-on-primary font-body-md font-bold px-6 py-2 rounded-full scale-95 active:scale-90 transition-transform">
              Connect
            </button>
          </div>
        </nav>
  )
}

export default Nav