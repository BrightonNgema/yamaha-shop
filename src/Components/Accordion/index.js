import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { ExpandMore } from "@material-ui/icons";
import "./index.css";

const useStyles = makeStyles(theme => ({
    panel: {
        boxShadow: "none",
        borderRadius: 0,
        borderBottom: "1px solid #BCBDBC",
        backgroundColor: "transparent"
    }
}));

export default function Accordion({
    heading,
    text,
    children,
    textColor,
    className
}) {
    const classes = useStyles();

    return (
        <div className={`accordian-main ${className}`}>
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore style={{ color: textColor }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        className="accordian-heading"
                        style={{ color: textColor }}
                    >
                        {heading}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {text && (
                        <Typography className="summary">{text}</Typography>
                    )}
                    {children}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

Accordion.propTypes = {
    heading: PropTypes.string.isRequired,
    text: PropTypes.any,
    textColor: PropTypes.string,
    className: PropTypes.string
};

Accordion.defaultProps = {
    text: null,
    textColor: "#000",
    className: "no-border"
};
