import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { ExpandMore } from "@material-ui/icons";
import "./index.css";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    panel: {
        boxShadow: "none",
        borderRadius: 0,
        borderBottom: "1px solid #BCBDBC",
        backgroundColor: "transparent"
    }
}));

export default function ProductAccordion({
    heading,
    text,
    children,
    textColor,
    className,
    prodOne,
    prodTwo,
    active
}) {
    const classes = useStyles();

    const match = () => {
        // var subtitles = new Set(prodOne.map(xData => xData.subtitle));
        active = prodTwo.spec.specifications.length > 1 ? active : 0;
        const x = prodOne.map((xData, index) => {
            const productTwo = prodTwo.spec.specifications[
                active
            ].subtitles.find(data =>
                xData.subtitle
                    .toLowerCase()
                    .includes(data.subtitle.toLowerCase())
            );
            const data = {
                title: xData.subtitle,
                prodOne: xData.content,
                prodTwo: productTwo === undefined ? "-" : productTwo.content
            };
            return data;
        });
        return x;
    };

    const isProdTwoEmpty = prodTwo.spec.specifications.length > 1;
    return (
        <div className={`product-accordian ${className}`}>
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore style={{ color: textColor }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        className="product-accordian-heading"
                        style={{ color: textColor }}
                    >
                        {heading}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="product-accordian-expand">
                    <Grid container spacing={2}>
                        {match().map((data, index) => (
                            <React.Fragment key={index}>
                                <Grid
                                    item
                                    md={3}
                                    style={{
                                        borderWidth: 1,
                                        borderBottomColor: "#000"
                                    }}
                                >
                                    <Typography
                                        className="product-accordian-summary"
                                        style={{
                                            marginLeft: "auto",
                                            fontWeight: "bold",
                                            color: "##1E1E1E",
                                            fontSize: 17
                                        }}
                                    >
                                        {data.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={isProdTwoEmpty ? 4 : 8}
                                    style={{
                                        borderWidth: 1,
                                        borderBottomColor: "#000"
                                    }}
                                >
                                    <Typography
                                        className="product-accordian-summary"
                                        style={{ marginLeft: "auto" }}
                                    >
                                        {!data.prodOne ? "-" : data.prodOne}
                                    </Typography>
                                </Grid>
                                {isProdTwoEmpty && (
                                    <Grid
                                        item
                                        md={4}
                                        style={{
                                            borderWidth: 1,
                                            borderBottomColor: "#000"
                                        }}
                                    >
                                        <Typography
                                            className="product-accordian-summary"
                                            style={{ marginLeft: "auto" }}
                                        >
                                            {!data.prodTwo ? "-" : data.prodTwo}
                                        </Typography>
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            );
        </div>
    );
}

ProductAccordion.propTypes = {
    text: PropTypes.any,
    textColor: PropTypes.string,
    className: PropTypes.string
};

ProductAccordion.defaultProps = {
    text: null,
    textColor: "#fff",
    className: "no-border"
};
