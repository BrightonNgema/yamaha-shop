import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
// import Products from "./Products";
import MenuBar from "./MenuBar";
class AboutMenuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activetype: "",
            abouts: this.props.data,
            expanded: "panel" + this.props.index
        };
    }

    activePanel = (name, index) => {
        const panel = name + index;
        if (panel === this.state.expanded) {
            return this.setState({ expanded: "" });
        } else {
            this.props.onActive({
                ...this.state.abouts[index],
                index
            });
            return this.setState({ expanded: panel, subIndex: index });
        }
    };

    renderMenuList() {
        if (this.state.abouts.length === 0) return null;
        return this.state.abouts.map((item, index) =>
            this.renderSubCategory(item, index)
        );
    }

    renderSubCategory(item, index) {
        if (!item) return null;
        return (
            <MenuBar
                key={index}
                index={index}
                aboutIndex={this.props.index}
                item={item}
                activePanel={this.activePanel}
            />
        );
    }

    render() {
        return <div>{this.renderMenuList(this.props.items)}</div>;
    }
}

export default withRouter(AboutMenuList);
