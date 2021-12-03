import React from 'react'
import { Accordion } from 'components';

export default function Motobike() {
    return (
        <Accordion
            heading="MOTORBIKE"
            number="3"
            text={(
                <span>
                    A regular monthly income of at least R6 500.00;
                                    <br />
                    A clear credit record;
                                    <br />
                    The last 3 months' payslips or bank statements;
                                    <br />
                    A clear copy of the ID document and valid motorbike license.
                                    <br />
                    Details of the bank account into which the salary is paid.
                                    <br />
                    A recent Utility Bill(not older than 3 months) - confirming residential address.
                                    <br />
                    F & I Business Centre 086 110 2933  should you have any enquiry.
                                </span>
            )}
        />
    )
}
