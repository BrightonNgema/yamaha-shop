import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Share, PlayCircleOutline } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import "./index.css";

const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
));
class ContentItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onShare: PropTypes.func,
        onInteract: PropTypes.func
    };

    static defaultProps = {
        onShare: () => {}
    };

    render() {
        const { item, onShare, onInteract } = this.props;
        return (
            <Card>
                <CardActionArea
                    component={onInteract ? "button" : AdapterLink}
                    to={onInteract ? "" : `/news/${item.slug}`}
                    onClick={() => {
                        console.info("CardActionArea", onInteract, item.slug);
                        return onInteract && onInteract(item);
                    }}
                >
                    <CardMedia
                        component="img"
                        alt={item.title}
                        height={item.type === "gallery" ? "240" : "140"}
                        className={item.type === "gallery" ? "gallery" : ""}
                        image={item.coverImage}
                        title={item.title}
                    />
                    {item.type === "video" && (
                        <PlayCircleOutline
                            fontSize="large"
                            style={{
                                position: "absolute",
                                top: "calc(18% - 17.5px)",
                                left: "calc(50% - 17.5px)",
                                color: "#F4F4F4"
                            }}
                        />
                    )}
                    {item.type !== "gallery" && (
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {item.title}
                            </Typography>
                            {item.type !== "event" && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    className="ellipsed-text"
                                >
                                    {item.description.replace("N", "")}
                                </Typography>
                            )}
                            {item.type === "event" ? (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {moment(item.event_start_date).format(
                                        "dddd, D MMMM YYYY"
                                    )}
                                    <br />
                                    {moment(item.event_start_date).format(
                                        "H:mm A - "
                                    )}
                                    {moment(item.event_end_date).format(
                                        "H:mm A"
                                    )}
                                </Typography>
                            ) : (
                                <Typography
                                    variant="subtitle2"
                                    style={{
                                        color: "red",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        textAlign: "left",
                                        marginTop: 10
                                    }}
                                >
                                    View →
                                </Typography>
                            )}
                        </CardContent>
                    )}
                </CardActionArea>
                {item.type !== "gallery" && (
                    <CardActions>
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "column"
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                {item.venue ? (
                                    <Typography
                                        variant="subtitle2"
                                        style={{
                                            flex: 4,
                                            marginTop: 16,
                                            marginLeft: 8
                                        }}
                                    >
                                        {item.venue}
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="subtitle2"
                                        style={{
                                            flex: 4,
                                            marginTop: 16,
                                            marginLeft: 8
                                        }}
                                    >
                                        {moment(item.created_at).format(
                                            "dddd, D MMMM YYYY"
                                        )}
                                    </Typography>
                                )}
                                <Button
                                    size="small"
                                    color="primary"
                                    style={{ flex: 1, minHeight: 50 }}
                                    onClick={() => {
                                        onShare(
                                            item.video ||
                                                `${process.env.REACT_APP_URL}/news/${item.slug}` ||
                                                `${process.env.REACT_APP_URL}/news`
                                        );
                                    }}
                                >
                                    <Share />
                                </Button>
                            </div>
                        </div>
                    </CardActions>
                )}
            </Card>
        );
    }
}

export default ContentItem;
