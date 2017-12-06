export const FETCH_POSTS = 'fetch_posts';
export const VOTE_POST = 'vote_post';
export const CAT_POST = 'cat_post';
export const FETCH_CAT = 'fetch_cat';
export const FETCH_POST = 'fetch_post';
export const FETCH_COMMENTS = "fetch_comments";
export const FETCH_COMMENT = "fetch_comment";
export const EDIT_COMMENT = "edit_comment";
export const DELETE_COMMENT = "delete_comment";
export const ADD_COMMENT = "add_comment";
export const VOTE_COMMENT = "vote_comment";
export const DELETE_POST = "delete_post";
export const ADD_POST = "add_post";
export const EDIT_POST = "add_post";

const uuidv1 = require('uuid/v1');

const url = `http://localhost:3001`;

//action dispatcher for fetching the entire list of posts
export function fetchPosts() {
    const ext = `/posts`;
    let request = fetch(url + ext, {
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return (res.json());
        })
        .then((data) => {
            var obj = {};
            for (var i = 0; i < data.length; i++) {
                obj[data[i].id] = data[i];
            }
            return obj;
        });


    return {
        type: FETCH_POSTS,
        payload: request
    };
}

//action dispatcher for voting on posts
export function votePost(id, option) {
    const ext = `/posts/${id}`;
    let request = fetch(url + ext, {
            method: "POST",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                option
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });


    return {
        type: VOTE_POST,
        payload: request
    };
}

//action dispatcher for retrieving the list of posts for a specific category
export function categoriesPost(category) {
    const ext = `/${category}/posts`;

    let request = fetch(url + ext, {
            method: "GET",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            var obj = {};
            for (var i = 0; i < data.length; i++) {
                obj[data[i].id] = data[i];
            }
            return obj;
        });

    return {
        type: CAT_POST,
        payload: request
    };
}

//action dispatcher for fetching the list of valid categories
export function fetchCategories() {
    const ext = `/categories`;
    let request = fetch(url + ext, {
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return (res.json());
        })
        .then((data) => {

            return data.categories;
        });

    return {
        type: FETCH_CAT,
        payload: request
    };

}

//action dispatcher for fetching the details for a single post
export function fetchPost(id) {
    const ext = `/posts/${id}`;
    let request = fetch(url + ext, {
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return (res.json());
        })
        .then((data) => {

            return data;
        });


    return {
        type: FETCH_POST,
        payload: request
    };
}

//action dispatcher for fetching the comments for a specific post
export function fetchComments(id) {
    const ext = `/posts/${id}/comments`;
    let request = fetch(url + ext, {
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return (res.json());
        })
        .then((data) => {
            var obj = {};
            for (var i = 0; i < data.length; i++) {
                obj[data[i].id] = data[i];
            }
            return obj;
        });



    return {
        type: FETCH_COMMENTS,
        payload: request
    };
}

//action dispatcher for fetching the details of a single comment
export function fetchComment(id, callback) {
    const ext = `/comments/${id}`;
    let request = fetch(url + ext, {
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return (res.json());
        })
        .then((data) => {

            callback(data);
            return data;
        });


    return {
        type: FETCH_COMMENT,
        payload: request
    };
}

//action dispatcher for editing an existing comment
export function editComment(id, body, callback) {
    const ext = `/comments/${id}`;
    var timestamp = Date.now();
    var body = body.body;
    let request = fetch(url + ext, {
            method: "PUT",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                body,
                timestamp
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            return data;
        });


    return {
        type: EDIT_COMMENT,
        payload: request
    };
}

//action dispatcher for deleting a comment
export function deleteComment(id) {

    const ext = `/comments/${id}`;

    let request = fetch(url + ext, {
            method: "DELETE",
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            return data;
        });


    return {
        type: DELETE_COMMENT,
        payload: request
    };

}

//action dispatcher for adding a comment
export function addComment(comment, id, callback) {

    comment.timestamp = Date.now();
    comment.parentId = id;
    comment.id = uuidv1();

    const ext = `/comments`;


    let request = fetch(url + ext, {
            method: "POST",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(comment)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            callback();
            return data;
        });


    return {
        type: ADD_COMMENT,
        payload: request
    };

}

//action dispatcher for voting on a comment
export function voteComment(option, id) {

    const ext = `/comments/${id}`;

    let request = fetch(url + ext, {
            method: "POST",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                option
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        });


    return {
        type: VOTE_COMMENT,
        payload: request
    };

}

//action dispatcher for deleting a post
export function deletePost(id, callback) {
    const ext = `/posts/${id}`;

    let request = fetch(url + ext, {
            method: "DELETE",
            headers: {
                'Authorization': 'ryanP'
            },
            credentials: 'include'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (callback){
                callback()
            }
            return data;
        });


    return {
        type: DELETE_POST,
        payload: request
    };
}

//action dispatcher for adding a post
export function addPost(post, callback) {

    post.timestamp = Date.now();
    post.id = uuidv1();

    const ext = `/posts`;


    let request = fetch(url + ext, {
            method: "POST",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(post)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            callback();
            return data;
        });


    return {
        type: ADD_POST,
        payload: request
    };

}

//action dispatcher for editing a post
export function editPost(id, post, callback) {

    const ext = `/posts/${id}`;
    console.log(post);


    let request = fetch(url + ext, {
            method: "PUT",
            headers: {
                'Authorization': 'ryanP',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(post)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            callback();
            return data;
        });


    return {
        type: EDIT_POST,
        payload: request
    };
}