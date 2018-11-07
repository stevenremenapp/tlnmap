import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
    }

    _updateQuery = (newQuery) => {
        this.setState({ query: newQuery });
        this.props.filterLocations(newQuery);
        console.log(Menu.state.isOpen);
    }

    render() {
        return (
            <Menu
            right
            noOverlay = {true}
            disableOverlayClick
            >
                <div className="search-box">
                    <h1 className="sidebar-header">Locations</h1>
                    <p>Now listing
                    <span> {this.props.filteredLocations ? this.props.filteredLocations.length : 10} </span>
                    of
                    <span> {this.props.allLocations.length} libraries</span></p>
                    <input
                        type="text"
                        placeholder="Search here"
                        className="search-input"
                        name="filter"
                        value={this.state.query}
                        onChange={event => this._updateQuery(event.target.value)}
                    />
                </div>
                <div className="library-list">
                    {this.props.filteredLocations &&
                        this.props.filteredLocations.map((library, index) => {
                            return (
                                <li
                                    // add onkeypress
                                    tabIndex="0"
                                    key={`library-${index}`}
                                    className="library-list-items"
                                    onClick={() => {
                                        this.props.onViewportChange(library);
                                        this.props.openInfowindow(library);
                                    }}
                                >
                                {`${library.name}`}
                                </li>
                            )
                        })
                    }
                </div>
            </Menu>
        )
    }
}

export default Sidebar;