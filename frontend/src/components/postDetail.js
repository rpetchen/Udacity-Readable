import React from 'react';
import {Panel, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom';

const PostDetail = ({id, title, body, commentCount, author, timestamp, voteScore, votePost, deletePost}) => {
  //stateless function component for generating the individual posts on the post details screen
    const date = new Date(timestamp).toString().substring(0, 15);
  //function which allows the user to vote on the post by passing the post id and option to the votePost action dispatcher 
    const vote = (option, id) => {
        votePost(id, option);
    };

  
    return (

        <Panel
            header={`Post Title: ${title}`}
            style={{
            overflowWrap: 'break-word'
        }}
            bsStyle="primary">
            <h2>Body:</h2>
            <h3>{body}</h3>
            <h3>
                Author: {author}</h3>
            <h4>Creation Date: {date}</h4>
            <h4>Vote Score: {voteScore}</h4>
            <h4># Comments: {commentCount}</h4>
            <Button onClick={()=> deletePost(id)} className="btn modifyPostB" bsStyle="danger">
                Delete
            </Button>

            <Link to={`/EditPost/${id}`} className="btn btn-primary modifyPostB">
                Edit Post
            </Link>
            
            <Button
                onClick={() => vote("upVote", id)}
                className="btn"
                bsStyle="default"
                bsSize="xsmall">
                <FontAwesome className='fa fa-thumbs-o-up' name='fa-thumbs-o-up' size='lg'/>
            </Button>
            <Button
                onClick={() => vote("downVote", id)}
                className="btn"
                bsStyle="default"
                bsSize="xsmall">
                <FontAwesome className='fa fa-thumbs-o-down' name='fa-thumbs-o-down' size='lg'/>
            </Button>
        </Panel>

    )
}

export default PostDetail;
