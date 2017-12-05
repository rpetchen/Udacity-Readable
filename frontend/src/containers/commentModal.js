import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'
import {editComment, addComment} from '../actions/index'

class CommentModal extends Component {
//close function using close and reset props passed down from the parent to clear the form 
  close = () => {
    this.props.close()
    this.props.reset()
  }

//submit method which takes the input values and determines whether to perform an editComment dispatch or an addComment dispatch based on the action propped passed down from the parent component 
  submit = (values) => {
    this.props.action === "edit" ? this.props.editComment(this.props.id, values, () => { this.close()})
      : this.props.addComment(values, this.props.parentID, () => {this.close()})
  }

  required = value => value ? undefined : 'Required Field'

  //render feild method which serves as the component for the redux form fields and generates a text area or input
  renderField = ({ disabled, input, label, type, textarea, meta: { touched, error, warning } }) => {
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
  }

  render() {

    const {id} = this.props;
    const {handleSubmit} = this.props;
    return (

      <Modal show={this.props.showModal} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(this.submit)}>

            <div>

              <div>
                <Field
                  name="body"
                  component={this.renderField}
                  type="text"
                  placeholder={"Comment Text"}
                  textarea={true}
                  validate={this.required}
                  label="Comment"/>
                <Field
                  name="author"
                  component={this.renderField}
                  type="text"
                  placeholder={"Author"}
                  textarea={false}
                  validate={this.required}
                  label="Author"
                  disabled={this.props.authorAction}/>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    initialValues: {
      body: ownProps.body,
      author: ownProps.author
    }
  }
};

var CommentForm = reduxForm({form: 'CommentModal', enableReinitialize: true, destroyOnUnmount: false})(CommentModal);

export default connect(mapStateToProps, {editComment, addComment})(CommentForm);
