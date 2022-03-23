import React from 'react'
import { Menu, Image } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <Menu stackable>
    <Menu.Item>
      <Image src='/standAppLogo.png' size='mini'/>
    </Menu.Item>
    <Menu.Item>Spaces</Menu.Item>
    <Menu.Item>Tickets</Menu.Item>
    <Menu.Item>Sign out</Menu.Item>
  </Menu>
  )
}
