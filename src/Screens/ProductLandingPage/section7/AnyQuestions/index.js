import React from "react";
import { Button } from "components";

export default function AnyQuestions() {
    return (
        <div style={{ textAlign: "center" }}>
            <p className="section-large-heading">
                Have any questions?
            </p>
            <p
                style={{
                    color: "#BCBDBC",
                    marginBottom: 30,
                    textTransform: "initial",
                    margin: "10px auto",
                    width: 300,
                    maxWidth: "80%"
                }}
            >
                Go to our support page, or open up live chat to we can help
                answer them.
            </p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <div style={{ marginRight: 10 }}>
                    <Button
                        title="Go To Support"
                        link="/contact"
                        type="yamaha-btn-sm yamaha-btn-primary"
                    />
                </div>
                <div>
                    <Button
                        title="Live Chat"
                        link="/contact"
                        type="yamaha-btn-sm yamaha-btn-primary"
                    />
                </div>
            </div>
        </div>
    );
}
