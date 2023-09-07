import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeComponent from '../../screens/home';
import BookViewer from '../../screens/bookView';

export type RootStackParamList = {
    Home: undefined,
    bookPreview: {itemId: string, imageUrl: string} | undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNav = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeComponent} />
            {/* The remain navigation will be show without tab-view mode */}
            <Stack.Screen name="bookPreview" component={BookViewer} />
        </Stack.Navigator>
    );
};

export default RootStackNav;
