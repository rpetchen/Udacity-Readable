import { FETCH_CAT } from '../actions/index';


export default function(state = [], action) {
	
	switch (action.type) {
		case FETCH_CAT:
			return action.payload;
		default:
			return state;
	}
}