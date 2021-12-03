import React from "react";
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function SubCategory({
    index,
    aboutIndex,
    activePanel,
    products,
    item,
    onMouseEnter,
    onMouseLeave
}) {
    return (
        <div
            key={index}
            className="list-containers"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ExpansionPanel
                expanded={aboutIndex === index}
                onChange={() => activePanel("panel", index)}
                className={"expander-dark"}
            >
                <ExpansionPanelSummary expandIcon={products && <ExpandMore />}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            KhtmlBoxLines: "single"
                        }}
                    >
                        {item.title}
                    </Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    );
}
