import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

class Sidebar extends React.Component {

    render() {
        return (
            <Menu
            right
            noOverlay = {true}
            disableOverlayClick
            >
                <a href='/' id='home' className='menu-item'>Home</a>
                <a href='/' id='about' className='menu-item'>About</a>
                <a href='/' id='contact' className='menu-item'>Contact</a>
                <a href='/' id='settings' className='menu-item'>Settings</a>
            </Menu>
        )
    }
}

export default Sidebar;