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
        content={this.renderDrawer()}
        >
        <NavigationAnimatedView
          navigationState={navState}
          style={styles.container}
          renderOverlay={(navState, position, layout) => (
              null
            )}
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
        {this.renderTabs(onNavigation)}
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
        <TouchableOpacity />
      </View>
    )
  }

  renderTabs(onNavigation) {
    return (
      <View style={{position: 'absolute', bottom: 0, height: 100, left:0, right:0, backgroundColor: 'green'}}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {onNavigation(new NavigationReducer.Actions.Push('animated'))}}
          >
          <Text>Animated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onNavigation(new NavigationReducer.Actions.Push('layoutAnimation'))}
          >
          <Text>Layout Animation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onNavigation(new NavigationReducer.Actions.Push('reactMotion'))}
          >
          <Text>React Motion</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Ani

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'blue'},
  drawerContainer: {flex: 1, backgroundColor: 'rgba(0,0,0,.5)'}
})
