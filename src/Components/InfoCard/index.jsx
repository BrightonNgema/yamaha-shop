import React, { Component } from "react";
import InfoText from "./InfoText";
import { Button } from "../";
import "./InfoCard.css";

export default class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let button = null;

        if (this.props.btnType) {
            button = (
                <Button
                    onMouseEnter={this.props.onMouseEnter}
                    onMouseLeave={this.props.onMouseLeave}
                    title={this.props.btnText}
                    type={this.props.btnType}
                    link={this.props.btnLink}
                    onClick={() => window.open(this.props.btnUrl)}
                    variant="contained"
                    className="info-card-button"
                />
            );
        }

        return (
            <div className="info-card-left">
                <InfoText
                    text={this.props.text}
                    copytext={this.props.copytext}
                    subtext={this.props.subtext}
                    logo={this.props.logo}
                />
                {button != null ? button : null}
            </div>
        );
    }
}
