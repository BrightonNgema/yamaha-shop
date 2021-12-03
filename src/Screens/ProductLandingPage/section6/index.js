import React, { Component } from "react";
import { font } from "theme";
import MyCarousel from "./carousel";
import { withRouter } from "react-router-dom";
import NoCarousel from "./noCarousel";
import { isMobile } from "react-device-detect";
const axios = require("axios");

class Section6 extends Component {
    state = {
        models: []
    };

    componentDidMount = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_URL;
            let newAPI = await axios.get(
                baseUrl + `otherModels/${this.props.product.typeID}`
            );
            const {
                match: { params }
            } = this.props;
            const data = newAPI.data.data.filter(
                prod =>
                    prod.code.replace(/\s+/g, "") !==
                    params.prod.replace(/\s+/g, "")
            );
            this.setState({ models: data });
        } catch (error) {
            return [];
        }
    };

    render() {
        if (this.state.models.length < 1) return null;
        return (
            <div
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    paddingTop: 30,
                    marginTop: -1,
                    paddingBottom: 90
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <p
                        style={{
                            fontSize: "2.6rem",
                            fontWeight: "bold",
                            fontFamily: font.secondary,
                            lineHeight: 0.8,
                            color: "#1E1E1E",
                            marginBottom: 30
                        }}
                    >
                        WANT TO VIEW ANOTHER MODEL?
                    </p>
                </div>
                {!isMobile && this.state.models.length < 4 ? (
                    <NoCarousel data={this.state.models} />
                ) : (
                    <MyCarousel data={this.state.models} />
                )}
            </div>
        );
    }
}

export default withRouter(Section6);
