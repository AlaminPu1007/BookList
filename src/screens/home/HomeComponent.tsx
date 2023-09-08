import {View, StyleSheet, Text, VirtualizedList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MakeServer} from '../../server';
import commonStyles from '../../styles/commonStyles';
import ListOfBook from './homeComponent/ListOfBook';
import axios from 'axios';
import {generateUUID} from '../../utils/ReusableMethod';

if (__DEV__) {
    MakeServer({environment: 'development'});
}

const HomeComponent = () => {
    let [booksData, setBooksData] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        let unmount = false;
        if (!unmount) {
            // made api request
            getBooksList();
        }
        return () => {
            unmount = true;
        };
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
            const res = await axios.get('api/books');
            setBooksData(res?.data?.blogPosts || []);

            setLoading(prv => !prv);
        } catch (error) {
            setLoading(prv => !prv);

            if (__DEV__) {
                console.log(error, 'from catch errors');
            }
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
            {booksData?.length ? (
                <>
                    <VirtualizedList
                        data={booksData}
                        renderItem={({item, index}) => (
                            // @ts-ignore
                            <ListOfBook item={item} index={index} />
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
                        Content is not available
                    </Text>
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
});
