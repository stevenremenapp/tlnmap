import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

class Sidebar extends React.Component {

    // Filter libraries based on filter selection
    _handleCheckboxChange = (checked) => {
        this.setState({ reciprocalBorrowerChecked: checked });
        // console.log(event.target.checked);
        // console.log(this.state.reciprocalBorrowerChecked);
        this.props.filterReciprocal(checked);
    }

    // Keep track of open/close sidebar state
    _handleSidebarStateChange = (state) => {
        this.props.handleSidebarStateChange(state);
    }

    render() {
        return (
            <Menu
            right
            noOverlay = {true}
            disableOverlayClick
            isOpen={this.props.isOpen}
            onStateChange={(state) => this._handleSidebarStateChange(state)}
            >
                <div className="search-box">
                    <h1 className="sidebar-header">Locations</h1>
                    <p>Now listing
                    <span> {this.props.filteredLocations ? this.props.filteredLocations.length : 97} </span>
                    of
                    {/* <span> {this.props.allLocations.length} libraries</span></p> */}
                    <span> 97 libraries</span></p>
                    <input
                        type="search"
                        placeholder="Search here"
                        className="search-input"
                        id="search-input"
                        name="query"
                        value={this.props.query}
                        onChange={this.props.onQueryChange}
                    />
                    <div className="filter-area">
                        <label>
                        <input
                            type="checkbox"
                            name="reciprocalBorrower"
                            onChange={this.props.onQueryChange}
                        />
                        Reciprocal Borrowers
                        </label>
                    </div>
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
                                    onMouseOver={() => {
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