import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import AppStack from "./src/routes/AppStack";

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
