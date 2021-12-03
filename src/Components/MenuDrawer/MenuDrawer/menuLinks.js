const financeLinks = props => {
    const { match } = props;
    if (match.url === "/finance") {
        return {
            title: "Types Of Finance",
            link: "/finance/types_of_finance"
        };
    }
    return {
        title: "Yamaha Finance",
        link: "/finance"
    };
};

// const warrantyLinks = props => {
//     const { match } = props;
//     if (match.url === "/warranty") {
//         return;
//     }
//     return {
//         title: "Warranty",
//         link: "/warranty"
//     };
// };

const menuLinks = props => {
    // return props;
    return [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Promotions",
            link: "/promotions"
        },
        {
            title: "News",
            link: "/news"
        },
        {
            title: "Events",
            link: "/events"
        },

        {
            title: "Support",
            link: "/support"
        },
        {
            title: "Warranty",
            link: "/warranty"
        },
        financeLinks(props),
        // {
        //     title: "Sign In",
        //     link: "/dealer"
        // },
        {
            title: "Find My Dealer",
            link: "/dealer"
        },
        {
            title: "About",
            link: "/about"
        },
        {
            title: "Recruitment",
            link: "/recruitment"
        },
        {
            title: "Ambassadors",
            link: "/ambassadors"
        },
        {
            title: "Legal",
            link: "/legal"
        }
    ];
};

export default menuLinks;
