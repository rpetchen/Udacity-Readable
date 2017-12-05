import React from 'react';
import { Button } from 'react-bootstrap'
import  FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux';
import { voteComment } from '../actions/index'

class CommentDetail extends React.Component{
//vote method which dispatches a voteComment action with the id and option of the comment the action was performed on
    vote(option, id) {
          this.props.voteComment(option, id);
    }

    render() {

        const {id, body, author, voteScore} = this.props;

        return (

            <div>

                <h3>{body}</h3>
                <h4>Comment Author: {author}</h4>
                <p>Comment creation/edit time: timestamp</p>
                <p>Vote Score for the comment: {voteScore}</p>
                <Button onClick={() => this.props.showModal(id)}>
                    Edit Comment
                </Button>
                <Button onClick={() => this.props.deleteComment(id)}>
                    Delete Comment
                </Button>

                <Button
                    onClick={() => this.vote("upVote", id)}
                    className="btn"
                    bsStyle="default"
                    bsSize="xsmall">
                    <FontAwesome className='fa fa-thumbs-o-up' name='fa-thumbs-o-up' size='lg'/>
                </Button>
                <Button
                    onClick={() => this.vote("downVote", id)}
                    className="btn"
                    bsStyle="default"
                    bsSize="xsmall">
                    <FontAwesome className='fa fa-thumbs-o-down' name='fa-thumbs-o-down' size='lg'/>
                </Button>

            </div>

        )
    }
}



export default connect(null,{voteComment})(CommentDetail);
