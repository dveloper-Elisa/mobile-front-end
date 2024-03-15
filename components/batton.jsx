
import React from 'react';
import { Button, View } from 'react-native';
import tw from "twrnc"

const ButtonComponent = (props) => {
    return (
        <Button styles={props.style} title={props.text}  onPress={props.onPress} />
        
    );
}

export default ButtonComponent;
