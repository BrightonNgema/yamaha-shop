import React from "react";
// import { colors } from "theme";
import { withRouter } from "react-router-dom";
// import { icons } from "assets";
import ViewCompare from "./ViewCompare";

function BottomRightOptions({ history, match, onPageDownload, onPageEmail }) {
    const isLandingPage = match.path.includes(":prod");
    if (match.path.includes("/category/:cat/:subcat")) {
        return (
            <ViewCompare
                isLandingPage={isLandingPage}
                onView={() => history.push("/compare")}
            />
        );
    // } else if (match.path === "/compare") {
    //     return (
    //         <div style={{ display: "inline-flex" }}>
    //             <div
    //                 onClick={() => history.push("/compare")}
    //                 style={{ display: "inline-flex" }}
    //             >
    //                 <img
    //                     alt="yamaha download icon"
    //                     src={icons.cloud}
    //                     style={{ width: 20, magrginRight: 5 }}
    //                 />
    //                 <span
    //                     onClick={onPageDownload}
    //                     style={{
    //                         fontSize: 12,
    //                         color: colors.dark,
    //                         cursor: "pointer",
    //                         pointerEvents: "all",
    //                         margin: "auto 10px auto 5px",
    //                         textAlign: "center"
    //                     }}
    //                 >
    //                     download
    //                 </span>
    //             </div>

    //             <div
    //                 onClick={onPageEmail}
    //                 style={{ display: "inline-flex" }}
    //             >
    //                 <img
    //                     alt="email yamaha page"
    //                     src={icons.email}
    //                     style={{ width: 20, magrginRight: 5 }}
    //                 />
    //                 <span
    //                     style={{
    //                         fontSize: 12,
    //                         color: colors.dark,
    //                         cursor: "pointer",
    //                         pointerEvents: "all",
    //                         margin: "auto 0px auto 5px",
    //                         textAlign: "center"
    //                     }}
    //                 >
    //                     Email
    //                 </span>
    //             </div>
    //         </div>
    //     );
    } else {
        return null;
    }
}
export default withRouter(BottomRightOptions);
