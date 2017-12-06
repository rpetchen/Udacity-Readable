import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../App.css';
import {fetchPosts, categoriesPost, deletePost} from '../actions/index';
import PostListItem from '../components/postListItem';
import {Button} from 'react-bootstrap';
import FilterDropDown from '../components/filters.js';
import Categories from './categories.js';


class homePosts extends Component {
		constructor(props) {
				super(props);
				//localized state to support filerting and filter display text
				this.state = {
						filter: "timestamp",
						sortText: "Sort By"
				};
		}

		componentDidMount() {
			//Retrieve posts from the server api
				this.props.fetchPosts();
		}

		componentWillReceiveProps(newProps) {
			console.log(newProps)
			//path and category are props used to determine whether to display root posts or posts by category
				const {category} = newProps.match.params;
				const {path} = newProps.match;

				if (category && category !== this.props.match.params.category) {
						this.props.categoriesPost(category);
				}
				if (path === "/" && this.props.match.params.category) {
						this.props.fetchPosts();
				}
		}

		deletePost = (id) => {
			//for dispatching a delete post action
				this.props.deletePost(id);
		};

		filterSelect = (e, evt) => {
			//switch statement that takes an event from a child component and determines which filter to appy
				switch (e) {
						case 'Date':
								this.setState({filter: "timestamp", sortText: e});
								break;
						case '# Votes':
								this.setState({filter: "voteScore", sortText: e});
								break;
						case '# Comments':
								this.setState({filter: 'commentCount', sortText: e});
								break;
				}
		};

		editPost = (id) => {
			//for routing to the post edit page
				this.props.history.push(`EditPost/${id}`);
		};

		render() {
				const {category} = this.props.match.params;
				const {posts} = this.props;
				const {filter} = this.state;
				const myPosts = [];

				if (category && !this.props.catNames.includes(category)){
					return <h1> Invalid Category </h1>
				}

		
				//default loading screen in cases where posts haven't been retrieved from the server
				if (!posts) {
						return <div>Loading...</div>;
				}
				//rendering of the main screen when posts have been loaded from the server
				return (
						<div >

								<div style={{
										marginBottom: '15px',
										width: '75%'
								}}>
										<Link to="CreatePost">
												<Button>Create Post</Button>
										</Link>
										<FilterDropDown text={this.state.sortText} filterSelect={this.filterSelect}/>

								</div>

								<ul
										className="list-group"
										style={{
										width: '75%',
										float: 'left'
								}}>
										{(Object.keys(posts).length > 0)
												? myPosts.concat(Object.values(posts)).sort((a, b) => {
													return a[filter] < b[filter]
												}).map((p) => <PostListItem deletePost={this.deletePost}
														{...p}
														edit={this.editPost}
														key={p.id}/>)
												: <li className="list-group-item">
														<h3>Add your FIRST Post!</h3>
												</li>}
								</ul>
								<Categories/>
						</div>
				);
		}
}

function mapStateToProps({posts, categories}) {
		const catNames = Object.values(categories).map((cat) => cat.name);
		return {posts: posts,
				catNames}
}

export default connect(mapStateToProps, {fetchPosts, categoriesPost, deletePost})(homePosts);