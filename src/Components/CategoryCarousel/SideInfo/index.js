import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import CategoryInforText from "./CategoryInforText";
import CatergoryButtons from "./CatergoryButtons";
import CatergorySlideArrows from "./CatergorySlideArrows";
import { isMobile, isTablet } from "react-device-detect";
import "./index.css";
import { PropTypes } from "prop-types";

class SideInfo extends PureComponent {
    render() {
        const device = isMobile || isTablet ? "mobile" : "desktop";
        const {
            match: { params },
            activeData,
            next,
            previous,
            onMouseLeave,
            onMouseEnter
        } = this.props;
        return (
            <div className={`${device}-category-container`}>
                <CategoryInforText activeData={activeData} />
                <CatergoryButtons
                    params={params}
                    activeData={activeData}
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                />
                <CatergorySlideArrows next={next} previous={previous} />
            </div>
        );
    }
}

export default withRouter(SideInfo);
SideInfo.propTypes = {
    match: PropTypes.object.isRequired,
    activeData: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired
};
