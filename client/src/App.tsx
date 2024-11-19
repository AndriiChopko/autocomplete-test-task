import React from 'react';
import Snackbar from './components/Snackbar';
import useSnackbar from './hooks/useSnackbar';
import './App.css';
import Form from './components/Form';
import { SnackbarContext } from './context/snackbarContext';

function App() {
  const snackbar = useSnackbar();

  return (
    <SnackbarContext.Provider value={snackbar}>
      <div className="App">
        <Form />
        {snackbar.isOpen && (
          <Snackbar
            message={snackbar.message}
            handleClose={snackbar.close}
            success={snackbar.isSuccess}
          />
        )}
      </div>
    </SnackbarContext.Provider>
  );
}

export default App;