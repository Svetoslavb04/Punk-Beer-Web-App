import { Outlet } from 'react-router-dom';
import Header from './layout/Header';

function App() {
  return (
    <>
      <div className="application">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
