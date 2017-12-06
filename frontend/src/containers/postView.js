import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPost, fetchComments, fetchComment, deleteComment, voteComment, votePost, deletePost} from '../actions/index';
import PostDetail from '../components/postDetail';
import CommentDetail from '../components/commentDetails';
import CommentModal from '../containers/commentModal';
import {ListGroup, ListGroupItem, Panel, Button} from 'react-bootstrap';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comment: ""
    }
  }
//edit comment method used to set the local state that toggles the modal on/off and stores the data element being modified by providing the action dispatcher a callback to set the state
  editComment = (id) => {
    this.props.fetchComment(id, (data) => { 
      this.setState({comment: data, commentId: id, showModal: true, disableAuthor: true, action: 'edit'})
      })
  }

//method to close the comment modal 
  closeModal = () => {
    this.setState({showModal: false, comment: '', commentId: '', disableAuthor: '', action: 'close'})
  };
//method to delete a comment which takes the id of the comment as a parameter and dispatches a delete comment action with the id
  deleteComment = (id) => {
    this.props.deleteComment(id)
  };
//method to display the 'create comment' version of the modal by passing props to the comment modal that allows it to infer a create action as opposed to an edit action
  createComment = () => {
    this.setState({showModal: true, commentAction: "create", action: 'create'})
  };
//method that allows a user to vote on a post that takes the post id and an option as the two paramters and dispatches a vote action with the paramters
  votePost = (id, option) => {
    this.props.votePost(id, option)
  };
//method for deleting post
  deletePost = (id) => {
      //for dispatching a delete post action
        this.props.deletePost(id, () =>{this.props.history.push("/")});
    };

  componentDidMount() {
    //componentdidMount lifecycle event dispatches actions to retrieve the details of the particular post and the comments that belong to the post
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }

  render() {

    const {post} = this.props;
    const {comments} = this.props;
    const myComments = [];

    if (!post) {
      return(
        <div>
          <h2>Error 404 - Post {this.props.match.params.id} Not Found</h2>
        </div>

        )
    }
    //return method which wires up the comment modal and returns the postDetail component and a list of comments via the commentdetail component
    return (

      <div >
        <CommentModal
          close={this.closeModal}
          parentID={this.props.post.id}
          action={this.state.action}
          authorAction={this.state.disableAuthor}
          body={this.state.comment.body}
          author={this.state.comment.author}
          showModal={this.state.showModal}
          id={this.state.commentId}/>
        <PostDetail deletePost={this.deletePost} votePost={this.votePost} {...post}/>

        <Panel header="Comments" bsStyle="info">
          {(Object.keys(comments).length > 0)
            ? <ListGroup>
                {myComments
                  .concat(Object.values(comments))
                  .sort((a, b) => {
                    return b.voteScore - a.voteScore
                  })
                  .map((c, i) => <ListGroupItem key={i}>
                    <CommentDetail
                      vote={voteComment}
                      {...c}
                      showModal={this.editComment}
                      deleteComment={this.deleteComment}/>
                  </ListGroupItem>)}
              </ListGroup>
            : <h2>
              No Comments!</h2>}

          <Button
            className="btn modifyPostB"
            bsStyle="info"
            bsSize="small"
            onClick={this.createComment}>
            Add Comment
          </Button>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({posts, comments}, ownProps) => {
  return {
    post: posts[ownProps.match.params.id],
    comments: comments
  }
};

export default connect(mapStateToProps, {fetchPost, fetchComments, fetchComment, deleteComment, voteComment, votePost, deletePost})(PostDetails);