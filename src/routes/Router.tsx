import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { Route } from 'react-router';
// import {
// } from '../screens';

export const Router = ({ history }: { history: History.History }) => (
  <ConnectedRouter history={history}>
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>{Config.BUILD}  {Config.APP_ID} {Config.DISPLAY_NAME}</Text>
      {/* <Route exact={true} path={'/'} component={} /> */}
    </View>
  </ConnectedRouter>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 }
});
