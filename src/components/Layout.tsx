import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Platform } from 'react-native';
import { Footer, Header } from './';
import { detect } from '../utility';

interface LayoutStateMappedProps {}

interface LayoutDispatchMappedProps {}

interface LayoutProps {}

interface LayoutMergedProps extends
  LayoutStateMappedProps,
  LayoutDispatchMappedProps,
  LayoutProps {}

interface LayoutState {}

export class Layout extends React.Component<LayoutMergedProps, LayoutState> {
  public readonly state: LayoutState = {}

  public render() {
    const height = Platform.OS === 'ios' ? 18 : StatusBar.currentHeight;

    return (
      <SafeAreaView style={styles.safeArea}>
        {(!detect.isIphoneX() && Platform.OS === 'ios') && (
          <View style={{height}}>
            <StatusBar />
          </View>
        )}
        <View style={styles.container}>
          <Header />
          {this.props.children}
          <Footer />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between'
  },
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'space-between'
  }
})
