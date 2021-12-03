import React, { Component } from "react";
import { Grid, Box, Typography, Link } from "@material-ui/core";
import { images } from "assets";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import "./index.css";

const Header = ({ children }) => (
    <ThemeProvider theme={theme}>
        <Typography variant="h3">{children}</Typography>
    </ThemeProvider>
);
const ImageLink = ({ alt, src, href }) => (
    <Link href={href} target="_new">
        <img className="social-button" alt={alt} src={src} />
    </Link>
);

export class SocialFooter extends Component {
    render() {
        return (
            <Grid
                container
                item
                xs={12}
                spacing={2}
                style={{ marginBottom: 24 }}
            >
                <Grid item sm={6} md={4} xs={12}>
                    <Grid
                        item
                        xs={12}
                        className="social-block"
                        style={{
                            background: `url(${images.social_footer_bike})`,
                            backgroundSize: "cover",
                            backgroundPositionX: "center"
                        }}
                    >
                        <Box className="social-box">
                            <Header>FOLLOW</Header>
                            <Header>YAMAHA MOTOR</Header>
                            <Box className="social-links-box">
                                <ImageLink
                                    alt="follow us on facebook"
                                    src={images.transparent_fab_facebook}
                                    href="https://www.facebook.com/YAMAHASouthernAfrica/"
                                />
                                <ImageLink
                                    alt="follow us on youtube"
                                    src={images.transparent_fab_youtube}
                                    href="https://www.youtube.com/channel/UCEe7dmonT8QIBwbd2l9gxIA"
                                />
                                <ImageLink
                                    alt="follow us on instagram"
                                    src={images.transparent_fab_instagram}
                                    href="https://www.instagram.com/yamahasouthafrica"
                                />
                                <Box style={{ flex: 1 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                    <Grid
                        item
                        xs={12}
                        className="social-block"
                        style={{
                            background: `url(${images.social_footer_music})`,
                            backgroundSize: "cover",
                            backgroundPositionX: "center"
                        }}
                    >
                        <Box className="social-box">
                            <Header>FOLLOW</Header>
                            <Header>YAMAHA MUSIC</Header>
                            <Box className="social-links-box">
                                <ImageLink
                                    alt="follow us on facebook"
                                    src={images.transparent_fab_facebook}
                                    href="https://www.facebook.com/YamahaMusicSA/"
                                />
                                <ImageLink
                                    alt="follow us on twitter"
                                    src={images.transparent_fab_twitter}
                                    href="https://twitter.com/YamahaMusicSA"
                                />
                                <ImageLink
                                    alt="follow us on youtube"
                                    src={images.transparent_fab_youtube}
                                    href="https://www.youtube.com/user/yamahacorporation"
                                />
                                <ImageLink
                                    alt="follow us on instagram"
                                    src={images.transparent_fab_instagram}
                                    href="https://www.instagram.com/yamahamusicsa/"
                                />
                                <Box style={{ flex: 1 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                    <Grid
                        item
                        xs={12}
                        className="social-block"
                        style={{
                            background: `url(${images.social_footer_marine})`,
                            backgroundSize: "cover",
                            backgroundPositionX: "center"
                        }}
                    >
                        <Box className="social-box">
                            <Header>FOLLOW</Header>
                            <Header>YAMAHA MARINE</Header>
                            <Box className="social-links-box">
                                <ImageLink
                                    alt="follow us on facebook"
                                    src={images.transparent_fab_facebook}
                                    href="https://www.facebook.com/YamahaMarine.SA/"
                                />
                                <ImageLink
                                    alt="follow us on youtube"
                                    src={images.transparent_fab_youtube}
                                    href="https://www.youtube.com/user/YamahaMusicSA"
                                />
                                <ImageLink
                                    alt="follow us on instagram"
                                    src={images.transparent_fab_instagram}
                                    href="https://www.instagram.com/yamahamarinesa/"
                                />
                                <Box style={{ flex: 1 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default SocialFooter;
