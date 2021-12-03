import React from 'react'
import { Accordion } from 'components';

export default function Marine() {
    return (
        <Accordion
            heading="MARINE"
            number="4"
            text={(
                <span>
                   Client must have a valid skipper license.
                                    <br />
                    A clear credit record.
                                    <br />
                    The last 3 months' payslips or bank statements;
                                    <br />
                    A clear copy of the ID document and valid motorbike license.
                                    <br />
                    Details of the bank account into which the salary is paid.
                                    <br />
                    Boat must have a Valid buoyancy certificate, Certificate of Fitness.
                                    <br />
                    Dealer quote needs to reflect the year models of each : boat, motor and trailer.
                                    <br /> 
                    Boat motor/s only can be financed with the same requirements above PLUS we need proof of encumbrance. 
                    Proof of purchase AND payment of the boat onto which the motor/s are to be attached is required. 
                    e.g. dealer invoice + 
                    bank statement showing payment made, as well as the natis document for the trailer – which needs to be in the client’s name.
                                </span>
            )}
        />
    )
}
