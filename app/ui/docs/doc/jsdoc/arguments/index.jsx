import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class JSDocArguments extends React.Component {
  static propTypes = {
    args: ImmutablePropTypes.list,
    selectedVersionTag: React.PropTypes.any
  }

  render () {
    if (!this.props.args || this.props.args.length === 0) return null

    return <section>
      <h2 id='arguments'>
        Arguments
        <a href='#arguments' className='doc-header_link'>#</a>
      </h2>

      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {this._renderArguments(this.props.args, false, this.props.selectedVersionTag)}
        </tbody>
      </table>
    </section>
  }

  _renderArguments (args, isProps, selectedVersionTag) {
    return args
      .filter((arg) => isProps || !arg.isProperty)
      .map((arg, index) => {
        return <tr key={index}>
          <td>
            {arg.name}
            {this._renderArgumentOptionalLabel(arg.optional, arg.defaultvalue)}
          </td>
          <td>
            {this._renderArgumentType(arg.type, arg.variable)}
          </td>
          <td>
            <Markdown value={arg.description} selectedVersionTag={selectedVersionTag} />
            {this._renderArgumentPropsTable(arg.props, selectedVersionTag)}
          </td>
        </tr>
      })
  }

  _renderArgumentOptionalLabel (optional, defaultValue) {
    if (!optional) {
      return null
    }

    return <div className='jsdoc_arguments-optional'>
      {defaultValue !== undefined ? `(optional, default=${defaultValue})` : '(optional)'}
    </div>
  }

  _renderArgumentType (type, variable) {
    const types = type.names.join(' | ')
    if (variable) {
      return type.names.length > 1 ? `...(${types})` : `...${types}`
    } else {
      return types
    }
  }

  _renderArgumentPropsTable (props, selectedVersionTag) {
    if (!props) {
      return null
    }

    return <div>
      <div className='jsdoc_arguments-props_label'>
        Properties:
      </div>

      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {this._renderArguments(props, true, selectedVersionTag)}
        </tbody>
      </table>
    </div>
  }
}
