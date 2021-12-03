import React, { Fragment } from "react";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { Phone } from "@material-ui/icons";

export const FooterLinks = ({ to, title, textStyle, href }) => {
    const contactCond = title.toLowerCase().includes("contact us");
    const footerlinks = () => {
        if (contactCond) {
            return (
                <Fragment>
                    <span
                        className="icon-button phone"
                        style={{ marginTop: -3 }}
                    >
                        <Phone
                            className="icon-phone"
                            style={{ fontSize: 14, marginTop: 2 }}
                        />
                    </span>
                    <span className={contactCond && "contact"}>{title}</span>
                </Fragment>
            );
        }
        return <span className={contactCond ? "contact" : ""}>{title}</span>;
    };
    return (
        <ListItem>
            {href ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        ...styles.defaultText,
                        ...textStyle,
                    }}
                >
                    {footerlinks()}
                </a>
            ) : (
                <Link
                    to={to}
                    style={{
                        ...styles.defaultText,
                        ...textStyle,
                    }}
                >
                    {footerlinks()}
                </Link>
            )}
        </ListItem>
    );
};
