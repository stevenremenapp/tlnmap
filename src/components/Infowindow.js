import React, { PureComponent } from 'react';


export default class Infowindow extends PureComponent {

    render() {
        const {info} = this.props;
        console.log(info);
        const displayName = `${info.name}`;
        const tlnCode = `${info.tlnCode}`;
        // SEE MAP.CSS FILE FOR STYLING OF INFOWINDOW
        return (
            <div
                id="infowindow-container"
            >
                <div
                    tabIndex="0"
                    role="dialog"
                    aria-labelledby="dialog-title"
                    id="infowindow"
                >
                    <span id="dialog-title">{displayName}</span>
                    <br />
                    <span>{tlnCode} | {info.melRidesCode}</span>
                    <br />
                    <span> <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`${info.website}`}
                            >
                                Website
                            </a>
                    </span>
                    <br />
                    <span className="service-indicator">Reciprocal Borrower: &nbsp;
                        { info.reciprocalBorrower ? <img src={require('../images/yes-icon.svg')} className="infowindow-icon" alt="icon indicating that the library does have this service" /> : <img src={require('../images/no-icon.svg')} className="infowindow-icon" alt="icon indicating that the library doesn't have this service" /> }
                    </span>
                    <br />
                    <span className="service-indicator">Shared System: &nbsp;
                        { info.sharedSystem ? <img src={require('../images/yes-icon.svg')} className="infowindow-icon" alt="icon indicating that the library does have this service" /> : <img src={require('../images/no-icon.svg')} className="infowindow-icon" alt="icon indicating that the library doesn't have this service" /> }
                    </span>
                    <br />
                    <span className="service-indicator">MILibraryCard: &nbsp;
                        { info.miLibraryCard ? <img src={require('../images/yes-icon.svg')} className="infowindow-icon" alt="icon indicating that the library does have this service" /> : <img src={require('../images/no-icon.svg')} className="infowindow-icon" alt="icon indicating that the library doesn't have this service" /> }
                    </span>
                    <br />
                    <span className="service-indicator">MeL: &nbsp;
                        { info.mel ? <img src={require('../images/yes-icon.svg')} className="infowindow-icon" alt="icon indicating that the library does have this service" /> : <img src={require('../images/no-icon.svg')} className="infowindow-icon" alt="icon indicating that the library doesn't have this service" /> }
                    </span>
                </div>
            </div>
        )
    }

}