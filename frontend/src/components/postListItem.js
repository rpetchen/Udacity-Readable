import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import {votePost} from '../actions/index'

class PostListItem extends Component {
//PostListItem represents the individual posts generated in the list on the root page

//vote method which takes an option and calls the votePost action with the id and option as parameters
    vote(option) {
        this.props.votePost(this.props.id, option);
    }
//delete methid which takes the id of the post and dispatches the deletePost action
    deletePost = (id) => {
        this.props.deletePost(id);
    };
//editPost methid which takes the post id as a parameter and navigates the user to the edit post page for the specific post
    editPost = (id) => {
        this.props.edit(id);
    };
//render method which renders the individual post list item on the root page
    render() {

        var {title, author, body, voteScore, commentCount, id, category} = this.props;

        return (
            <li className="list-group-item">
                <Link key={id} to={`/${category}/${id}`}>
                    <h4>{title}</h4>
                </Link>
                <p>Author: {author}</p>

                <p>{body}</p>

                <ul className="postItem">
                    <li>Vote Score: {voteScore}

                        <Button
                            onClick={() => this.vote("upVote")}
                            className="btn"
                            bsStyle="default"
                            bsSize="xsmall">
                            <FontAwesome className='fa fa-thumbs-o-up' name='fa-thumbs-o-up' size='lg'/>
                        </Button>
                        <Button
                            onClick={() => this.vote("downVote")}
                            className="btn"
                            bsStyle="default"
                            bsSize="xsmall">
                            <FontAwesome className='fa fa-thumbs-o-down' name='fa-thumbs-o-down' size='lg'/>
                        </Button>
                    </li>
                    <li className="commentText">
                        Comments: {commentCount}
                    </li>
                    <li >
                        <Button
                            onClick={() => {
                            this.deletePost(id)
                        }}
                            className="btn btn-danger modifyPostB">
                            Delete
                        </Button>

                        <Link to={`/EditPost/${id}`} className="btn btn-primary modifyPostB">
                            Edit Post
                        </Link>
                    </li>
                </ul>

            </li>
        );
    }
}

export default connect(null, {votePost})(PostListItem);