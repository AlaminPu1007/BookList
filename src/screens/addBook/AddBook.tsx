import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../navigation/stackNavigation/RootStackNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import axios from 'axios';
import commonStyles from '../../styles/commonStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'addBook'>;

// define dummy-object por add blocg
const dummyObj = {
    isbn: '1933988673',
    id: Math.floor(Math.random() * 97879878),
    pageCount: 416,
    publishedDate: {$date: '2009-04-01T00:00:00.000-0700'},
    thumbnailUrl:
        'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
    longDescription:
        "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
    status: 'PUBLISH',
    authors: ['W. Frank Ableson', 'Charlie Collins', 'Robi Sen'],
    categories: ['Open Source', 'Mobile'],
};

// define type for router
interface routerParams {
    itemId: string | undefined;
}

const AddBook = ({route, navigation}: Props) => {
    // First, assert the correct type for route.params
    const params: routerParams | undefined = route.params;
    const {itemId = ''} = params ?? {};

    // define state
    const [titleInput, setTitleInput] = useState<string>('');
    const [decInput, setDecInput] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(false);
    const [btnLoading, setBtnLoading] = useState<Boolean>(false);
    const [bookList, setBookList] = useState<Object>({});

    // update state if it's and edit mode

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

            setBookList(res?.data?.blogPosts || {});
            // update local-state
            setTitleInput(res?.data?.blogPost?.title || '');
            setDecInput(res?.data?.blogPost?.shortDescription || '');

            setLoading(prv => !prv);
        } catch (error) {
            setLoading(prv => !prv);

            if (__DEV__) {
                console.log(error, 'from catch errors');
            }
        }
    };

    // Title text-onChange method
    const onChangeTextMethod = (e: any) => setTitleInput(e);

    // description text-onChange method
    const onChangeTextDecMethod = (e: any) => setDecInput(e);

    // method to update or save post
    const postMethod = async () => {
        try {
            setBtnLoading(prv => !prv);
            // let res = null;
            // for update method
            if (itemId) {
                const body = {
                    ...bookList,
                    title: titleInput,
                    shortDescription: decInput,
                };
                await axios.patch(`api/books/update/${itemId}`, body);

                ToastAndroid.showWithGravityAndOffset(
                    'Edited successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );

                navigation.push('Home');
            } else {
                // for add method
                const body = {
                    title: titleInput,
                    shortDescription: decInput,
                    ...dummyObj,
                };
                await axios.post('api/books/create', body);

                ToastAndroid.showWithGravityAndOffset(
                    'Added successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );

                navigation.push('Home');
            }

            setBtnLoading(prv => !prv);
        } catch (error) {
            setBtnLoading(prv => !prv);

            if (__DEV__) {
                console.log(error, 'from catch errors');
            }
        }
    };

    // for loader component
    if (loading) {
        return (
            <View style={[commonStyles.pageContentCenter]}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                keyboardShouldPersistTaps={'always'}>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.labelTxt}>
                            {itemId ? 'Edit' : 'Add'} Title
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeTextMethod}
                            value={titleInput}
                            placeholder={
                                itemId
                                    ? 'Update your title..'
                                    : 'Add your title..'
                            }
                            maxLength={200}
                        />
                    </View>

                    <View>
                        <Text style={styles.labelTxt}>
                            {itemId ? 'Edit' : 'Add'} short description
                        </Text>
                        <TextInput
                            style={[styles.input, styles.decTextInput]}
                            onChangeText={onChangeTextDecMethod}
                            value={decInput}
                            placeholder={
                                itemId
                                    ? 'Update your short description..'
                                    : 'Add your short description..'
                            }
                            multiline={true}
                            maxLength={500}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.buttonStyles, styles.addBtn]}
                            activeOpacity={0.7}
                            // @ts-ignore
                            onPress={!btnLoading ? postMethod : null}>
                            <Text
                                style={[
                                    commonStyles.smallTextStyles,
                                    styles.btnTxt,
                                ]}>
                                {!btnLoading
                                    ? itemId
                                        ? 'Update'
                                        : 'Save'
                                    : 'Loading..'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddBook;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {},
    bodyContainer: {
        margin: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    labelTxt: {
        fontSize: fonts.size.font14,
        color: colors.black,
        marginLeft: 10,
    },
    decTextInput: {
        height: 100,
        textAlign: 'left',
        textAlignVertical: 'top',
    },
    buttonStyles: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    btnTxt: {
        fontSize: fonts.size.font16,
        textAlign: 'center',
        color: colors.white,
        opacity: 1,
    },
    addBtn: {
        backgroundColor: colors.btnPrimary,
    },
});
