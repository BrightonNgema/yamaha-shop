import React, { Component } from "react";
import { Accordion, NavBar, Footer } from "components";
import { colors } from "theme";
import "./index.css";
import { animateScroll } from "react-scroll";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { isIE } from "react-device-detect";

class FinanceLegalPage extends Component {
    componentDidMount() {
        animateScroll.scrollToTop();
    }

    render() {
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Legal</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/legal"
                    />
                    <meta
                        name="description"
                        content="The Terms and Conditions page of Yamaha (“Yamaha”) website. This page describes the legal agreement (the “Agreement”) governing your use of Yamaha’s website at https://www.yamaha.co.za (the “Yamaha Website” or “Website”)"
                    />
                    <meta
                        name="keywords"
                        content="Legal, privacy policy, terms and conditions"
                    />
                </Helmet>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    finance
                    menuColor="black"
                    logoColor="black"
                />
                <div className="type-main">
                    <div className="type-heading-container">
                        <h1 className="type-heading">TERMS AND CONDITIONS</h1>
                        <span className="type-subheading">
                            Thank you for visiting the Terms and Conditions page
                            of Yamaha (“Yamaha”) website. This page describes
                            our legal agreement (the “Agreement”) governing your
                            use of Yamaha’s website at{" "}
                            <Link style={{ color: "#56585A" }} to="/">
                                https://www.yamaha.co.za
                            </Link>
                            (the “Yamaha Website” or “Website”).
                        </span>
                    </div>
                    <div className="accordian-main">
                        <Accordion
                            heading="1. Yamaha Corporation Website - Terms and Conditions"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    This website, together with the sub websites
                                    that are accessible through it, (hereinafter
                                    referred to as the "site") is published and
                                    maintained by Yamaha Corporation
                                    (hereinafter “Yamaha”). <br />
                                    <br />
                                    When you access, browse or use the site, you
                                    understand and accept, without limitation or
                                    qualification, the terms of use below. When
                                    you access the sites that are accessible
                                    through this website, you accept any
                                    additional terms of the sub websites as if
                                    they have their own terms of use. Please
                                    read it carefully as Yamaha does not accept
                                    any liability related to sub websites.{" "}
                                    <br />
                                    <br />
                                    Information on this site may contain
                                    technical inaccuracies or typographical
                                    errors. Information may be altered or
                                    updated at any time without notice.
                                </span>
                            }
                        />
                        <Accordion
                            heading="2. Electronic Communications"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    By accepting these terms of use, you:
                                    <ul>
                                        <li>
                                            Consent to receive communications
                                            from Yamaha by e-mail transmission
                                            or by posting to this site, and
                                        </li>
                                        <li>
                                            Agree that all communications that
                                            Yamaha provides to you
                                            electronically, satisfy any legal
                                            requirement that such communications
                                            be in writing in terms of the
                                            provisions of the Electronic
                                            Communications and Transactions Act
                                            25 of 2002, as amended.
                                        </li>
                                    </ul>
                                </span>
                            }
                        />
                        <Accordion
                            heading="3. Use of site "
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    This site is provided for your personal and
                                    non-commercial use only. All content
                                    included in this site, including but not
                                    limited to any text, graphics, images,
                                    logos, button icons, data compilations,
                                    software, audio and video (hereinafter
                                    "materials"), remains the exclusive property
                                    of Yamaha. <br />
                                    <br />
                                    You may not distribute, exchange, modify,
                                    reproduce, perform, sell or transmit the
                                    materials for any personal, business,
                                    commercial or public purposes. The materials
                                    are protected by applicable laws, including
                                    South Africa and International Copyright and
                                    Trademark laws, and any unauthorized use of
                                    any Materials may violate copyright,
                                    trademark, and other applicable laws. You
                                    may not frame or utilize framing techniques
                                    to enclose any portion of this site or any
                                    materials without express written consent of
                                    Yamaha.
                                    <br />
                                    <br />
                                    You are granted a revocable and nonexclusive
                                    right to create a hyperlink to this site so
                                    long as the link does not portray Yamaha,
                                    its affiliates, or their products or
                                    services in a false, misleading, derogatory,
                                    or otherwise offensive manner. You may not
                                    use any Yamaha materials as part of the link
                                    without express written consent of Yamaha.
                                    <br />
                                    <br />
                                    If you breach any of these terms, your
                                    authorization to use this site automatically
                                    terminates and you must immediately destroy
                                    any downloaded or printed materials in your
                                    possession.
                                </span>
                            }
                        />
                        <Accordion
                            heading="4. Submission of data by user"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    Other than personally identifiable
                                    information, which is covered under the
                                    Yamaha Privacy Policy, any material,
                                    information or other communication you
                                    transmit or post to this site (hereinafter
                                    "communications") will be considered
                                    non-confidential and non-proprietary. Yamaha
                                    will incur no obligations in respect of
                                    these communications. You will grant Yamaha
                                    and its designees a nonexclusive,
                                    royalty-free, perpetual, irrevocable, and
                                    fully sublicensable right to use, reproduce,
                                    modify, adapt, publish, translate, create
                                    derivative works from, distribute, and
                                    display throughout the world in any media
                                    the communications and all data, images,
                                    sounds, text, and other things embodied
                                    therein for any and all commercial or
                                    non-commercial purposes. <br />
                                    <br />
                                    You are prohibited from posting or
                                    transmitting to / from this site any
                                    unlawful, threatening, libelous, defamatory,
                                    obscene, pornographic, invasive of privacy,
                                    infringing of intellectual property rights,
                                    or other material that would violate any
                                    law. Yamaha reserves the right (but not the
                                    obligation) to remove or edit such content
                                    without notice.
                                </span>
                            }
                        />
                        <Accordion
                            heading="5. Links to other websites"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    Links to other websites are provided for
                                    your convenience only and Yamaha does not
                                    endorse, recommend or represent those sites
                                    in any way. Yamaha does not control and is
                                    not responsible for any such sites or their
                                    content. Yamaha disclaims all warranties,
                                    expressed or implied, as to the accuracy,
                                    legality, reliability or validity of any
                                    content of such sites.
                                </span>
                            }
                        />
                        <Accordion
                            heading="6. Disclaimer of warranties "
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    The information, materials and services
                                    provided on or via this site, are provided
                                    "as is" or “voetstoots” and without any
                                    warranties of any kind, express or implied,
                                    including but not limited to warranties of
                                    compliance with applicable laws,
                                    merchantability, fitness for a particular
                                    purpose, or non-infringement of third party
                                    rights including intellectual property
                                    rights. Yamaha does not warrant the accuracy
                                    or completeness of the materials or services
                                    on or via this site. Yamaha further does not
                                    warrant that this site, its servers, or
                                    e-mail sent from Yamaha are free of viruses
                                    or other harmful components.
                                </span>
                            }
                        />
                        <Accordion
                            heading="7. Limitation of liability"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    Under no circumstances shall Yamaha be
                                    liable for any direct, indirect, incidental,
                                    consequential, punitive or special damages
                                    whatsoever (including, without limitation,
                                    those resulting from lost profits, lost data
                                    or business interruption) arising out of the
                                    use, inability to use of, or errors or
                                    omissions in the contents or functions of
                                    this site, even if Yamaha or an authorized
                                    representative thereof has been advised of
                                    the possibility of such damages. If your use
                                    of the materials, information or services
                                    from this site results in the need for
                                    servicing, repair or correction of equipment
                                    or data, you assume all costs thereof.
                                </span>
                            }
                        />
                        <Accordion
                            heading="8. Applicable laws"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    If you choose to access this site from
                                    outside of South Africa, you do so on your
                                    own initiative and are responsible for
                                    compliance with applicable local and
                                    International laws. These terms of use will
                                    be governed by and construed in accordance
                                    with the laws of South Africa, without
                                    giving effect to any principles of conflicts
                                    of laws. You consent to the jurisdiction of
                                    High Court of South Africa in respect of any
                                    disputes arising from, related to or in
                                    connection with this site or any materials.
                                </span>
                            }
                        />
                    </div>

                    <div className="type-heading-container">
                        <h1 className="type-heading">PRIVACY POLICY</h1>
                        <span className="type-subheading">
                            The purpose of this Notice is to keep you informed
                            of: (1) personal information we may collect from or
                            about you Yamaha.co.za; (2) how we may use and share
                            that information Yamaha.co.za ; (3) the choices and
                            resources you have with respect to the forgoing
                            Yamaha.co.za; (4) our collection, use and sharing of
                            other non-personal information Yamaha.co.za; and (5)
                            additional information about the Yamaha Website &
                            Yamaha’s privacy practices Yamaha.co.za. Our primary
                            purpose in the collection and use of this
                            information is to further our efforts to interact
                            and build relationships with you, our potential or
                            existing customers, in order to provide a diverse
                            array of innovative and reliable products.
                        </span>
                    </div>

                    <div className="accordian-main">
                        <Accordion
                            heading="1. Privacy policy and consent by user"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    By accessing, browsing, using the Yamaha
                                    site, you confirm that you have read our
                                    terms of this policy and you hereby agree
                                    thereto. Should you not accept any term in
                                    this policy, immediately seize to access,
                                    browse, use this site or proceed to provide
                                    us with your Personal Information.
                                    <br />
                                    <br /> This website you have entered is
                                    operated by / on behalf of Yamaha
                                    Corporation (hereinafter “Yamaha”). Yamaha
                                    complies with the laws and regulations
                                    regarding personal data protection and place
                                    great importance on protecting your privacy.
                                    <br />
                                    <br />
                                    This Policy prescribes the type of
                                    information that we collect and how we use
                                    and manage such information.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="2. Collection of Personal Information"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    "Personal Information" (“PI”), as referenced
                                    in this Policy, means personally
                                    identifiable information including, without
                                    limitation, your name, address, telephone
                                    number, and e-mail address. You may be asked
                                    for PI to allow you to order Yamaha products
                                    or services, participate in sales promotion
                                    services or prize competitions, answer our
                                    questionnaires or inquiries by e-mail or
                                    through the website, register as a Yamaha
                                    user, monitor Yamaha products, or e-mail
                                    news services concerning the Yamaha product
                                    lines, etc. We will not collect any PI
                                    unless you provide such information to us
                                    voluntarily. When you provide us with PI,
                                    you authorize us to use such information in
                                    accordance with the terms of this Policy. If
                                    you do not agree with any term in this
                                    Policy, please do not provide us with your
                                    PI. Certain services offered may be
                                    conditioned on the provision of your PI due
                                    to the nature thereof.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="3. How we use your information"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    When we collect your PI, we reasonably
                                    specify the purpose of such collection. Any
                                    PI provided will be used to meet your
                                    request such as forwarding promotional
                                    Yamaha products / services. We may also use
                                    your PI to contact you regarding other
                                    products and services that may be of
                                    interest to you. If you do not wish to be
                                    contacted by us concerning other products or
                                    services that may be of interest to you, you
                                    can request that we limit our contact with
                                    you to the express purpose that you provided
                                    your PI.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="4. Cookies"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    “Cookies” - information that may be stored
                                    in your computer's hard disk drive when you
                                    visit a website. We use cookies as a tool to
                                    allow us to customize your experience to
                                    better match your interests and preferences,
                                    or to simply facilitate your signing-in to
                                    use our services. Most browsers are
                                    initially set to accept cookies. If you do
                                    not wish to accept cookies, you can set your
                                    computer to refuse cookies or to alert you
                                    when cookies are being stored. If you refuse
                                    to use cookies, our ability to provide you
                                    with personalized services would be limited.
                                    Please refer to your browser instructions or
                                    "help" screen to learn more about these
                                    functions.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="5. Data Integrity"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    Yamaha processes personal information only
                                    for the purpose for which it was collected
                                    and in accordance with this Privacy Policy.
                                    We review our data collection, storage and
                                    processing practices to ensure that we only
                                    collect, store and process the personal
                                    information needed to provide or improve our
                                    services. We take reasonable steps to ensure
                                    that the personal information we process is
                                    accurate, complete, and current, but we
                                    depend on our users to update or correct
                                    their personal information whenever
                                    necessary and possible.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="6. Share of Personal Information with Third Parties"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    We do not, in principle, share any PI with
                                    any third parties, except as provided in
                                    this Policy. We may retain third parties to
                                    act as our agent to analyze data we collect,
                                    including PI, solely to help us improve our
                                    products, services and websites. Otherwise,
                                    we may disclose your PI to the distributing
                                    company delivering Yamaha products or other
                                    materials and to the bank transferring the
                                    expenses from your account. Your inquiry may
                                    be directed to third parties such as Yamaha
                                    group companies for your convenience
                                    depending upon the subject of your inquiry.
                                    These third parties are expressly prohibited
                                    from using or disclosing your Personal
                                    Information in any other way.
                                    <br />
                                    <br />
                                    Please note that we will release PI if in
                                    our opinion we are required or authorized to
                                    do so by or pursuant to laws or regulations,
                                    or by a search warrant, subpoena, court
                                    order or other legal process.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="7. Changes in our policy"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    We reserve the right to alter or remove this
                                    Policy at any time in our discretion.
                                    Whenever we make any alteration to this
                                    Policy, we will post the changes here. We
                                    advise you to visit this page frequently to
                                    stay informed of any changes. When you use
                                    our services after the alteration of this
                                    Policy, you signify that you agree to the
                                    alteration of this Policy.
                                </span>
                            }
                        />{" "}
                        <Accordion
                            heading="8. Who to contact"
                            number={1}
                            text={
                                <span style={{ textTransform: "initial" }}>
                                    If you have any comments / questions about
                                    this Policy or have requests to correct,
                                    add, update, or delete your PI, please write
                                    to us from Other Inquiries page in Customer
                                    Support page or other customer support
                                    service websites linked to this website
                                    through which you use our service. Before we
                                    receive your requests to correct, add to,
                                    update, or delete PI, we may verify your
                                    identity to prevent PI from being altered
                                    unlawfully.
                                </span>
                            }
                        />{" "}
                    </div>
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}

export default FinanceLegalPage;
