import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import {MakeServer} from '../../server';

if (__DEV__) {
    MakeServer({environment: 'development'});
}

const HomeComponent = () => {
    let [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(json => setUsers(json));
    }, []);

    console.log(users, 'users');

    return (
        <View>
            <Text>HomeComponent</Text>
        </View>
    );
};

export default HomeComponent;

// const styles = StyleSheet.create({});
