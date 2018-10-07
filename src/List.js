import React from 'react'
import { FlatList } from 'react-native';
import _ from "lodash";
import ListItem from './ListItem'

export default class AnimatedFlatlist extends React.Component {
  state = {
    refresh: false,
    data: []
  }

  componentWillMount() {
    if(!this.state.data.length) {
      this.setState({data: this.props.items})
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items = [], id } = nextProps
    const { data = [] } = this.state
    const deleted = _.difference(data, items).map(item => {
      item._isDeleted = true
      return item
    })
    
    const newData = _.unionBy(items, deleted, id);
    this.setState({ refresh: !this.state.refresh, data: newData })
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.items, this.state.data)
  }

  render() {

    const {
      rowItem,
      inAnimation,
      outAnimation,
      duration,
      easing,
      animation,
      
      id,
      data,
      keyExtractor,

      ...rest
    } = this.props
    return (
      <FlatList
        data={this.state.data}
        {...rest}
        keyExtractor={item => item[id].toString()}
        extraData={this.state.refresh}
        renderItem={({item, index}) => {
          const component = rowItem({item, index})
          // animation={animation}
          return (
            <ListItem
              inAnimation={inAnimation}
              outAnimation={outAnimation}
              duration={duration}
              easing={easing}
              component={component}
              isDeleted={item._isDeleted}
              id={item.id}
              item={item}
            />
          )
        }}
      />
    )
  }
}