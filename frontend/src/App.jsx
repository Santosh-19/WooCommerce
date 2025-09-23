import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Test from "./components/Test";
// import { useState } from "react";
import ModalContextProvider from "./contexts/modalContext";
import OrderContextProvider from "./contexts/OrderContextProvider";

function App() {

  return (
    <>
      <OrderContextProvider>
        <ModalContextProvider>
          <Header />
          <Meals />
          <Cart />
          {/* <Test/> */}
        </ModalContextProvider>
      </OrderContextProvider>
    </>
  );
}

export default App;
