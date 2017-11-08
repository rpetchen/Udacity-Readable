import _ from 'lodash';

export const FETCH_POSTS = 'fetch_posts'


const url = `http://localhost:3001/posts`;

export function fetchPosts() {

let request =  fetch(url, { headers: { 'Authorization': 'ryanP' },
                 credentials: 'include' } )
      .then( (res) => { return(res.json()) })
      .then((data) => {
       var obj = {}
       for (var i =0; i < data.length; i++){
       	obj[data[i].id] = data[i]
       }
       return obj
       })


	return {
		type: FETCH_POSTS,
		payload: request
	};
}
