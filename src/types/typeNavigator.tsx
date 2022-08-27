import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  TodoList: undefined;
  TodoListDetail: {id: number | null};
};

export type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'TodoList'
>;

export type DetailTodoProps = RouteProp<RootStackParamList, 'TodoListDetail'>;
