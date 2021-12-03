import React, { Component } from "react";
import { withTheme } from "@material-ui/styles";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    TextField,
    Paper
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Close from "@material-ui/icons/Close";
import { Api, Page, NavBar, Footer, NewsCarousel, SeoTag } from "components";
import { colors, primaryTheme } from "theme";
import moment from "moment";
import { isMobile } from "react-device-detect";
import SocialFooter from "./SocialFooter";
import ContentCategory from "./ContentCategory";
import { animateScroll } from "react-scroll";

const history = {
    id: 1,
    name: "Latest News",
    description:""
};

const sortNews = items => {
    return items.sort((a, b) => {
        const aPublishedDate = moment(a.created_at);
        const bPublishedDate = moment(b.created_at);
        return bPublishedDate.diff(aPublishedDate);
    });
};

class NewsPage extends Component {
    state = {
        videoLoading: true,
        galleryLoading: true,
        historyLoading: true,
        news: [],
        shareDialogVisible: false,
        shareUrl: "",
        searchQuery: "",
        carouselIndex: 0
    };

    componentDidMount = () => {
        // loading content
        this.fetchNews("video");
        this.fetchNews("gallery");
        this.fetchNews("history");
        animateScroll.scrollToTop();
    };

    fetchNews = type => {
        Api.api()
            .get(`/blog_${type}`)
            .then(response => {
                this.setState(prevState => ({
                    news: prevState.news.concat(
                        response.data.data.map(item => {
                            const newItem = item;
                            newItem.type = type;
                            switch (type) {
                                case "video":
                                    newItem.coverImage =
                                        item.preview_img &&
                                        item.preview_img.length > 0
                                            ? `${process.env.REACT_APP_URL}${
                                                  item.preview_img[0]
                                              }`
                                            : "";
                                    break;
                                case "gallery":
                                    newItem.coverImage =
                                        item.gallery_image &&
                                        item.gallery_image.length > 0
                                            ? `${process.env.REACT_APP_URL}${
                                                  item.gallery_image[0]
                                              }`
                                            : "";
                                    newItem.images = item.gallery_image.map(
                                        image =>
                                            `${process.env.REACT_APP_URL}${image}`
                                    );
                                    break;
                                default:
                                    newItem.coverImage = `${process.env.REACT_APP_URL}${newItem.blog_img}`;
                                    break;
                            }
                            return newItem;
                        })
                    )
                }));
            })
            .catch(error => console.warn(error))
            .then(() => {
                this.setState({ [`${type}Loading`]: false });
            });
    };

    getCarouselData = () => {
        return this.state.news.filter(
            item => ["video", "gallery"].indexOf(item.type) === -1
        );
    };

