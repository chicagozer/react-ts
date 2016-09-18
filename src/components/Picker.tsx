import * as React from 'react'

interface PickerProps {
    options: String[],
    value: String,
    onChange: Function
}

class Picker extends React.Component<PickerProps,{}> {

    constructor(props: any) {
        super(props);
    }


    public handleOnChange(event: any): void {
        this.props.onChange(event.target.value)
    }


    render() {

        return (
            <span>
  <h1>{this.props.value}</h1>
  <select onChange={e => this.handleOnChange(e)}
          value={this.props.value}>
    {this.props.options.map(option =>
        <option value={option} key={option}>
            {option}
        </option>)
    }
  </select>
</span>)
    }
}

export default Picker
