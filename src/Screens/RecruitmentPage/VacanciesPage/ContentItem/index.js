import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Share, PlayCircleOutline } from "@material-ui/icons";
// import moment from "moment";
import { Link } from "react-router-dom";
import "./index.css";
import TextTruncate from "react-text-truncate";

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
        let { item, onShare, onInteract } = this.props;
        return (
            <Card style={{ backgroundColor: "#f4f4f4", borderRadius: 10 }}>
                <CardActionArea
                    component={onInteract ? "button" : AdapterLink}
                    to={onInteract ? "" : `/recruitment/${item.slug}`}
                    onClick={() => {
                        return onInteract && onInteract(item);
                    }}
                >
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
                                style={{ fontWeight: 'bold' }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                component="p"
                                className="ellipsed-text"
                                style={{fontWeight:'bold'}}
                            >
                                {item.location}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                style={{ textTransform: "capitalize", marginTop:-30 }}
                            >
                                <TextTruncate
                                    style={{textTransform:'initial'}}
                                    line={3}
                                    element="div"
                                    truncateText="…"
                                    text={item.blurb.replace(/<[^>]*>?/gm, '')}
                                />
                              
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                style={{
                                    color: "red",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    textAlign: "left",
                                    marginTop: 20
                                }}
                            >
                                APPLY now →
                            </Typography>
                        </CardContent>
                    )}
                </CardActionArea>
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
                            <Typography
                                variant="subtitle2"
                                style={{
                                    flex: 4,
                                    marginTop: 16,
                                    marginLeft: 8,
                                    fontWeight:'bold'
                                }}
                            >
                                {!item.deadline ? "No Deadline Set": `Deadline: ${item.deadline}`}
                            </Typography>
                            <Button
                                size="small"
                                color="primary"
                                style={{ flex: 1, minHeight: 50 }}
                                onClick={() => {
                                    onShare(
                                        `${
                                            window.location.host
                                        }/recruitment/${item.slug.replace(/ /g, "%20")}`
                                    );
                                }}
                            >
                                <Share />
                            </Button>
                        </div>
                    </div>
                </CardActions>
            </Card>
        );
    }
}

export default ContentItem;
