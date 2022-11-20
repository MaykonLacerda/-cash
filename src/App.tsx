import { AppRoutes } from 'routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/global.css';

function App() {
  return (
    <div className="container">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
