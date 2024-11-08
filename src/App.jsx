import "./App.css";
import RoutesComponent from "./routes";
import { Helmet } from "react-helmet";
import favicon from "./assets/img/tokens/wtheta.png";
import { AuthProvider } from './contexts/AuthContext';
// import LoginButton from './components/common/LoginButton';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Helmet>
          <title>Theta Screener</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        </Helmet>
        <RoutesComponent />
      </div>
    </AuthProvider>
  );
}

export default App;
