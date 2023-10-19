import React from 'react'
import { Button, Linking, NativeModules, View } from 'react-native';

function LearnFlexScreen() {
    return (


        <View style={{ width: '100%', height: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
            <>
                <View
                    style={{ position: 'absolute', top: '50%', height: 10, width: '100%', backgroundColor: 'red' }}
                />

                <View
                    style={{ position: 'absolute', left: '50%', height: '100%', width: 10, backgroundColor: 'red' }}
                />
            </>


        <View style={{width: 50, height: 50, backgroundColor: 'blue', }}>

        </View>

        </View>


    )
}

export default LearnFlexScreen