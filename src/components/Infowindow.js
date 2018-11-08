import React, { PureComponent } from 'react';

export default class Infowindow extends PureComponent {

    render() {
        const {info} = this.props;
        // const displayName = `${info.name}, ${info.city}`;
        const displayName = `${info.name}`;
        const tlnCode = `${info.tlnCode}`;

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
                    <span id="dialog-title">{displayName}</span> | {tlnCode} | <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`${info.website}`}
                        >
                            Website
                        </a>
                </div>
            </div>
        )
    }

}