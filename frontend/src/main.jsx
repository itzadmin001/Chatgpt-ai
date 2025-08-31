import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import Main from "./ContextMain.jsx"

const notify = (msg, flag) => toast(msg, { type: flag });

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <Main>

      <App />
    </Main>
  </Provider>,
)
