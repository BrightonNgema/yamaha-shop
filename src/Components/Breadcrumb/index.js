import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link, withRouter } from "react-router-dom";
import { KeyboardArrowLeft } from "@material-ui/icons";
import "./Breadcrumb.css";

const routesArray = currentUrl => {
    const urls = currentUrl.replace("/", "");
    const routes = urls.split("/");
    return routes;
};

const YamahaBreadcrumbs = ({ logoColor, history, match }) => {
    const routes = routesArray(match.url);
    return (
        <div className="breadcrumb-root">
            <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
                <li>
                    <div
                        className="breadcrumb-link"
                        onClick={() => history.goBack()}
                    >
                        <div className="breadcrumb-icon-container">
                            <KeyboardArrowLeft className="breadcrumb-icon" />
                        </div>
                    </div>
                </li>
                <li className="breadcrumb-text">
                    <Breadcrumbs aria-label="Breadcrumb">
                        {/* To Do */}
                        {routes.map((link, index) => {
                            const linkText = link
                                .toUpperCase()
                                .replace(/_/g, " ");
                            const to = `/${routes
                                .slice(0, index + 1)
                                .join("/")}`;
                            if (index !== routes.length - 1) {
                                if (linkText.includes("CATEGORY")) {
                                    return null;
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            className="breadcrumb-link"
                                            onClick={null}
                                            to={to}
                                        >
                                            {linkText}
                                        </Link>
                                    );
                                }
                            } else {
                                return (
                                    <Typography
                                        key={index}
                                        className="breadcrumb-link"
                                        style={{ color: logoColor }}
                                    >
                                        {linkText}
                                    </Typography>
                                );
                            }
                        })}
                    </Breadcrumbs>
                </li>
            </ul>
        </div>
    );
};

export default withRouter(YamahaBreadcrumbs);
