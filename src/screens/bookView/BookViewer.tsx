import {Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../navigation/stackNavigation/RootStackNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'bookPreview'>;

// define type for router
interface routerParams {
    itemId: string | undefined;
}

const BookViewer = ({route}: Props) => {
    // First, assert the correct type for route.params
    const params: routerParams | undefined = route.params;
    const {itemId = ''} = params ?? {};

    return (
        <View>
            <Text>BookViewer</Text>
            <Text>{itemId}</Text>
        </View>
    );
};

export default BookViewer;

// const styles = StyleSheet.create({});
