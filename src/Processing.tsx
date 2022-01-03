import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

function Processing() {

  return(
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#444" />
    </View>
  );

}

export { Processing };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});