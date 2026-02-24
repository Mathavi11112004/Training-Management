
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppNavigator from './navigation/appNavigator.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        <AppNavigator />
      </BrowserRouter>
    </>
  )
}
export default App