import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const LearnMoreCard = ({ title, to, linkTitle, desc, imageClass, image }) => {
    return (
        <Grid item xs={12} md={6}>
            <div className={`learn-more-card-main ${imageClass}`}>
                <div className="white-card">
                    <div className="white-card-container">
                        {/* <p className="white-card-heading" style={{ textTransform: 'initial' }}>{title}</p> */}
                        {title ? (
                            <div
                                className="white-card-header"
                                style={{ textTransform: "initial" }}
                            >
                                {title}
                            </div>
                        ) : (
                            <img
                                alt="logo"
                                src={image}
                                style={{
                                    height: 30,
                                    width: 150,
                                    marginLeft: -10
                                }}
                            />
                        )}
                        <p className="white-card-desc">{desc}</p>
                        <Link
                            to={to}
                            style={{
                                fontSize: "0.8rem",
                                color: "#D52B1E",
                                textDecoration: "none"
                            }}
                        >
                            {linkTitle} →
                        </Link>
                    </div>
                </div>
            </div>
        </Grid>
    );
};

export default LearnMoreCard;
