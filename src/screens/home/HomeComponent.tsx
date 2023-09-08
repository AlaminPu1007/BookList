import {
    View,
    StyleSheet,
    Text,
    VirtualizedList,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {MakeServer} from '../../server';
import commonStyles from '../../styles/commonStyles';
import ListOfBook from './homeComponent/ListOfBook';
import axios from 'axios';
import {generateUUID} from '../../utils/ReusableMethod';

// if (__DEV__) {
//     MakeServer({environment: 'development'});
// }

const HomeComponent = ({navigation}: any) => {
    let [booksData, setBooksData] = useState<any>([]);
    let [rootData, setRootData] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [text, setText] = React.useState('');
    const [searchLoader, setSearchLoader] = useState<Boolean>(false);

    const timeout = useRef();

    // use use navigation event to handle for edit & delete
    // in actual project implement we will go through another optimal approach
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Do something when the screen focus
            getBooksList();
        });

        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * description :- This method will called api to get list of books data
     * @return {array-of-list}
     * @author {Alamin}
     * @created_by :- {ALAMIN}
     * @created_at :- 08/09/2023 09:22:34
     */
    const getBooksList = async () => {
        try {
            setLoading(true);
            const res = await axios.get('api/books');
            setBooksData(res?.data?.blogPosts || []);
            setRootData(res?.data?.blogPosts || []);

            setLoading(false);
        } catch (error) {
            setLoading(false);

            if (__DEV__) {
                console.log(error, 'from catch errors');
            }
        }
    };

    /* This method for store user input as well as search according this input and get back array of search result */
    const onChangeTextMethod = (e: any) => {
        // store text in state
        setText(e);

        //Clear the previous timeout.
        clearTimeout(timeout.current);

        // if user removed search text, then update array with all book-list
        if (!e.length) {
            setBooksData([...rootData]);
            if (searchLoader) {
                return setSearchLoader(false);
            }
            return null;
        }

        try {
            setSearchLoader(true);
            // create a debounce feature by using setTimeout
            //@ts-ignore
            timeout.current = setTimeout(async () => {
                const res = await axios.get('api/books/search', {
                    params: {text: e},
                });

                setBooksData(res?.data?.blogPosts || []);
                //stop loader
                setSearchLoader(false);
            }, 500);
        } catch (error) {
            setSearchLoader(false);

            if (__DEV__) {
                console.log(error, 'from catch errors');
            }
        }
    };

    if (loading) {
        return (
            <View style={[commonStyles.pageContentCenter]}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextMethod}
                    value={text}
                    placeholder="Search you books..."
                />
            </View>
            {!searchLoader ? (
                booksData?.length ? (
                    <>
                        <VirtualizedList
                            data={booksData}
                            renderItem={({item, index}) => (
                                <ListOfBook
                                    // @ts-ignore
                                    item={item}
                                    index={index}
                                />
                            )}
                            // @ts-ignore,
                            // we put custom uuid cause, the api response has duplicate id,
                            keyExtractor={item => item.id + generateUUID()}
                            getItemCount={data => data.length} // Provide the number of items in your data
                            getItem={(data, index) => data[index]} // Provide the item for a given index
                            showsHorizontalScrollIndicator={false}
                        />
                    </>
                ) : (
                    <View style={[commonStyles.pageContentCenter]}>
                        <Text style={[commonStyles.mediumTextStyles]}>
                            {text
                                ? `No result is found of this ${text}`
                                : 'Content is not available'}
                        </Text>
                    </View>
                )
            ) : (
                <View style={[commonStyles.pageContentCenter]}>
                    <ActivityIndicator size={'large'} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default HomeComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
