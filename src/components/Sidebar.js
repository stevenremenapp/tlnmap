import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import LIBRARIES from '../data/libraries.json';

class Sidebar extends React.Component {

    _renderLibraryList = (library, index) => {
        return (
            <li
                key={`library-${index}`}
                className="library-list"
                onClick={() => {
                    this.props.onViewportChange(library);
                    this.props.onLibraryClick(library);
                }}
            >
            {`${library.name}`}
            </li>
        )
    }

    render() {
        return (
            <Menu
            right
            noOverlay = {true}
            disableOverlayClick
            >
                <h1>Locations</h1>
                <input type="text" placeholder="Search here" className="search-input"></input>
                { LIBRARIES.map(this._renderLibraryList) }
            </Menu>
        )
    }
}

export default Sidebar;