    filterItems = item => {
        const { searchQuery } = this.state;
        if (searchQuery) {
            return (
                `${item.title}${item.category}${item.slug}${item.description}`
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) !== -1
            );
        }
        return true;
    };

    next = () => {
        const carouselData = this.getCarouselData();
        if (this.state.carouselIndex >= carouselData.length - 1) {
            this.setState({ carouselIndex: 0 });
        } else {
            this.setState({ carouselIndex: this.state.carouselIndex + 1 });
        }
    };

    previous = () => {
        const carouselData = this.getCarouselData();
        if (this.state.carouselIndex === 0) {
            this.setState({ carouselIndex: carouselData.length - 1 });
        } else {
            this.setState({ carouselIndex: this.state.carouselIndex - 1 });
        }
    };

    renderSearch = () => {
        const { searchQuery, news } = this.state;
        const sortedNews = sortNews(news).filter(this.filterItems);
        return (
            <div>
                <Container
                    maxWidth="xl"
                    spacing={12}
                    style={{
                        backgroundColor: colors.light_grey,
                        paddingBottom: 40,
                        paddingTop: 40
                    }}
                >
                    <ThemeProvider theme={primaryTheme}>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ color: "black" }}>
                                SEARCH WITHIN OUR NEWS LIBRARY
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            <TextField
                                id="outlined-name"
                                placeholder="Looking for something specific?"
                                value={searchQuery}
                                onChange={e => {
                                    this.setState({
                                        searchQuery: e.target.value
                                    });
                                }}
                                margin="normal"
                                variant="outlined"
                                color="primary"
                            />
                            {searchQuery.length > 0 ? (
                                <Box
                                    style={{
                                        position: "absolute",
                                        marginTop: primaryTheme.spacing(2),
                                        right: isMobile
                                            ? primaryTheme.spacing(2)
                                            : primaryTheme.spacing(4)
                                    }}
                                >
                                    <Button
                                        onClick={() =>
                                            this.setState({ searchQuery: "" })
                                        }
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        disabled={searchQuery.length === 0}
                                    >
                                        {isMobile ? (
                                            <Close size="large" />
                                        ) : (
                                            `CLEAR`
                                        )}
                                    </Button>
                                </Box>
                            ) : null}
                        </Grid>
                    </ThemeProvider>
                </Container>
                {sortedNews.length === 0 ? (
                    <Paper
                        style={{
                            backgroundColor: `${colors.primary}99`,
                            padding: 20
                        }}
                    >
                        <Typography
                            align="center"
                            variant="body1"
                            style={{ color: "white", fontWeight: "bold" }}
                        >
                            NO RESULTS FOR &ldquo;{searchQuery}&rdquo;
                        </Typography>
                    </Paper>
                ) : null}
            </div>
        );
    };

    renderCarousel = () => {
        const carouselData = this.getCarouselData();
        if (!carouselData[this.state.carouselIndex]) return null;
        return (
            <NewsCarousel
                navbar={
                    <NavBar
                        topColor="rgba(0,0,0,96%)"
                        bottomColor="rgba(0,0,0,90%)"
                        search
                        logoColor="white"
                        menuDrawerInfo={[]}
                        menuColor="white"
                        categoryMenu={[]}
                    />
                }
                onStepper={({ index }) =>
                    this.setState({ carouselIndex: index })
                }
                activeData={carouselData[this.state.carouselIndex]}
                data={carouselData}
                next={this.next}
                previous={this.previous}
                footer={<Footer mainFooter />}
            />
        );
    };

    render() {
        const {
            videoLoading,
            galleryLoading,
            historyLoading,
            news,
            searchQuery
        } = this.state;
        const sortedNews = sortNews(news).filter(this.filterItems);
        // const videos = sortedNews.filter(item => item.type === "video");
        // const galleries = sortedNews.filter(item => item.type === "gallery");
        const historyItems = sortedNews.filter(item => item.type === "history");

        return (
            <div>
                <SeoTag
                    title="Yamaha South Africa | News"
                    description="View the latest news and developments that have taken place with all things Yamaha."
                    keywords="News, developments, find out more."
                />
                <Page
                    searchQuery={searchQuery}
                    loading={videoLoading || galleryLoading || historyLoading}
                    fullWidthElements={this.renderSearch()}
                    carousel={
                        !videoLoading && !galleryLoading && !historyLoading
                            ? this.renderCarousel()
                            : null
                    }
                >
                    <Grid item xs={12}>
                        {historyItems.length > 0 ? (
                            <ContentCategory
                                category={history}
                                items={historyItems}
                            />
                        ) : null}
                    </Grid>
                    {/* <Grid item xs={12}>
                    {videos.length > 0 ? (
                        <ContentCategory type="videos" items={videos} />
                    ) : null}
                </Grid> */}
                    {/* <Grid item xs={12}>
                    {galleries.length > 0 ? (
                        <ContentCategory type="gallery" items={galleries} />
                    ) : null}
                </Grid> */}
                    <SocialFooter />
                </Page>
            </div>
        );
    }
}

export default withTheme(NewsPage);
