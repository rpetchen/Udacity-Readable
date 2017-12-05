import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {fetchPost, fetchCategories, addPost, editPost} from '../actions/index';

class PostEntry extends Component {

 //submit method that logically examines parameters to determine whether to dispatch an addPost or editPost action
  submit = (values) => {
    if (!this.props.match.params.id) {
      addPost(values, () => {this.props.history.push('/')});
      } 
    else if (this.props.match.params.id) {
      const val = {
        body: values.body,
        title: values.title
      }
      editPost(this.props.match.params.id, val, () => {this.props.history.push('/')});
    }
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchCategories();
  }

  //validations for both input fields and select fields
  required = value => value ? undefined: 'Required Field';

  selectRequired = value => this.props.catNames.includes(value) ? undefined: 'Invalid Category Selection';
  
  //render method used as the field component for textarea and input fields                                                     
  renderField = ({disabled, input, label, type, textarea, meta: { touched, error, warning } }) => {
    const textareaType = <textarea {...input} placeholder={label} type={type}/>;
    const inputType = <input {...input} placeholder={label} type={type} disabled={disabled}/>;
    return (
      <div>
        <label>{label}</label>
        <div>
          {textarea ? textareaType : inputType}
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
  };
  //render method used as the field component for select fields
  renderSelectField = ({disabled, input, label, type, meta: { touched, error }, children }) => (
    <div>
      <label>{label}</label>
      <div>
        <select disabled={disabled} {...input}>
          {children}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  render() {

    const {id} = this.props.match.params;
    const {categories} = this.props;
    const {handleSubmit} = this.props;
    return (
      <div>
        {(this.props.match.params.id)
          ? <h1>
              Edit Post
            </h1>
          : <h1>
            Create Post
          </h1>}

        <form onSubmit={handleSubmit(this.submit)}>

          <div>

            <Field
              name="title"
              component={this.renderField}
              type="text"
              placeholder={"Author"}
              textarea={false}
              validate={this.required}
              label="Title"/>
            <Field
              name="author"
              component={this.renderField}
              type="text"
              placeholder={"Author"}
              textarea={false}
              validate={this.required}
              label="Author"
              disabled={(id) ? true : false}/>
            <Field
              name="body"
              component={this.renderField}
              type="text"
              placeholder={"Comment Text"}
              textarea={true}
              validate={this.required}
              label="Post Body"/>

            <Field
              name="category"
              validate={this.selectRequired}
              label="Post Category"
              component={this.renderSelectField}
              disabled={(id) ? true : false}>
              <option></option>
              {categories.map((cat, i) => (
                <option value={cat.name} key={i}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </Field>

          </div>

          <button
            style={{
            marginTop: '10px'
          }}
            className="btn btn-primary "
            type="submit">Submit</button>
        </form>
      </div>

    );
  }
}

const mapStateToProps = ({ posts, categories}, ownProps) => {
  const catNames = Object.values(categories).map((cat) => cat.name);
  return {
    catNames: catNames,
    categories: categories,
    initialValues: posts[ownProps.match.params.id]
  }
};

const PostForm = reduxForm({form: 'PostForm', enableReinitialize: true, destroyOnUnmount: true})(PostEntry);

export default connect(mapStateToProps, {fetchPost, fetchCategories, addPost, editPost})(PostForm);