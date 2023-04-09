import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginForm from './component/login/loginForm';
import {initStore} from './stores/store';
import Dashboard from './component/dashboard/dashboard';
import AddUser from './component/addUser/addUser';


const store = initStore();

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/addUser' element={<AddUser />}></Route>
        <Route path='/editUser' element={<AddUser />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
