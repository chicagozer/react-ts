import * as React from 'react'

interface PickerProps {
    options: String[],
    value: String,
    onChange: Function
}

class Picker extends React.Component< PickerProps, {} > {

    constructor(props: PickerProps) {
        super(props);
    }


    public handleOnChange(event: React.FormEvent): void {
        this.props.onChange((event.target as HTMLSelectElement).value)
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
