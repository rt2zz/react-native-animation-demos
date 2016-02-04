import React, {
  Component,
  LayoutAnimation,
  PanResponder,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Motion, spring} from 'react-motion'
import Watermark from './Watermark'

class DemoLayoutAnimation extends Component {

  state = {
    left: 0,
    top: 0,
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.moveTo(gestureState.moveX, gestureState.moveY)
      },
    })
  }

  onPress = (e) => {
    this.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY)
  };

  moveTo = (x, y) => {
    this.setState({left: x, top: y})
  };

  render() {
    let {left, top} = this.state
    return (
      <View {...this._panResponder.panHandlers} style={styles.container}>
        <Watermark name="React Motion" />
        <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={styles.touchContainer}>

          <Motion style={{left: spring(left), top: spring(top)}}>{
              (interpolated) =>
                <View style={[styles.block, {top: interpolated.top, left: interpolated.left}]} />
          }</Motion>

        </TouchableOpacity>
      </View>
    )
  }
}

export default DemoLayoutAnimation

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  touchContainer: {flex: 1, backgroundColor: 'transparent'},
  block: {position: 'absolute', width: 50, height: 50, backgroundColor: 'purple'},
})
