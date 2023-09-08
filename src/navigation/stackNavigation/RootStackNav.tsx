import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeComponent from '../../screens/home';
import BookViewer from '../../screens/bookView';
import AddBook from '../../screens/addBook';

export type RootStackParamList = {
    Home: undefined,
    bookPreview: {itemId: string} | undefined,
    addBook: {itemId: string | undefined} | undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNav = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeComponent} />
            {/* The remain navigation will be show without tab-view mode */}
            <Stack.Screen name="bookPreview" component={BookViewer} />
            {/* This component is for add & edit book */}
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="addBook" component={AddBook} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default RootStackNav;
