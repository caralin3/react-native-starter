import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

interface FooterStateMappedProps {}

interface FooterDispatchMappedProps {}

interface FooterProps {}

interface FooterMergedProps extends
  FooterStateMappedProps,
  FooterDispatchMappedProps,
  FooterProps {}

interface FooterState {}

export class Footer extends React.Component<FooterMergedProps, FooterState> {
  public readonly state: FooterState = {}

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Build: {Config.BUILD}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  }
})
