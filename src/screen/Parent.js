import React from "react";
import { Button, View } from "react-native";
import CallApi from "./CallApi";

const Parent = () => {

    const childRef = React.useRef();

    const onPress = () => {
        childRef?.current?.child();
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CallApi ref={childRef} />
            <Button title="press me" onPress={onPress} />
        </View>
    )
}

export default Parent;