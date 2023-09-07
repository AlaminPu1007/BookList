import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../theme/colors';
import {navigationRef} from '../../../navigation/RootNavigation';

// get scree Dimensions
const HEIGHT = Dimensions.get('screen').height;

interface Props {
    item: {
        alt_description: string,
        description: string,
        id: string,
        url: object,
    };
    index: number;
}

const ListOfImage = ({item, index}: Props) => {
    const [imageLoader, setImageLoader] = useState<boolean>(true);

    // This method will help us to detect if image loaded successfully
    const onLoadOfImage = () => {
        if (imageLoader) {
            setImageLoader(prv => !prv);
        }
    };

    // method to handle navigation
    const navigateToImagePreview = () => {
        // @ts-ignore
        return navigationRef.navigate('imagePreview', {
            itemId: item.id || null,
            // @ts-ignore
            imageUrl: item?.urls?.thumb || null,
        });
    };

    return (
        <View
            style={[
                styles.container,
                index === 0 ? styles.firstItemStyles : null,
            ]}>
            <View
                style={[
                    styles.imageWidget,
                    // imageLoader ? styles.imgIsLoading : null,
                ]}>
                {/* @ts-ignore */}
                {item?.urls?.regular && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={navigateToImagePreview}>
                        <Image
                            source={{
                                // @ts-ignore
                                uri: item?.urls?.thumb,
                            }}
                            style={styles.imageContainer}
                            onLoad={onLoadOfImage}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {/* {imageLoader ? (
                <View style={[styles.imageWidget, styles.loaderWidget]}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : null} */}
        </View>
    );
};

export default ListOfImage;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        padding: 0,
        borderColor: colors.borderColor,
    },
    firstItemStyles: {
        marginTop: 15,
    },
    imageWidget: {
        width: '100%',
        height: HEIGHT * 0.5,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: HEIGHT * 0.58,
        objectFit: 'contain',
        borderRadius: 4,
    },
    imgIsLoading: {
        width: 0,
        height: 0,
    },

    loaderWidget: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
