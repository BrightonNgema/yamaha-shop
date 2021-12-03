import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
// import Products from "./Products";
import SubCategory from "./SubCategory";
import Types from "./Types";

class MenuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activetype: "",
            subtypes: this.props.subtypes,
            expanded: "panel" + this.props.subcategory.index,
            subIndex: this.props.subcategory.index,
            catId: this.props.category.id
        };
    }

    activePanel = (name, index) => {
        const { isProducts, match, history } = this.props;
        const panel = name + index;
        const subcat = this.state.subtypes[index].name;
        if (isProducts) {
            this.setState({ expanded: panel, subIndex: index }, () => {
                this.props.onActiveSub({
                    ...this.state.subtypes[index],
                    index
                });
                return history.push(`/category/${match.params.cat}/${subcat}`);
            });
        } else {
            if (panel === this.state.expanded) {
                return this.setState({ expanded: "" });
            } else {
                this.props.onActiveSub({
                    ...this.state.subtypes[index],
                    index
                });
                return this.setState({ expanded: panel, subIndex: index });
            }
        }
    };

    renderMenuList() {
        if (this.state.subtypes.length === 0) return null;
        return this.state.subtypes.map((item, index) =>
            this.renderSubCategory(item, index)
        );
    }

    onType = type => {

        const { isProducts, match, history } = this.props;
        const { subtypes, subIndex } = this.state;
        const subcategory = subtypes[subIndex].name;

        if (!isProducts)
            return history.push({
                pathname: `/category/${match.params.cat}/${subcategory}`,
                state: type
            });
        if (type === this.state.activetype) {
            return this.setState({ activetype: "" });
        }
        return this.setState({ activetype: type });
    };

    renderSubCategory(item, index) {
        if (!item) return null;
        return (
            <SubCategory
                key={index}
                index={index}
                subcatIndex={this.props.subcategory.index}
                item={item}
                isProducts={this.props.isProducts}
                types={this.renderTypes(item.types)}
                activePanel={this.activePanel}
            />
        );
    }

    renderTypes(types) {
        // const {
        //     isProducts,
        //     match: { params }
        // } = this.props;
        // const subcategory = isProducts
        //     ? params.subcat
        //     : this.state.subtypes[this.props.subcategory.index].subcategory;
        if (!types) return null;
        return types.map(type => {
            // if (type.products.length < 1) return null
            return (
                <Types
                    key={type.name}
                    typename={type.name}
                    activetype={this.state.activetype}
                    onType={this.onType}
                    // productList={
                    //     this.props.isProducts && (
                    //         <Products
                    //             products={type.products}
                    //             to={`/category/${
                    //                 this.props.category.name
                    //             }/${subcategory}`}
                    //         />
                    //     )
                    // }
                />
            );
        });
    }

    render() {
        return (
            <div
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
            >
                {this.renderMenuList(this.props.items)}
            </div>
        );
    }
}

export default withRouter(MenuList);
