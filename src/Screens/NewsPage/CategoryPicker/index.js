import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { primaryTheme } from 'theme';
import './index.css';
export class CategoryPicker extends Component {

  static propTypes = {
    categories: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    categories: [],
    onChange: (selectedCategories) => console.log('CategoryPicker.onChange', selectedCategories),
  };

  constructor(props) {
    super(props);

    this.state = {
      categories: props.categories,
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.categories !== this.props.categories) {
      // update and retain selected state
      this.setState({ categories: this.props.categories.map(category => {
        const newCategory = category;
        const oldCategory = prevProps.categories.find(c => c.name === newCategory.name);
        newCategory.selected = oldCategory ? oldCategory.selected : false;
        return newCategory;
      }) });
    }
  }

  toggleSelected = (index) => {
    this.setState((prevState) => {
      const newCategories = prevState.categories;
      newCategories[index].selected = !newCategories[index].selected;
      return { categories: newCategories };
    }, () => {
      const { onChange } = this.props;
      const { categories } = this.state;
      onChange(categories
        .filter(category => category.selected)
        .map(category => category.name));
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <ThemeProvider theme={primaryTheme} >
        {categories.map((category, index) => <Button
            variant="contained"
            color={category.selected ? "primary" : "secondary"}
            key={`cat_${category.name}`}
            onClick={() => {
              this.toggleSelected(index);
            }}
            className="category-button"
            style={{ margin: primaryTheme.spacing(1) }}
          >
            {category.name}
          </Button>
        )}
      </ThemeProvider>
    )
  }
}

export default CategoryPicker
