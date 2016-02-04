import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native'

class Watermark extends Component {

  static propTypes = {

  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    )
  }
}

export default Watermark

const styles = StyleSheet.create({
  container: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 80, color: '#eee', fontWeight: 'bold', textAlign: 'center'},
})
