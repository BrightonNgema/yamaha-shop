import React, { Component } from "react";
import { NavBar, Footer } from "components";
import { colors } from "theme";
import { Grid } from "@material-ui/core";
import { TopHeader } from "./TopHeader";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Toastr, Stepper } from "components";
import Dealership, { DealershipValidationSchema } from "../Sections/Dealership";
import Sale, { SaleValidationSchema } from "../Sections/Sale";
import Customer, { CustomerValidationSchema } from "../Sections/Customer";
// import ClubYamaha, { ClubYamahaValidationSchema } from "../Sections/ClubYamaha";
import Product, { ProductValidationSchema } from "../Sections/Product";
import ProductExtended from "../Sections/ProductExtended";
import DemographicsOne, {
    DemographicsOneValidationSchema
} from "../Sections/DemographicsOne";
import DemographicsTwo, {
    DemographicsTwoValidationSchema
} from "../Sections/DemographicsTwo";
import Business, { BusinessValidationSchema } from "../Sections/Business";
import Confirmation from "../Sections/Confirmation";
import formStepMatrix from "../Sections/matrix.js";
import moment from "moment";
import { isIE } from 'react-device-detect';
const axios = require("axios");

const validationMatrix = [
    {
        name: "Business",
        schema: BusinessValidationSchema
    },
    {
        name: "Dealership",
        schema: DealershipValidationSchema
    },
    {
        name: "Sale",
        schema: SaleValidationSchema
    },
    {
        name: "Customer",
        schema: CustomerValidationSchema
    },
    // {
    //     name: "ClubYamaha",
    //     schema: ClubYamahaValidationSchema
    // },
    {
        name: "Product",
        schema: ProductValidationSchema
    },
    {
        name: "DemographicsOne",
        schema: DemographicsOneValidationSchema
    },
    {
        name: "DemographicsTwo",
        schema: DemographicsTwoValidationSchema
    },
    {
        name: "Business",
        schema: DealershipValidationSchema
    }
];

export default class WarrantyContact extends Component {
    state = {
        loading: false,
        fields: {
            marketing_opt_in: true,
            soundbar_option: false,
            musiccast_option: false
        },
        errors: {},
        currentStep: 1,
        maxSteps: 1,
        feedbackVisible: false,
        feedbackMesasge: "",
        feedbackVariant: ""
    };

    sections = {
        Business,
        Dealership,
        Sale,
        Customer,
        // ClubYamaha,
        DemographicsOne,
        DemographicsTwo,
        Confirmation,
        Product,
        ProductExtended
    };

    componentDidMount = () => {
        this.setState({
            maxSteps: Math.max.apply(
                Math,
                this.getFormSections().rows.map(row =>
                    Math.max.apply(
                        Math,
                        row.sections.map(section => section.step)
                    )
                )
            )
        });
    };

    onChange = (name, value) => {
        this.setState((state, props) => {
            const currentFields = state.fields;
            currentFields[name] = value;
            return { fields: currentFields };
        });
    };

    hideFeedback = () => {
        this.setState({ feedbackVisible: false });
    };

    showFeedback = (feedbackVariant, feedbackMesasge) => {
        this.setState({
            feedbackVisible: true,
            feedbackMesasge,
            feedbackVariant
        });
    };

