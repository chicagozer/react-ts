import 'whatwg-fetch';
import {RootState} from '../reducers/index';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const ADD_REDDIT = 'ADD_REDDIT';


export interface Action {
    type: string,
    posts?: any,
    reddit: string,
    receivedAt?: number
}


export function addReddit(reddit: string): Action {
    return {
        type: ADD_REDDIT,
        reddit
    };
}

export function selectReddit(reddit: string): Action {
    return {
        type: SELECT_REDDIT,
        reddit
    };
}

export function invalidateReddit(reddit: string): Action {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    };
}

function requestPosts(reddit: string): Action {
    return {
        type: REQUEST_POSTS,
        reddit
    };
}

function receivePosts(reddit: string, json: any): Action {
    return {
        type: RECEIVE_POSTS,
        reddit,
        posts: json.data.children.map((child: any) => child.data),
        receivedAt: Date.now()
    };
}

function fetchPosts(reddit: string): Function {
    return (dispatch: Function) => {
        dispatch(requestPosts(reddit))
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then((response: Response) => response.json())
            .then((json: any) => dispatch(receivePosts(reddit, json)))
    }
}

function shouldFetchPosts(state: RootState, reddit: string): boolean {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(reddit: string): Function {
    return (dispatch: Function, getState: Function) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        }
    }
}
