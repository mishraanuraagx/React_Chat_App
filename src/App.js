import logo from './logo.svg';
import './App.css';
import SignIn from './component/SignIn';
import { auth } from './firebase'
import Chat from './component/Chat';

function App() {
  const user = auth.currentUser;
  return (
    <div className="App">
      {user ? <Chat /> : <SignIn />}
      
    </div>
  );
}

export default App;
