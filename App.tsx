import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStackNav from './src/navigation/stackNavigation/RootStackNav';
import {navigationRef} from './src/navigation/RootNavigation';
import {MakeServer} from './src/server';

// initialized mirage-server
if (__DEV__) {
    MakeServer({environment: 'development'});
}

function App() {
    return (
        <SafeAreaProvider style={styles.container}>
            <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
                <RootStackNav />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
