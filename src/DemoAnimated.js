import React, {
  Animated,
  Component,
  PanResponder,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

class DemoAnimated extends Component {

  state = {
    top: new Animated.Value(0),
    left: new Animated.Value(0),
  };

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {},
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        this.moveTo(gestureState.moveX, gestureState.moveY)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {},
      onPanResponderTerminate: (evt, gestureState) => {},
    });
  }

  onPress = (e) => {
    this.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY)
  };

  moveTo = (x, y) => {
    Animated.spring(this.state.top, {toValue: y}).start()
    Animated.spring(this.state.left, {toValue: x}).start()
  };

  render() {
    return (
      <View {...this._panResponder.panHandlers} style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={styles.container}>
          <Animated.View style={[styles.block, {top: this.state.top, left: this.state.left}]} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default DemoAnimated

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'red'},
  block: {position: 'absolute', width: 50, height: 50, backgroundColor: 'purple'},
})
