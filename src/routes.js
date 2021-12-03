import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {
    HomePage,
    FinancePage,
    WarrantyPage,
    CategoryPage,
    ProductListPage,
    ProductLandingPage,
    ContactPage,
    AboutPage,
    DealerPage,
    NotFound,
    LegalPage,
    SupportPage,
    SearchPage,
    NewsPage,
    EventsPage,
    ArticlePage,
    WOYPage,
    RecruitmentPage,
    ComparePage,
    PromotionsPage,
    AmbassadorsPage,
    AmbassadorPage,
    EventPage,
    RegisterPage,
    AddressPage,
    PersonalDetailsPage,
    CartPage,
    OrderPage,
    MyAccountPage,
    SingleOrderPage,
    ConfirmationPage,
    DeliveryInfoPage,
    AddToCartPage,
    OrderSummary,
    ReturnIndex,
    HomeAudioPage,
    S3Bucket,
    ForgotPassword,
    GenericSuccessPage, AddressForm,
    ReturnAddressPage,
    ReturnSummaryPage,
    TermsAndConditionsPage,
    LoginPage,
    BlankScreen
} from "./Screens";
import { Cookies } from "components";



export default (
    <Router>
        <Cookies />
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/finance" exact component={FinancePage.Landing} />
            <Route
                path="/finance/types_of_finance"
                exact
                component={FinancePage.TypesOfFinances}
            />
            {/* <Route
                path="/finance/legal"
                exact
                component={FinancePage.FinanceLegalPage}
            /> */}
            <Route path="/warranty" exact component={WarrantyPage.Landing} />
            <Route
                path="/warranty/:type"
                exact
                component={WarrantyPage.Contact}
            />
            <Route path="/category/:cat" exact component={CategoryPage} />
            <Route
                path="/category/:cat/:subcat"
                exact
                component={ProductListPage}
            />
            <Route
                path="/category/:cat/:subcat/:prod"
                exact
                component={ProductLandingPage}
            />
            <Route path="/contact" component={ContactPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route path="/dealer" component={DealerPage} />
            <Route path="/legal" component={LegalPage} />
            <Route
                exact
                path="/recruitment"
                component={RecruitmentPage.VacanciesPage}
            />
            <Route
                exact
                path="/recruitment/:slug"
                component={RecruitmentPage.VacancyPage}
            />
            <Route path="/news" exact component={NewsPage} />
            <Route
                path="/news/:slug"
                render={(props) => (
                    <ArticlePage {...props} key={Math.random()} />
                )}
            />

            <Route path="/support" component={SupportPage} />
            <Route path="/promotions" component={PromotionsPage} />
            <Route exact path="/ambassadors" component={AmbassadorsPage} />
            <Route path="/ambassadors/:slug" component={AmbassadorPage} />
            <Route exact path="/events" component={EventsPage} />
            <Route path="/events/:slug" component={EventPage} />
            <Route path="/search" component={SearchPage} />

            <Route path="/world_of_yamaha" component={WOYPage} />
            <Route path="/compare" component={ComparePage} />

            <Route path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/blank" component={BlankScreen} />


            <Route exact path="/account/delivery" render={() => { return authorized(<AddressPage></AddressPage>) }} />
            <Route exact path="/account/delivery/:id" render={() => { return authorized(<AddressForm></AddressForm>) }} />
            <Route exact path="/account/orders/:id/returns" render={() => { return authorized(<ReturnIndex></ReturnIndex>) }} />
            <Route exact path="/account/orders" render={() => { return authorized(<OrderPage></OrderPage>) }} />
            <Route exact path="/account/orders/:id" render={() => { return authorized(<SingleOrderPage></SingleOrderPage>) }} />
            <Route
                path="/account/personal-details"

                render={() => { return authorized(<PersonalDetailsPage></PersonalDetailsPage>) }}
            />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/account" render={() => { return authorized(<MyAccountPage></MyAccountPage>) }} />
            <Route path="/confirmation/:id" component={ConfirmationPage} />
            <Route path="/delivery-info" component={TermsAndConditionsPage} />
            <Route exact path="/category/:cat/:subcat/:id/add-to-cart" component={AddToCartPage} />
            <Route path="/cart/delivery-info" component={DeliveryInfoPage} />
            <Route
                exact
                path="/cart/delivery/additional-info"
                component={HomeAudioPage}
            />

            {/* @TODO change the path accordingly */}
            <Route exact
                path="/cart/order-summary"
                component={OrderSummary}
            />
            <Route
                path="/s3bucket"
                component={S3Bucket}
            />
            <Route
                path="/password-reset/:token"
                render={(props) => { return loginForgotPassword(<ForgotPassword>{props}</ForgotPassword>) }}
            />
            <Route
                path="/success"
                component={GenericSuccessPage}
            />

            <Route exact path="/account/order/return address" render={() => { return authorized(<ReturnAddressPage></ReturnAddressPage>) }} />
            <Route exact path="/account/orders/:order/return summary/:id" render={() => { return authorized(<ReturnSummaryPage></ReturnSummaryPage>) }} />

            <Route
                exact
                path="/terms and conditions"
                component={TermsAndConditionsPage}
            />

            <Route
                exact
                path="/privacy policy"
                component={TermsAndConditionsPage}
            />


            <Route
                exact
                path="/returns"
                component={TermsAndConditionsPage}
            />

            <Route component={NotFound} />
            {/* <Route
                path="/category/:cat/:subcat/:prod"
                component={ComingSoonPage}
            /> */}
        </Switch>
    </Router>
);
export function authorized(child) {
    let token = sessionStorage.getItem("token");
    if (token) {
        return child
    } else {
        return (<Redirect to="/"></Redirect>)
    }
}

export function loginForgotPassword(route) {
    let token = sessionStorage.getItem("token");
    if (token) {
        return (<Redirect to="/"></Redirect>)
    } else {
        return route
    }
}
