/**
 * description :- This component will render single specific book items
 * @author {ALAMIN}
 * @created_by :- {ALAMIN}
 * @created_at :- 08/09/2023 12:04:24
 */
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../navigation/stackNavigation/RootStackNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyles';

// get scree Dimensions
const HEIGHT = Dimensions.get('screen').height;

type Props = NativeStackScreenProps<RootStackParamList, 'bookPreview'>;

// define type for router
interface routerParams {
    itemId: string | undefined;
}

const BookViewer = ({route}: Props) => {
    // First, assert the correct type for route.params
    const params: routerParams | undefined = route.params;
    const {itemId = ''} = params ?? {};

    let [book, setBook] = useState<any>({});
    const [loading, setLoading] = useState<Boolean>(false);
    const [imageLoader, setImageLoader] = useState<boolean>(true);

    useEffect(() => {
        let unmount = false;
        if (!unmount) {
            // made api request
            itemId && getBooksListById(itemId);
        }
        return () => {
            unmount = true;
        };
    }, [itemId]);

    /**
     * description :- This method will called api to get list of books data
     * @return {array-of-list}
     * @author {Alamin}
     * @created_by :- {ALAMIN}
     * @created_at :- 08/09/2023 09:22:34
     */
    const getBooksListById = async (id: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`api/books-by-id/${id}`);

            setBook(res?.data?.blogPost || []);

            setLoading(prv => !prv);
        } catch (error) {
            setLoading(prv => !prv);

            if (__DEV__) {
                console.log(error, 'from catch errors');
            }
        }
    };

    // This method will help us to detect if image loaded successfully
    const onLoadOfImage = () => {
        if (imageLoader) {
            setImageLoader(prv => !prv);
        }
    };

    if (loading) {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
                <View style={styles.itemContainer}>
                    <Text style={[commonStyles.largeTextStyles]}>
                        {book?.title || 'title'}
                    </Text>

                    <View
                        style={[
                            styles.imgView,
                            styles.imageWidget,
                            imageLoader ? styles.imgIsLoading : null,
                        ]}>
                        {/* @ts-ignore */}
                        {book?.thumbnailUrl && (
                            <Image
                                source={{
                                    // @ts-ignore
                                    uri: book?.thumbnailUrl,
                                }}
                                style={styles.imageContainer}
                                onLoad={onLoadOfImage}
                            />
                        )}
                    </View>
                    {imageLoader ? (
                        <View style={[styles.imageWidget, styles.loaderWidget]}>
                            <ActivityIndicator size={'large'} />
                        </View>
                    ) : null}

                    {/* book-description */}
                    <Text style={[commonStyles.mediumTextStyles]}>
                        {book?.longDescription || 'longDescription'}
                    </Text>
                    <Text
                        style={[
                            commonStyles.smallTextStyles,
                            styles.publicationDateTxt,
                        ]}>
                        {book?.publishedDate?.$date?.slice(0, 10) ||
                            'publishedDate'}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BookViewer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {},
    itemContainer: {
        margin: 10,
    },
    imgView: {
        marginVertical: 10,
    },
    imageWidget: {
        width: '100%',
        height: HEIGHT * 0.5,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: HEIGHT * 0.5,
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
    publicationDateTxt: {
        marginTop: 5,
    },
});
