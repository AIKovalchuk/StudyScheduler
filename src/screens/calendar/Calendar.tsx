import { View } from "react-native";
import React from "react";
import { Calendar, DateData } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type MyTasksScreenProp = DrawerNavigationProp<RootStackParamList, "MyTasks">;

const CalendarPage: React.FC = () => {
  const navigation = useNavigation<MyTasksScreenProp>();

  const onDayPress = (date: DateData) => {
    navigation.navigate("MyTasks", { date: date.dateString });
  };

  return (
    <View>
      <Calendar onDayPress={onDayPress} />
    </View>
  );
};

export default CalendarPage;
