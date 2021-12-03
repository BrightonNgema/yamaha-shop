import React from "react";
import { Button } from "components";
import "./index.css";
import {withRouter} from "react-router-dom";


const CatergoryButtons = ({ activeData }) => {
    return (
        <div style={{ flexGrow: 1, marginBottom: 50 }}>
            <ul className="category-buttons-container">
                <li>
                    <Button
                        title={`READ MORE`}
                        link={`/news/${activeData.slug}`}
                        type="yamaha-btn yamaha-btn-primary"
                    />
                </li>
            </ul>
        </div>
    );
}

export default withRouter(CatergoryButtons);