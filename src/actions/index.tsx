import 'whatwg-fetch'

export const REQUEST_POSTS:string = 'REQUEST_POSTS'
export const RECEIVE_POSTS:string = 'RECEIVE_POSTS'
export const SELECT_REDDIT:string = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT:string = 'INVALIDATE_REDDIT'

export interface Action {
  type: string,
  posts?: any,
  reddit: string,
  receivedAt?: number
}


export function selectReddit(reddit:string) : Action {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit:string) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit:string) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit:string, json:any) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map((child:any) => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit:string) {
  return (dispatch:Function) => {
    dispatch(requestPosts(reddit))
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
        .then((response:any) => response.json())
        .then((json:any) => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts(state:any, reddit:string) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(reddit:string) {
  return (dispatch: Function, getState: Function) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}
