import * as React from 'react';
import { push } from 'connected-react-router';
import DrawerLayout from 'react-native-drawer-layout';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, View, Platform } from 'react-native';
import { Footer, Header, Sidebar } from './';
import { ApplicationState, toggleDrawer } from '../store';
import { detect } from '../utility';

interface LayoutStateMappedProps {
  drawerOpen: boolean;
  hideFooter: boolean;
  hideHeader: boolean;
}

interface LayoutDispatchMappedProps {
  navigate: (path: string) => any;
  toggleDrawer: (open: boolean) => void;
}

interface LayoutProps {}

interface LayoutMergedProps extends
  LayoutStateMappedProps,
  LayoutDispatchMappedProps,
  LayoutProps {}

interface LayoutState {}

export class DisconnectedLayout extends React.Component<LayoutMergedProps, LayoutState> {
  private drawer: DrawerLayout | null = null;

  public readonly state: LayoutState = {}

  public toggleDrawer = () => {
    const { drawerOpen, toggleDrawer } = this.props;
    if (this.drawer) {
      if (drawerOpen) {
        this.drawer.closeDrawer();
        toggleDrawer(false);

      } else {
        this.drawer.openDrawer();
        toggleDrawer(true);
      }
    }
  };

  public render() {
    const { hideFooter, hideHeader } = this.props;
    const height = Platform.OS === 'ios' ? 18 : StatusBar.currentHeight;
    const screenWidth: number = Dimensions.get('window').width;
    const LayoutWidth = screenWidth * 0.75;

    return (
      <SafeAreaView style={styles.safeArea}>
        {(!detect.isIphoneX() && Platform.OS === 'ios') && (
          <View style={{height}}>
            <StatusBar />
          </View>
        )}
        <DrawerLayout
          ref={(drawer: DrawerLayout | null) => {
            this.drawer = drawer;
          }}
          drawerWidth={LayoutWidth}
          drawerPosition="left"
          onDrawerOpen={() => this.setState({ drawerOpen: true })}
          onDrawerClose={() => this.setState({ drawerOpen: false })}
          useNativeAnimations={true}
          renderNavigationView={() => (
            <View style={styles.drawer}>
              <Sidebar
                navigate={this.props.navigate}
                toggleDrawer={this.toggleDrawer}
              />
            </View>
          )}
          style={styles.drawer}
        >
          {!hideHeader && <Header toggleDrawer={this.toggleDrawer} />}
            <View style={styles.container}>
              {this.props.children}
            </View>
          {!hideFooter && <Footer />}
        </DrawerLayout>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: ApplicationState): LayoutStateMappedProps => ({
  drawerOpen: state.layout.drawerOpen,
  hideFooter: state.layout.hideFooter,
  hideHeader: state.layout.hideHeader
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): LayoutDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path)),
  toggleDrawer: (open: boolean) => dispatch(toggleDrawer(open)),
});

export const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedLayout) as any;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between'
  },
  drawer: {
    alignItems: 'center',
    backgroundColor: '#1A9DD8',
    flex: 1
  },
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'space-between'
  }
})
