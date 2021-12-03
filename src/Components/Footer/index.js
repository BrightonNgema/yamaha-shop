import React, { Component, Fragment } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import "./index.css";
// import { SocialButton } from "./SocialButtons";
import { FooterLinks } from "./FooterLinks";
import { styles } from "./styles";
import SimpleMenu from "./More";
import { LoginModal } from "../index";
import AuthMenu from './Auth'
import { connect } from "react-redux";
import { logoutAction } from '../../Redux/Actions/auth'
import { withRouter } from 'react-router-dom'
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    logout() {
        let { dispatch } = this.props
        dispatch(logoutAction())
        this.props.history.replace("")
    }

    render() {
     
        const { mainFooter } = this.props;
        return window.innerWidth > 900 ? (
            <div style={styles.mainContainer} className="footermain">
                <Grid
                    container
                    spacing={0}
                    style={{ paddingLeft: 60, paddingRight: 10 }}
                >
                    <Grid
                        item
                        md={6}
                    // style={{ paddingLeft: 60 }}
                    >
                        <Grid container>
                            {mainFooter ? (
                                <Fragment>
                                    {/* <Grid item><SocialButton /></Grid> */}
                                    {/* TODO */}
                                    <Grid item>
                                        <FooterLinks
                                            to="/promotions"
                                            title="Promotions"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FooterLinks to="/news" title="News" />
                                    </Grid>
                                    <Grid item>
                                        <FooterLinks
                                            to="/events"
                                            title="Events"
                                        />{" "}
                                    </Grid>
                                    <Grid item>
                                        <FooterLinks
                                            to="/support"
                                            title="Support"
                                        />{" "}
                                    </Grid>
                                    <Grid item>
                                        <FooterLinks
                                            to="/warranty"
                                            title="Warranty"
                                        />
                                    </Grid>

                                    <Grid item>
                                        <FooterLinks
                                            to="/dealer"
                                            title="Find My Dealer"
                                            textStyle={styles.textStyle}
                                        />
                                    </Grid>
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        <Grid item>
                                            <FooterLinks
                                                href="https://wlwebxqa.wesbank.co.za/partners/calculators/repayment.xhtml?siteID=yamaha"
                                                title="Finance Calculator"
                                                textStyle={{ width: 135 }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            {/* <FooterLinks to="/faqs" title="Faq's" /> */}
                                        </Grid>
                                        <Grid item>
                                            <FooterLinks
                                                to="/finance/types_of_finance"
                                                title="Types of finance"
                                                textStyle={styles.textStyle}
                                            />
                                        </Grid>
                                    </Fragment>
                                )}
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                {mainFooter && (
                                    <FooterLinks
                                        to="/finance"
                                        textStyle={styles.textStyle}
                                        title="Yamaha finance"
                                    />
                                )}
                            </Grid>
                            <Grid item>
                                {mainFooter && (
                                    <SimpleMenu textStyle={styles.textStyle} />
                                )}
                                {/* {!mainFooter && (
                                    <FooterLinks
                                        to="/finance/legal"
                                        title="Finance Legal"
                                    />
                                )} */}
                            </Grid>
                            <Grid item>

                                {mainFooter && (this.props.isLoggedIn != true) && (
                                    this.props.status === "pending" ? <CircularProgress size={20} /> :
                                        <LoginModal textStyle={styles.textStyle} resetExternal={this.props.resetExternal} openExternal={this.props.openExternal?this.props.openExternal:false} />
                                )}
                                {mainFooter && (this.props.isLoggedIn) && (
                                    this.props.status === "pending" ? <CircularProgress size={20} /> :
                                        <AuthMenu userName={this.props.user} action={() => { this.logout() }} />
                                )}
                            </Grid>
                            <Grid item>
                                <FooterLinks
                                    to="/contact"
                                    title="Contact Us"
                                    textStyle={styles.textStyle}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        ) : null;
    }
}
const mapStateToProps = (state) => {

    return {
        isLoggedIn: state.authReducer.loggedIn,
        user: state.userReducer.user.name,
        status: state.userReducer.status
    }
}

export default connect(mapStateToProps)(withRouter(Footer))