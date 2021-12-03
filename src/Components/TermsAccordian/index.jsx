import React from "react";
import Accordion from '../Accordion/index'
import { privacyPolicy, returnsPolicy, termsAndConditions } from "components";


export default function TermsAccordion() {
    return (
        <div>
            <hr style={{ margin: 0 }} />
            <Accordion
                heading="privacy policy"
                number={1}
                children={
                    privacyPolicy()
                }
            />
            <Accordion
                heading="returns policy"
                number={1}
                children={
                    returnsPolicy()
                }
            />
            <Accordion
                heading="Terms and Conditions"
                number={1}
                children={
                    termsAndConditions()
                }
            />
        </div>
    );
}