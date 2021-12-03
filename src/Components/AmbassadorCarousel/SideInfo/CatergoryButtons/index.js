import React from "react";
import { Button } from "components";
import "./index.css";
import {withRouter} from "react-router-dom";
import { scroller } from 'react-scroll';


const anchor = section => {
   
    scroller.scrollTo(section, {
        duration: 500,
        hashSpy: true,
        delay: 100,
        smooth: true,
        offset: -100
    });
};


const CatergoryButtons = ({ activeData }) => {
    return (
        <div style={{ flexGrow: 1, marginBottom: 50 }}>
            <ul className="category-buttons-container">
                <li>
                    <Button
                        title={`READ MORE`}
                        // link={`/ambassadors/${activeData.slug}`}
                        onClick={() => anchor(activeData.division.toLowerCase())}
                        type="yamaha-btn yamaha-btn-primary"
                    />
                </li>
            </ul>
        </div>
    );
}

export default withRouter(CatergoryButtons);