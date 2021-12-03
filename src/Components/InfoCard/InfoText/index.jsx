import React, { Component } from "react";
import { BrowserView } from "react-device-detect";
import "./InfoText.css";

export default class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let logo = null;
        if (this.props.logo) {
            logo = (
                <div className="info-text-logo-container">
                    <img
                        src={this.props.logo}
                        alt="info-text-logo"
                        className="info-card-logo"
                    />
                </div>
            );
        }
        return (
            <div className="info-text">
                <p className="info-text-header">{this.props.text}</p>
                {logo ? logo : null}
                <BrowserView>
                    <p
                        className={
                            logo
                                ? "info-text-copytext-logo"
                                : "info-text-copytext"
                        }
                        style={{ color: "#fff", textTransform: "initial" }}
                    >
                        {this.props.copytext}
                    </p>
                    <p>{this.props.subtext}</p>
                </BrowserView>
            </div>
        );
    }
}
