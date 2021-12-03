import React from "react";
import {
    Typography,
    // ExpansionPanel,
    ExpansionPanelSummary
} from "@material-ui/core";
// import { ExpandMore } from "@material-ui/icons";
import { Link } from "react-scroll";
export default function Types({ typename, activetype, onType, productList, onMouseEnter,
            onMouseLeave }) {
    return (
        <Link
            to={typename}
            hashSpy={true}
            smooth={true}
            duration={500}
            offset={-100}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* <ExpansionPanel
                expanded={typename === activetype}
                onChange={() => onType(typename)}
            > */}
            <ExpansionPanelSummary
                className="expander-light"
                onClick={() => onType(typename)}
                style={{pointerEvents:'all'}}
                // expandIcon={<ExpandMore style={{ color: "#000" }} />}
            >
                <Typography
                    className="type-item"
                    style={{
                        margin: "0px",
                        marginLeft: "auto",
                        fontWeight: "400",
                        marginRight: 10,
                        color: typename === activetype ? "red" : ""
                    }}
                >
                    {typename}
                </Typography>
            </ExpansionPanelSummary>
            {/* {productList} */}
            {/* </ExpansionPanel> */}
        </Link>
    );
}
