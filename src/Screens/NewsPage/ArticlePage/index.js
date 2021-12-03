import React, { Component } from "react";
import { Api, Page, SeoTag } from "components";
import { Button, Grid, Typography, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import SocialFooter from "../SocialFooter";
import ContentCategory from "../ContentCategory";
import { isIE } from 'react-device-detect';

const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
));

const otherArticlesCategory = {
    id: 1,
    name: "OTHER ARTICLES",
    description: ""
};

export class ArticlePage extends Component {
    state = {
        loadingArticle: true,
        videoLoading: true,
        galleryLoading: true,
        historyLoading: true,
        otherArticles: [],
        article: {}
    };

    componentDidMount = () => {
        this.fetchArticle();
        this.fetchNews("history");
    };

    fetchArticle = () => {
        const { match } = this.props;
        Api.api()
            .get(`/blog_history/${match.params.slug}`)
            .then(response => {
                this.setState({ article: response.data.data });
            })
            .catch(error => console.warn(error))
            .then(() => {
                this.setState({ loadingArticle: false });
            });
    };

    fetchNews = type => {
        Api.api()
            .get(`/blog_${type}`)
            .then(response => {
                this.setState(prevState => ({
                    otherArticles: prevState.otherArticles.concat(
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

    render() {
        const {
            loadingArticle,
            loadingOtherNews,
            otherArticles,
            article
        } = this.state;
        const descriptionArray = article.description
            ? article.description.split("\n")
            : [];

        return (
            <div>
                {!this.state.loadingArticle && <SeoTag
                    title={`Yamaha South Africa | News | ${article.title}`}
                    description={article.description.slice(0, 320)}
                    keywords="News, developments, find out more."
                />}
                <Page
                    loading={loadingArticle}
                    usePrimaryTheme
                    footerProps={{
                        mainFooter: true
                    }}
                    navBarProps={{
                        topColor: isIE ? "#FFF" : "rgba(255,255,255,96%)",
                        bottomColor: isIE ? "#FFF" : "rgba(255,255,255,88%)",
                        search: true,
                        menuColor: "white",
                        menuDrawerInfo: [],
                        logoColor: "black"
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h2">{article.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <img
                            alt={article.title}
                            src={`${process.env.REACT_APP_URL}${article.blog_img}`}
                            style={{ maxHeight: 300 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="subtitle2"
                            style={{ marginTop: 8, marginBottom: 8 }}
                        >
                            {moment(article.date_published).format(
                                "dddd, D MMMM YYYY"
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ marginTop: 16 }}>
                            {descriptionArray.map((item, i) => {
                                if (item.length < 4) return null;
                                return <p>{item.replace("\n", "")}</p>;
                            })}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ marginTop: 24, marginBottom: 24 }}
                            component={AdapterLink}
                            to="/news"
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            {`BACK TO NEWS`}
                        </Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        {!loadingOtherNews && (
                            <ContentCategory
                                category={otherArticlesCategory}
                                items={otherArticles.sort((a, b) => {
                                    const aPublishedDate = moment(a.created_at);
                                    const bPublishedDate = moment(b.created_at);
                                    return bPublishedDate.diff(aPublishedDate);
                                })}
                            />
                        )}
                    </Grid>
                    <SocialFooter />
                </Page>
            </div>
        );
    }
}

export default ArticlePage;
