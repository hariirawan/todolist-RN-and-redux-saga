import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconBack from '../assets/images/Icon.png';
import {NavigationProps} from '../types/typeNavigator';

type IHeader = {
  label: string;
  isBack?: boolean;
  children?: any;
};

export default function Header(props: IHeader) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {props.isBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IconBack} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        )}
        <Text style={{fontWeight: '700', marginLeft: 10}}>{props.label}</Text>
      </View>
      <View>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
