import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { CategoryToColor, TaskType } from "../../domain";
import { RootStackParamList } from "../../routes";

export type CreateScreenProps = DrawerNavigationProp<
  RootStackParamList,
  "create"
>;

const Task: React.FC<TaskType> = ({
  id,
  title,
  type,
  date,
  startedAt,
  closedAt,
  comment,
}) => {
  const nav = useNavigation<CreateScreenProps>();

  const onPress = () => {
    nav.navigate("create", { id, date });
  };

  return (
    <Pressable onPress={onPress}>
      <Box style={styles.box} backgroundColor={CategoryToColor[type]}>
        <Text fontSize={15} fontWeight={400}>
          {title}
        </Text>
        <Text>
          {startedAt}
          {closedAt ? " - " + closedAt : ""}
        </Text>
        <Text>{comment}</Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 22,
    height: 109,
    padding: 10,
    marginBottom: 12,
    marginHorizontal: 12,
  },
});

export default Task;
