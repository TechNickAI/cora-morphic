import React from 'react'
import { ModeToggle } from './mode-toggle'
import HistoryContainer from './history-container'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

export const Header: React.FC = async () => {
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/" className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://d1xiic2ql9d7gm.cloudfront.net/logo_cora.png" alt="Cora" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <span className="sr-only">Cora</span>
        </a>
      </div>
      <div className="flex gap-0.5">
        <ModeToggle />
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header