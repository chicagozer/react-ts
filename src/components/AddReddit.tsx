import * as React from 'react';

interface AddRedditProps {

    onSubmit: Function;
}
class AddReddit extends React.Component< AddRedditProps, { } > {

    constructor(props: AddRedditProps) {
        super(props);
    }

    public handleOnSubmit(reddit: String): void {
        this.props.onSubmit(reddit)
    }


    render() {

        let input: HTMLInputElement;
        return (
            <div>
                <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        this.handleOnSubmit(input.value)
        input.value = ''
      }}>
                    <input ref={node => {
          input = node
        }}/>
                    <button type='submit'>
                        Add Reddit
                    </button>
                </form>
            </div>
        )
    }
}

export default AddReddit
