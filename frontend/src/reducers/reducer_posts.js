import { FETCH_POSTS, VOTE_POST, CAT_POST, FETCH_POST, DELETE_POST } from '../actions/index';


export default function(state = {}, action) {
	
	switch (action.type) {
		case FETCH_POSTS:
			return action.payload;
		case VOTE_POST:
			return {...state, [action.payload.id] : action.payload};	
		case CAT_POST:
			return action.payload;
		case FETCH_POST:
			return {...state, [action.payload.id]: action.payload};
		case DELETE_POST:
			let {[action.payload.id]: deletedItem, ...rest} = state;
			return rest;
		default:
			return state;
	}
}