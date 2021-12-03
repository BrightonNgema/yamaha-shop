import React from 'react'
import { Accordion } from 'components';

export default function MusicInstrumentsCop() {
    return (
        <Accordion
            heading="MUSIC INSTRUMENTS - Corporate"
            number={1}
            text={(
                <span>
                    Min R50k – Max R5 million
                                    <br />
                    Send application to : abfdealhub@wesbank.co.za or
                                    <br />
                    <a
                        href="https://www.wesbank.co.za/wesbankcoza/apply/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >https://www.wesbank.co.za/wesbankcoza/apply/</a>
                                    <br />
                    Customers (Juristic and Sole Props) can apply on the Company’s Website for Finance.
                                    <br />
                    Dealer needs to open up a supplier code.
                                    <br />
                    Deals below R1 million no financial statements required.
                                    <br />
                    Deals above R million, Audited financial statements required.
                                    <br /> 
                    Fleet Management Solution contact:  Trevor Saunders (Tsaunders@wesbank.co.za)
                                </span>
            )}
        />
    )
}
