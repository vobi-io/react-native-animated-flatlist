import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable'

class ListItem extends Component {
  state = {
    isVisible: true,
    isVisibleView: true,
  }

  componentDidMount() {
    // this.setState({ isVisible: this.props._isVisible })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isDeleted !== this.props.isDeleted) {
      this.setState({ isVisible: nextProps.isDeleted === true ? false : true })
      // this.forceUpdate()
      this.animatedRef.startAnimation()
    }
  }
  
  animationEnded = () => {
    const { isVisible } = this.state
    if (!isVisible) {
      this.setState({ isVisibleView: false })
    }
  }

  render() {
    const { isVisible, isVisibleView } = this.state

    if(!isVisibleView) {
      return null
    }

    const {
      component,
      inAnimation = 'fadeIn',
      outAnimation = 'fadeOut',
      easing = null,
      animation = null,
      duration = 300
    } = this.props;
    
    let animationType = isVisible ? inAnimation : outAnimation

    if(animation) {
      animationType = animation
    }

    const durationInt = parseInt(duration, 10)

    return (
      <Animatable.View
        ref={c => {this.animatedRef = c}}
        easing={easing}
        animation={animationType}
        onAnimationEnd={this.animationEnded}
        duration={durationInt}
      >
        {component}
      </Animatable.View>
    )
  }
}

export default ListItem