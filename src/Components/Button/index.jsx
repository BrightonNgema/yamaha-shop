import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import "./Button.css";

const YamahaButton = ({
    title,
    variant,
    type,
    link,
    history,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    return (
        <Button
            className={`yamaha-btn yamaha-btn-${type}`}
            variant={variant}
            disabled={type ? type.includes("disabled") : false}
            onClick={link ? () => history.push(link) : onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {title}
        </Button>
    );
};

YamahaButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    link: PropTypes.string,
    onClick: PropTypes.func,
};

YamahaButton.defaultProps = {
    history: PropTypes.shape({
        push: undefined,
    }),
    link: undefined,
    onClick: undefined,
};

export default withRouter(YamahaButton);
