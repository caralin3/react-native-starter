import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderStateMappedProps {}

interface HeaderDispatchMappedProps {}

interface HeaderProps {}

interface HeaderMergedProps extends
  HeaderStateMappedProps,
  HeaderDispatchMappedProps,
  HeaderProps {}

interface HeaderState {}

export class Header extends React.Component<HeaderMergedProps, HeaderState> {
  public readonly state: HeaderState = {}

  public render() {
    return (
      <View style={styles.container}>
        <Text>Header</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDD',
    flexDirection: 'row'
  }
})
