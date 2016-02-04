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
    LayoutAnimation.spring()
    this.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY)
  };

  moveTo = (x, y) => {
    LayoutAnimation.spring()
    this.setState({left: x, top: y})
  };

  render() {
    return (
      <View {...this._panResponder.panHandlers} style={styles.container}>
        <Watermark name="Layout Animation" />
        <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={styles.touchContainer}>
          <View style={[styles.block, {top: this.state.top, left: this.state.left}]} />
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
