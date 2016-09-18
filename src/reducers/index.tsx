import {combineReducers} from 'redux'
import {
    SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS, Action
} from '../actions'


export interface RedditState {
    [key: string]: any;
}

export interface RootState {
    postsByReddit: RedditState,
    selectedReddit: string

}

function selectedReddit(state = 'reactjs', action: Action) {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit
        default:
            return state
    }
}

function posts(state: RedditState = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action: Action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsByReddit(state: RedditState = {}, action: Action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.reddit]: posts(state[action.reddit], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit
})

export default rootReducer