import React, { Component } from 'react'
import { Marker, StaticMap } from 'react-map-gl';
import { Button } from 'components';
import { icons } from 'assets';

import './index.css';
const Mapkey = process.env.REACT_APP_MAPBOX_KEY;

export default class YamahaMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            viewport: {
                width: '100%',
                height: '100%',
                longitude: 28.088060,
                latitude: -26.075990,
                zoom: 15
            },

        }
    }

    mailTo = () => {
        window.open("mailto:web@yamaha.co.za");
    }
    render() {
        return (
            <div className={`map ${this.props.className}`}>
                <StaticMap
                    mapboxApiAccessToken={Mapkey}
                    {...this.state.viewport}
                    mapStyle={`mapbox://styles/mapbox/light-v9?optimize=true`}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    maxZoom={17}
                    minZoom={4}
                >
                    <div className="world-of-yamaha">
                        <div style={{ color: '#fff', margin: 'auto' }}>
                            <h4 className="branch name white">WORLD OF YAMAHA</h4>
                            <p className="branch subtext white">For all your event, concert and conferencing needs.</p>
                            <p className="branch address white">
                                    19 Eastern Service Rd, Kelvin, Sandton, 2054
                                    <span style={{position:'relative',bottom:-5, left:3 }}><img alt="directions" src={icons.direction} style={{height:'1rem',}}/></span>
                            </p>
                            <p className="branch telephone white">011 259 7850</p>
                            <Button type="primary" title="E-MAIL WORLD OF YAMAHA" onClick={this.mailTo} />
                        </div>
                    </div>
                    <Marker
                        latitude={-26.075990}
                        longitude={28.088060} offsetLeft={-20} offsetTop={-10}
                    >
                        <img alt="marker"
                            src={icons.yamaha_pin}
                            height={60}
                        />
                    </Marker>
                </StaticMap>
            </div>
        )
    }
}
