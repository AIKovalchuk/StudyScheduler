import React from "react";
import { MyTasksPage } from "../screens/myTasks";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreateEvent from "../screens/create/CreateEvent";
import { Icon, IconButton } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CalendaerPage } from "../screens/calendar";

export type RootStackParamList = {
  MyTasks: { date: string };
  Calendar: undefined;
  Trash: undefined;
  create: { id: string; date: string } | undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerContentStyle: { backgroundColor: "#3D3A40" },
        drawerLabelStyle: { color: "#FFFFFF" },
        headerStyle: { backgroundColor: "#3D3A40" },
        headerTintColor: "white",
      }}>
      <Drawer.Screen
        name="MyTasks"
        component={MyTasksPage}
        initialParams={{ date: new Date().toISOString().split("T")[0] }}
        options={{
          title: "Мои дела",
          drawerIcon: () => (
            <MaterialIcons name="list" size={22} color="#FFFFFF" />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendaerPage}
        options={{
          title: "Календарь",
          drawerIcon: () => (
            <MaterialIcons name="calendar-today" size={22} color="#FFFFFF" />
          ),
        }}
      />
      <Drawer.Screen
        name="Trash"
        component={MyTasksPage}
        options={{
          title: "Корзина",
          drawerIcon: () => (
            <MaterialIcons name="delete" size={22} color="#FFFFFF" />
          ),
        }}
      />
      <Drawer.Screen
        name="create"
        component={CreateEvent}
        options={{
          title: "Мой дела",
          headerRight: () => (
            <IconButton
              icon={
                <Icon as={MaterialIcons} size="lg" name="done" color="white" />
              }
            />
          ),
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
