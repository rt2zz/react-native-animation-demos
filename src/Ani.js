import React, {
  Component,
  NavigationActions,
  NavigationAnimatedView,
  NavigationCard,
  NavigationContainer,
  NavigationHeader,
  NavigationHeaderTitle,
  NavigationState,
  NavigationReducer,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Drawer from 'react-native-drawer'

import DemoAnimated from './DemoAnimated'
import DemoLayoutAnimation from './DemoLayoutAnimation'
import DemoReactMotion from './DemoReactMotion'

const routes = {
  animated: {
    Component: DemoAnimated
  },
  layoutAnimation: {
    Component: DemoLayoutAnimation,
  },
  reactMotion: {
    Component: DemoReactMotion,
  }
}

class Ani extends Component {

  static propTypes = {

  };

  render() {
    return this.renderNavigationContainer()
  }

  renderNavigationContainer = () => {
    return (
      <NavigationContainer.RootContainer
        initialState={{routes: [ 'animated' ], index: 0}}
        persistenceKey="ANI_KEY"
        renderNavigator={(navState, onNavigation) => {
          if (!navState) {
            return null
          }
          return this.renderNavigator(navState, onNavigation)
        }}
      />
    )
  };

  renderNavigator(navState, onNavigation) {
    return (
      <Drawer
        type="overlay"
        panOpenMask={20}
        captureGestures={true}
        acceptDoubleTap={true}
        content={this.renderDrawer()}
        styles={{main: {overflow: 'hidden'}}}
        tweenHandler={ratio => ({ main: {left: ratio*200}})}
        >
        <NavigationAnimatedView
          navigationState={navState}
          style={styles.container}
          renderOverlay={(navState, position, layout) => this.renderTabs(onNavigation)}
          renderScene={(route, index, navState, position, layout) => (
            <NavigationCard
              key={index}
              route={route}
              index={index}
              navState={navState}
              position={position}
              layout={layout}
              >
              {this.renderRoute(route, index)}
            </NavigationCard>
          )}
        />
      </Drawer>
    )
  };

  renderRoute(route, index) {
    let RouteComponent = routes[route].Component
    return <RouteComponent />
  }

  renderDrawer() {
    return (
      <View style={styles.drawerContainer}>
        <Text style={styles.drawerText}>{'💚 ReactNative Los Angeles!'}</Text>
      </View>
    )
  }

  renderTabs(onNavigation) {
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {onNavigation(new NavigationReducer.Actions.Push('animated'))}}
          >
          <Text style={styles.tabText}>Animated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onNavigation(new NavigationReducer.Actions.Push('layoutAnimation'))}
          >
          <Text style={styles.tabText}>Layout Animation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onNavigation(new NavigationReducer.Actions.Push('reactMotion'))}
          >
          <Text style={styles.tabText}>React Motion</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Ani

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'blue'},
  drawerContainer: {flex: 1, backgroundColor: 'rgba(0,0,0,.8)', padding: 50, justifyContent: 'center'},
  tabBar: {position: 'absolute', flexDirection: 'row', bottom: 0, height: 60, left:0, right:0, backgroundColor: '#555', borderTopWidth: 5, borderColor: '#222'},
  tab: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabText: {fontWeight: 'bold', color: 'white'},
  drawerText: {fontSize: 50, color: 'white', textAlign: 'center', fontWeight: 'bold'},
})
