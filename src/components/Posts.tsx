import * as React from 'react'

interface PostsProps {
    posts: any[];
}

class Posts extends React.Component< PostsProps, {} > {

    constructor(props: PostsProps) {
        super(props);

    }

    render() {
        return (<ul>
            {this.props.posts.map((post: any, i: number) =>
                <li key={i}>{post.title}</li>
            )}
        </ul>)
    }
}

export default Posts
