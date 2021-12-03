import React, { Component } from "react";
import { colors } from "theme";
import "./Carousel.css";
import { PropTypes } from "prop-types";
import { InfoCard, ImageRow } from "components";
import { BrowserView, isMobile } from "react-device-detect";

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = { active: 0, autoplay: true };
    }

    componentDidMount() {
        // this.timeHandler = setInterval(() => this._increase(), 3000);

        this.timeHandler = setInterval(
            () => (this.state.autoplay ? this._increase() : null),
            10000
        );
        window.addEventListener("orientationchange", () => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        clearInterval(this.timeHandler);
    }

    onAuto = () => {
        this.setState({ autoplay: !this.state.autoplay });
    };
    _increase = () => {
        if (this.state.active >= this.props.data.length - 1) {
            this.setState({ active: 0 });
        } else {
            this.setState({ active: this.state.active + 1 });
        }
    };

    render() {
        const { data, navbar, menu, footer } = this.props;
        return (
            <div
                className="main-container"
                style={{
                    backgroundPosition: isMobile ? "-200px center" : "",
                    backgroundImage: `linear-gradient(rgba(25, 25, 25, 33%), rgba(8, 8, 8, 33%)), url(${data[this.state.active].image})`
                }}
            >

                {navbar}

                <InfoCard
                    onMouseEnter={this.onAuto}
                    onMouseLeave={this.onAuto}
                    text={data[this.state.active].text}
                    copytext={data[this.state.active].copytext}
                    btnText={data[this.state.active].btnText}
                    btnType="primary"
                    btnLink={data[this.state.active].btnLink}
                    btnUrl={data[this.state.active].btnUrl}
                />

                <div className="stepper-parent">
                    <div className="stepper">
                        {data.map((i, index) => {
                            const isActive =
                                this.state.active === index
                                    ? { backgroundColor: colors.primary }
                                    : {};
                            return (
                                <div
                                    onMouseEnter={this.onAuto}
                                    onMouseLeave={this.onAuto}
                                    className="indicator"
                                    key={index}
                                    style={isActive}
                                    onClick={() =>
                                        this.setState({ active: index })
                                    }
                                />
                            );
                        })}

                    </div>
                    <div className="image-row-carousel"><ImageRow isTrue={false} /></div>
                </div>
                {menu}
                <BrowserView>{footer}</BrowserView>

            </div>
        );
    }
}

Carousel.propTypes = {
    interval: PropTypes.number,
    data: PropTypes.array.isRequired,
    navbar: PropTypes.any.isRequired,
    menu: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired
};

Carousel.defaultProps = {
    interval: 10000
};