    submit = () => {
        const { currentStep, maxSteps, loading, fields } = this.state;
        const {
            match: {
                params: { type }
            }
        } = this.props;
        if (currentStep < maxSteps - 1) {
            this.setState(prevState => ({
                currentStep: prevState.currentStep + 1
            }));
        } else if (!loading) {
            this.setState({ loading: true });
            // const payload = {
            //     ...fields,
            //     fname: fields.names.split(" ")[0],
            //     lname: fields.names.split(" ")[1] || "",
            //     category: type,
            //     date_of_purchase:
            //         fields.date_of_purchase || moment().format("YYYY-MM-DD")
            // };

            const formData = new FormData();
            Object.keys(fields).map(key => {
                return formData.append(key, fields[key]);
            });
            formData.append(
                "date_of_purchase",
                fields.date_of_purchase || moment().format("YYYY-MM-DD")
            );
            formData.append("category", type.replace('_', " "));
            formData.append("fname", fields.names.split(" ")[0]);
            formData.append(
                "lname",
                fields.names.split(" ")[1] || fields.names.split(" ")[0]
            );
            const baseUrl = process.env.REACT_APP_API_URL;
            axios
                .post(`${baseUrl}warranty`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(({ data }) => {
                    // check for server validation.
                    if (
                        data.message === undefined &&
                        Object.keys(data).length > 0
                    ) {
                        return Promise.reject(
                            new Error(
                                "Please ensure all required fields are completed."
                            )
                        );
                    }
                    this.setState(prevState => ({
                        currentStep: prevState.currentStep + 1
                    }));
                    this.showFeedback("success", data.message);
                })
                .catch(error => {
                    this.showFeedback(
                        "error",
                        error.message ||
                        "An error occured while registering your warranty."
                    );
                })
                // always
                .then(() => {
                    this.setState({ loading: false });
                });
        }
    };

    getFormSections = () => {
        const {
            match: {
                params: { type }
            }
        } = this.props;
        switch (type) {
            case "golf_cars":
                return formStepMatrix.GOLFCARTS;
            case "home_audio":
            case "pro_audio":
            case "power_products":
            case "music":
                return formStepMatrix.MUSIC;
            case "marine":
                return formStepMatrix.MARINE;
            case "motorcycles":
                return formStepMatrix.MOTORCYCLES;
            default:
                // do nothing? or redirect to contact
                return [];
        }
    };

    getSchemasToValidate = currentStep => {
        const {
            match: {
                params: { type }
            }
        } = this.props;
        const rows = this.getFormSections().rows;
        const activeSections = rows.reduce((ac, row) => {
            const sections = row.sections.reduce((as, step) => {
                return step.step === currentStep ? as.concat(step.name) : as;
            }, []);
            return ac.concat(sections);
        }, []);
        const schemas = validationMatrix
            .filter(s => activeSections.indexOf(s.name) !== -1)
            .reduce((schema, s) => {
                return { ...schema, ...s.schema({ type }) };
            }, {});
        return schemas;
    };

    renderSection = (sectionName, renderProps) => {
        const {
            match: {
                params: { type }
            }
        } = this.props;

        if (this.sections[sectionName]) {
            const Section = this.sections[sectionName];
            return (
                <Section
                    key={`${sectionName}`}
                    {...renderProps}
                    onChange={this.onChange}
                    type={type}
                />
            );
        } else {
            return null;
        }
    };

    renderNextSubmit = renderProps => {
        const { currentStep, maxSteps, loading } = this.state;
        if (currentStep === maxSteps) return null;
        return (
            <Grid container spacing={10} style={{ color: "black" }}>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={6} style={{ display: "flex" }}>
                    <Stepper
                        loading={loading}
                        handleBack={() => {
                            this.setState(prevState => ({
                                currentStep: prevState.currentStep - 1
                            }));
                        }}
                        activeStep={this.state.currentStep}
                        steps={Array(this.state.maxSteps)
                            .join(".")
                            .split(".")}
                        onNext={() => {
                            renderProps.validateForm().then(errors => {
                                if (Object.keys(errors).length === 0) {
                                    this.submit();
                                } else {
                                    this.showFeedback(
                                        "error",
                                        "Please ensure all required fields are completed."
                                    );
                                }
                            });
                        }}
                    />
                </Grid>
            </Grid>
        );
    };

    renderFields = renderProps => {
        const {
            match: {
                params: { type }
            }
        } = this.props;
        const rows = this.getFormSections().rows;
        const { currentStep } = this.state;
        return (
            <Form key={`form_${type}`}>
                {rows.map((row, index) => {
                    return (
                        <Grid
                            row={`row_${index}`}
                            key={`row_${index}`}
                            container
                            spacing={10}
                            style={{ color: "black" }}
                        >
                            {row.sections
                                .filter(row => row.step === currentStep)
                                .map(section => {
                                    return (
                                        <Grid
                                            key={`section_${section.name}`}
                                            item
                                            xs={12}
                                            sm={6}
                                        >
                                            {this.renderSection(
                                                section.name,
                                                renderProps
                                            )}
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    );
                })}
                {this.renderNextSubmit(renderProps)}
            </Form>
        );
    };

    renderForm = () => {
        const { currentStep } = this.state;
        return (
            <Grid container spacing={10} style={{ color: "black" }}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            ...this.state.fields,
                            marketing_opt_in: true
                        }}
                        validationSchema={yup.object().shape({
                            ...this.getSchemasToValidate(currentStep)
                        })}
                        onSubmit={this.submit}
                        render={this.renderFields}
                    />
                </Grid>
            </Grid>
        );
    };

    renderFeedback = () => {
        const {
            feedbackVisible,
            feedbackMesasge,
            feedbackVariant
        } = this.state;
        return (
            <Toastr
                open={feedbackVisible}
                onClose={this.hideFeedback}
                message={feedbackMesasge}
                variant={feedbackVariant}
            />
        );
    };

    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Warranty",
                link: "/warranty"
            },
            {
                title: "Yamaha Finance",
                link: "/finance"
            },

            {
                title: "Find My Dealer",
                link: "/dealer"
            }
        ];
        const {
            match: {
                params: { type }
            }
        } = this.props;
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="warranty-heading-container">
                    <TopHeader type={type} />
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        {this.renderForm()}
                    </div>
                    {this.renderFeedback()}
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}
