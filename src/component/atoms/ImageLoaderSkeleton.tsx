import {StyleSheet, View} from 'react-native';
import colors from '../../theme/colors';

interface Props {
    Width: string | number;
    Height: string | number;
}

const ImageLoaderSkeleton = ({Width = '100%', Height = 120}: Props) => {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <View>
            {/* eslint-disable-next-line react/react-in-jsx-scope */}
            <View
                style={[
                    styles.box,
                    // @ts-ignore
                    {width: Width, height: Height},
                ]}
            />
        </View>
    );
};

export default ImageLoaderSkeleton;

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 120,
        backgroundColor: colors.skeletonBg,
    },
});
