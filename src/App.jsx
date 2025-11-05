import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  // App-level state that can be passed to routes via outlet context
  const [globalState, setGlobalState] = useState({
    user: null,
    preferences: {},
    notifications: []
  });

  // App-level methods
  const updateGlobalState = (updates) => {
    setGlobalState(prev => ({ ...prev, ...updates }));
  };

  // Context value to pass to all routes
  const outletContextValue = {
    globalState,
    setGlobalState,
    updateGlobalState
  };

  return (
    <>
      <Outlet context={outletContextValue} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
        toastClassName="!rounded-lg !shadow-xl"
      />
<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;