import React from 'react'
import { Accordion } from 'components';

export default function MusicInstrumentsInd() {
    return (
        <Accordion
            heading="MUSIC INSTRUMENTS - INDIVIDUAL"
            number={1}
            text={(
                <span>
                    Min R5k – Max R200k
                                    <br />
                    A regular monthly income of at least R5 000;
                                    <br />
                    A clear credit record;
                                    <br />
                    The last 3 months’ payslips or bank statements;
                                    <br />
                    A clear copy of the ID document;
                                    <br />
                    Details of the bank account into which the salary is paid.
                                    <br />
                    A recent Utility Bill (not older than 3 months) - confirming residential address.
                                    <br />
                    Call 0861 238 252 should you have any enquiry
                                </span>
            )}
        />
    )
}
