import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import CategoryReducer from './categories.js';
import CommentReducer from './comments.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoryReducer,
  comments: CommentReducer,
  form: formReducer
});

export default rootReducer;

