import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../../theme/colors';
import {navigationRef} from '../../../navigation/RootNavigation';
import commonStyles from '../../../styles/commonStyles';
import fonts from '../../../theme/fonts';

interface Props {
    item: {
        title: string | undefined,
        id: string | undefined,
        publishedDate: string | undefined,
        shortDescription: string | undefined,
        status: string | undefined,
        authors: any,
        categories: string | undefined,
    };
    index: number;
}

const ListOfBook = ({item}: Props) => {
    // method to handle navigation
    const navigateToBookPreview = () => {
        // @ts-ignore
        return navigationRef.navigate('bookPreview', {
            itemId: item.id || null,
        });
    };

    return (
        <TouchableOpacity
            style={[styles.container]}
            activeOpacity={0.7}
            onPress={navigateToBookPreview}>
            <Text style={[commonStyles.largeTextStyles]}>{item.title}</Text>
            <Text style={[commonStyles.smallTextStyles, styles.desTxt]}>
                {item.shortDescription}
            </Text>
            <View style={[styles.authorContainer]}>
                {item?.authors?.length
                    ? //@ts-ignore
                      item?.authors?.map((i, index) => {
                          const isLastItem =
                              item?.authors?.length - 1 === index;
                          return (
                              <View key={i} style={styles.eachAuthors}>
                                  <Text
                                      style={[
                                          commonStyles.smallTextStyles,
                                          styles.authorTxt,
                                      ]}>
                                      {i} {!isLastItem ? ',' : null}
                                  </Text>
                              </View>
                          );
                      })
                    : null}
            </View>
        </TouchableOpacity>
    );
};

export default ListOfBook;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: colors.borderColor,
        padding: 5,
    },
    desTxt: {
        marginVertical: 5,
        fontSize: fonts.size.font14,
        color: colors.textPrimary,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    eachAuthors: {
        marginRight: 5,
    },
    authorTxt: {
        fontWeight: 'bold',
    },
});
