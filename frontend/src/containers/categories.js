import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCategories} from '../actions/index'

class PostCategories extends Component {


  componentDidMount() {
    //dispatches the fetchCategories action to return the list of categories defined on the server in order to provide them as a list to the user
    this.props.fetchCategories();
  }

  render() {
    const {categories} = this.props;
    //if categories haven't loaded display a default message to prevent error
    if (!categories) {
      return <div>Loading...</div>
    }
    //return method to render the categories retrieved from teh fetchCatgeories action as a list
    return (
      <div >
        <ul className="categories">
          <Link to={`/`}>
            <li >View All Post Categories</li >
          </Link>
          {categories.map((cat, i) => (
            <Link key={i} to={`/categories/${cat.name}`}>
              <li >View Post By Category: {cat
                  .name
                  .charAt(0)
                  .toUpperCase() + cat
                  .name
                  .slice(1)}</li >
            </Link>
          ))}

        </ul>

      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {categories: categories}
}

export default connect(mapStateToProps, {fetchCategories})(PostCategories)