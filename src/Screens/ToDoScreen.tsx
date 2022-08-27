import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTodo,
  fetchAllTodo,
  setDetailTodo,
} from '../redux/actions/todoAction';
import CheckActive from '../assets/images/check-active.png';
import Check from '../assets/images/check.png';
import {TodoListType, TodoType} from '../types/todoType';
import {NavigationProps} from '../types/typeNavigator';
import Header from '../components/Header';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';

export default function ToDoScreen({navigation}: NavigationProps) {
  const todolist: TodoListType = useSelector((state: any) => state.todoReducer);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(fetchAllTodo({}));
  }, []);

  const renderItem = (item: TodoType) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          dispatch(setDetailTodo(item));
          navigation.navigate('TodoListDetail', {id: item.id});
        }}>
        <View style={styles.contentLeft}>
          <View
            style={[
              styles.iconStyle,
              {borderColor: item.completed ? '#4CAF50' : '#ECEFF1'},
            ]}>
            <Image
              source={item.completed ? CheckActive : Check}
              style={{width: 10, height: 10}}
            />
          </View>
          <Text style={{flex: 1}}>{item.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.contentRight}
          onPress={() => dispatch(deleteTodo(item))}>
          <Text style={{color: 'red'}}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  //saya sengaja tidak manipulasi di redux hemat waktu :):)
  const data = useMemo(() => {
    return keyword
      ? todolist.data.filter(val => {
          if (!val.title.includes(keyword)) {
            return false;
          } else {
            return true;
          }
        })
      : todolist.data;
  }, [keyword, isActive, todolist]);

  return (
    <View style={{flex: 1}}>
      <Header label="Todo List">
        <Button
          label="Tambah Data"
          onPress={() => navigation.navigate('TodoListDetail', {id: null})}
          style={{paddingVertical: 10}}
        />
      </Header>
      <TextInput
        placeholder="Pencarian"
        value={keyword}
        onChangeText={val => setKeyword(val)}
        style={styles.search}
      />

      <View style={styles.filter}>
        <Text>Filter</Text>
        <View style={{width: 5}} />
        <RadioButton
          isActive={isActive === true}
          label="Active"
          onPress={() => setIsActive(true)}
        />
        <View style={{width: 5}} />
        <RadioButton
          isActive={isActive === false}
          label="Non Active"
          onPress={() => setIsActive(false)}
        />
        <TouchableOpacity
          style={{marginLeft: 5, flex: 1}}
          onPress={() => {
            setIsActive(null);
            setKeyword('');
          }}>
          <Text style={{color: 'red'}}>Clear Filter</Text>
        </TouchableOpacity>
      </View>

      {todolist.isLoading ? (
        <ActivityIndicator color={'blue'} />
      ) : (
        <FlatList
          style={{paddingVertical: 16}}
          data={
            isActive !== null
              ? data.filter(val => val.completed === isActive)
              : data
          }
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          ListFooterComponent={() => <View style={{height: 40}} />}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E7E8F3',
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    borderWidth: 1,
    borderColor: '#ECEFF1',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});
