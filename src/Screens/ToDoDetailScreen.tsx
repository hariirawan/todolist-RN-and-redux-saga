import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  onChangeTodo,
  setDetailTodo,
  updateTodo,
} from '../redux/actions/todoAction';
import {TodoListType, TodoType} from '../types/todoType';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import {apiUpdateDetailTodo} from '../redux/api/todolistApi';

export default function ToDoDetailScreen() {
  const refTimeout = useRef<any>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const todolist: TodoListType = useSelector((state: any) => state.todoReducer);
  const todo: {data: TodoType; isLoading: boolean} = useSelector(
    (state: any) => state.todoDetail,
  );

  const onChangeDetail = (key: string, val: string | boolean) => {
    let data: any = {...todo.data};
    data[key] = val;
    dispatch(onChangeTodo(data));
  };

  const onUpdateTodo = () => {
    setIsloading(true);
    apiUpdateDetailTodo(todo.data).then(res => {
      if (res.status === 200) {
        setIsloading(false);
        dispatch(updateTodo(todo.data));
        navigation.goBack();
      }
    });
  };

  const onSaveTodo = () => {
    setIsloading(true);

    refTimeout.current = setTimeout(() => {
      setIsloading(false);
      let data = {...todo.data};
      data.id = todolist.data.length + 1;
      data.userId = 1;
      dispatch(addTodo(data));
      dispatch(setDetailTodo({}));
      navigation.goBack();
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(refTimeout.current);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header label="Form Add & Update Todo" isBack />
      {todo.isLoading ? (
        <ActivityIndicator color={'blue'} />
      ) : (
        <View style={styles.card}>
          <Text>Title:</Text>
          <TextInput
            placeholder="Masukkan Title"
            value={todo.data.title}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onChangeText={val => onChangeDetail('title', val)}
          />
          <View style={{height: 10}} />
          <Text>Status:</Text>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              isActive={todo.data.completed === true}
              label="Active"
              onPress={() => onChangeDetail('completed', true)}
            />
            <View style={{width: 5}} />
            <RadioButton
              isActive={todo.data.completed === false}
              label="Non Active"
              onPress={() => onChangeDetail('completed', false)}
            />
          </View>

          <View style={{marginTop: 10, flexDirection: 'row'}}>
            {isLoading ? (
              <ActivityIndicator color={'blue'} />
            ) : (
              <Button
                label="Simpan"
                onPress={() => {
                  if (route.params.id) {
                    onUpdateTodo();
                  } else {
                    onSaveTodo();
                  }
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderColor: 'gray',
    padding: 16,
    margin: 16,
  },
});
