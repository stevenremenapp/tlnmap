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
    }

    // _renderLibraryList = (library, index) => {
    //     return (
    //         <li
    //             key={`library-${index}`}
    //             className="library-list-items"
    //             onClick={() => {
    //                 this.props.onViewportChange(library);
    //                 this.props.openInfowindow(library);
    //             }}
    //         >
    //         {`${library.name}`}
    //         </li>
    //     )
    // }

    render() {
        return (
            <Menu
            right
            noOverlay = {true}
            disableOverlayClick
            >
                <div className="search-box">
                    <h1 className="sidebar-header">Locations</h1>
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
                    {/* { LIBRARIES.map(this._renderLibraryList) } */}
                    {this.props.locations &&
                        this.props.locations.map((library, index) => {
                            return (
                                <li
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