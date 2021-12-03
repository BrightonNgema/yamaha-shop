export const homeAudio =
{
    state: {
        professional_installer: "", visit_dealer: "", further_details: ""
    },
    questions: [
        {
            text: "Will you require this product to be fully installed by a professional authorised Yamaha installer* or will you install yourself?",
            name: "professional_installer",
            type: "radio",
            answer: "",
            options: [
                {
                    label: "Authorised Installer",
                    value: "Authorised Installer"
                },
                {
                    label: "I will install myself",
                    value: "I will install myself"
                },
            ],

        },

        {
            text: "Did you visit a Yamaha dealership to test the product prior to making your purchase decision at Yamaha Online?",
            name: "visit_dealer",
            type: "radio", answer: "",
            options: [
                {
                    label: "Yes",
                    value: "Yes"
                },
                {
                    label: "No",
                    value: "No"
                },
            ],

        },
        {
            text: "Would you like to receive further details on the FREE training programmes?",
            name: "further_details", answer: "",
            type: "radio",
            options: [
                {
                    label: "Yes",
                    value: "Yes"
                },
                {
                    label: "No",
                    value: "No"
                },
            ],

        },
    ]
}
