import React, { PureComponent } from 'react';

export default class Infowindow extends PureComponent {

    render() {
        const {info} = this.props;
        const displayName = `${info.name}, ${info.city}`;

        return (
            <div>
                <div>
                    {displayName} | <a
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