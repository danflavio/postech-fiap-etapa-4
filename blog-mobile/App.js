import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import PostDetail from './src/pages/PostDetail';
import CreatePost from './src/pages/CreatePost';
import EditPost from './src/pages/EditPost';
import Login from './src/pages/Login';
import TeacherList from './src/pages/TeacherList';
import CreateTeacher from './src/pages/CreateTeacher';
import EditTeacher from './src/pages/EditTeacher';
import StudentList from './src/pages/StudentList';
import CreateStudent from './src/pages/CreateStudent';
import EditStudent from './src/pages/EditStudent';
import Admin from './src/pages/Admin'; // Nova importação

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Lista de Posts' }} />
        <Stack.Screen name="PostDetail" component={PostDetail} options={{ title: 'Leitura do Post' }} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={{ title: 'Criação de Posts' }} />
        <Stack.Screen name="EditPost" component={EditPost} options={{ title: 'Edição de Posts' }} />
        
        <Stack.Screen name="TeacherList" component={TeacherList} options={{ title: 'Professores' }} />
        <Stack.Screen name="CreateTeacher" component={CreateTeacher} options={{ title: 'Cadastrar Professor' }} />
        <Stack.Screen name="EditTeacher" component={EditTeacher} options={{ title: 'Editar Professor' }} />

        <Stack.Screen name="StudentList" component={StudentList} options={{ title: 'Estudantes' }} />
        <Stack.Screen name="CreateStudent" component={CreateStudent} options={{ title: 'Cadastrar Estudante' }} />
        <Stack.Screen name="EditStudent" component={EditStudent} options={{ title: 'Editar Estudante' }} />
        
        {/* Nova rota Admin */}
        <Stack.Screen name="Admin" component={Admin} options={{ title: 'Administração' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}