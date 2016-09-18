import * as React from 'react'
import {connect} from 'react-redux'
import {selectReddit, fetchPostsIfNeeded, invalidateReddit, Action} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import {RootState, RedditState} from '../reducers'
import AddReddit from '../components/AddReddit'

interface AppProps {
    selectedReddit: string;
    posts: any[];
    reddits: string[];
    isFetching: boolean,
    lastUpdated?: number;
    dispatch?: Function;
}

class App extends React.Component<AppProps,{}> {

    constructor(props: AppProps) {
        super(props);

    }

    componentDidMount() {
        this.props.dispatch(fetchPostsIfNeeded(this.props.selectedReddit))
    }

    componentWillReceiveProps(nextProps: AppProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const {dispatch, selectedReddit} = nextProps
            dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }

    handleChange = (nextReddit: string) => this.props.dispatch(selectReddit(nextReddit))

    handleRefreshClick = (e: Event) => {
        e.preventDefault()

        const {dispatch, selectedReddit} = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const isEmpty = this.props.posts.length === 0

        return (
            <div>
                <AddReddit onSubmit={this.handleChange}/>

                <Picker value={this.props.selectedReddit}
                        onChange={this.handleChange}
                        options={ this.props.reddits}/>
                <p>
                    {this.props.lastUpdated &&
                    <span>
              Last updated at {new Date(this.props.lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>
                    }
                    {!this.props.isFetching &&
                    <a href="#"
                       onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
                {isEmpty
                    ? (this.props.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{ opacity: this.props.isFetching ? 0.5 : 1 }}>
                    <Posts posts={this.props.posts}/>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state: RootState): AppProps {
    const {selectedReddit, postsByReddit} = state

    var posts: any = [];
    var isFetching: boolean = true;
    var lastUpdated: number;

    if (postsByReddit[selectedReddit]) {
        posts = postsByReddit[selectedReddit].items || [];
        isFetching = postsByReddit[selectedReddit].isFetching;
        lastUpdated = postsByReddit[selectedReddit].lastUpdated;
    }


    return {
        selectedReddit,
        reddits: Object.keys(postsByReddit),
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
