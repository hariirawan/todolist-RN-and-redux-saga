import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
type Props = {
  label: string;
  isActive?: boolean;
  onPress: () => void;
};

export default function RadioButton(props: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View
        style={[
          styles.radioStyle,
          {backgroundColor: props.isActive ? '#4CAF50' : '#ECEFF1'},
        ]}
      />
      <Text style={{color: 'black'}}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  radioStyle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginRight: 5,
  },
});
