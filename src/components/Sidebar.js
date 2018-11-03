import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import LIBRARIES from '../data/libraries.json';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            libraries: [],
            results: [],
            query: ''
        }
    }

    componentDidMount() {
        let libraryStartList = LIBRARIES.map(library => {
            return library.name;
        });
        // console.log(libraryStartList);
        this.setState({ libraries: libraryStartList });
        // console.log(this.state.libraries);
    }

    // _updateQuery = (query) => {
    //     this.setState({ query: query }, this._submitQuery);
    // }

    // _submitQuery() {
    //     if (this.state.query.trim() === '' || this.state.query.trim() === undefined) {
    //         return this.setState({ results: [] });
    //     } else {
    //         return this.setState({  })
    //     }
    // }

    _renderLibraryList = (library, index) => {
        // this.state.results.push(library.name);
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
                    <input
                        type="text"
                        placeholder="Search here"
                        className="search-input"
                        // value={this.state.query}
                        // onChange={(event) => this._updateQuery(event.target.value)}
                    />
                </div>
                <div className="library-list">
                    { LIBRARIES.map(this._renderLibraryList) }
                </div>
            </Menu>
        )
    }
}

export default Sidebar;