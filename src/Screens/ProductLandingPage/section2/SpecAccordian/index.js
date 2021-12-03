import React, { Component } from "react";
import { Accordion } from "components";
import { Grid } from "@material-ui/core";
const axios = require("axios");
class SpecAccordian extends Component {
    state = {
        spec: []
    };
    componentDidMount = async () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const {
            product: { prodID }
        } = this.props;
        const res = await axios.get(baseUrl + `specs/${prodID}`);
        if (res.data) {

            return this.setState({
                spec: res.data.specifications
            });
        }
        return null;
    };

    Accordian = () => {
        if (this.state.spec.length < 1) return null;
        return this.state.spec.map((data, index) => (
            <Accordion
                key={index}
                heading={data.title}
                number={1}
                textColor="#fff"
                children={
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={11}
                        style={{
                            margin: "auto",
                            textTransform: "initial"
                        }}
                    >
                        <Grid container spacing={1}>
                            {this.AccordingChildren(data.subtitles)}
                        </Grid>
                    </Grid>
                }
            />
        ));
    };

    AccordingChildren = data => {
        return data.map((data, index) => (
            <Grid
                key={index}
                item
                xs={6}
                sm={3}
                style={{
                    height: "100%",
                    color: "#fff"
                }}
            >
                <div
                    style={{
                        fontSize: "1rem",
                        color: "#7C7C7C",
                        textTransform: "initial"
                    }}
                >
                    {data.subtitle}
                </div>
                <div style={{ fontSize: "0.8rem", textTransform: "initial" }}>
                    {data.content}
                </div>
            </Grid>
        ));
    };

    render() {
        return this.Accordian();
    }
}

export default SpecAccordian;
