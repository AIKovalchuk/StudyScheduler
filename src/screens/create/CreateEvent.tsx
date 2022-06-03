import React from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckIcon,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { Category, TaskCategoryType } from "../../domain/taskType";
import { DatePicker } from "../../components/datePicker";
import { StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TaskType } from "../../domain";
import { useStorage } from "../../service";
import { RootStackParamList } from "../../routes";
import { DrawerScreenProps } from "@react-navigation/drawer";

export type CreateScreenProps = DrawerScreenProps<RootStackParamList, "create">;

const CreateEvent: React.FC<CreateScreenProps> = ({ route, navigation }) => {
  const { storeTask, getData, removeItem } = useStorage();

  const [title, setTitle] = React.useState<string>("");
  const [category, setCategory] = React.useState<TaskCategoryType>(
    Category.SchoolCategory,
  );
  const [startedAt, setStartedAt] = React.useState<Date>(new Date());
  const [closedAt, setClosedAt] = React.useState<Date>(new Date());
  const [notify, setNotify] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("");

  const loadTask = async () => {
    if (route.params && route.params?.id) {
      const tasks = await getData(route.params.id);
      const task = tasks.find(val => val.id === route.params?.id);
      if (task) {
        setTitle(task.title);
        setCategory(task.type);
        setStartedAt(new Date(task.date + task.startedAt));
        task.closedAt && setClosedAt(new Date(task.closedAt));
        task.comment && setComment(task.comment);
      }
    }
  };

  const remove = () => {
    if (route.params && route.params?.id) {
      removeItem(startedAt.toISOString().split("T")[0], route.params?.id);
      navigation.navigate("MyTasks", {
        date: startedAt.toISOString().split("T")[0],
      });
    }
  };

  React.useEffect(() => {
    loadTask();
  }, [route.params?.id]);

  const createEvent = () => {
    const dateOfEvent = startedAt.toISOString().split("T")[0];
    const new_event: TaskType = {
      id: uuidv4(),
      title,
      date: dateOfEvent,
      startedAt: startedAt.toISOString().split("T")[1].split(".")[0],
      closedAt: closedAt
        ? closedAt.toISOString().split("T")[1].split(".")[0]
        : undefined,
      type: category,
      comment,
    };
    storeTask(dateOfEvent, new_event);
    navigation.navigate("MyTasks", { date: dateOfEvent });
  };

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        onPress={createEvent}
        icon={<Icon as={MaterialIcons} size="lg" name="done" color="white" />}
      />
    ),
  });

  return (
    <Box backgroundColor={"#565459"} flex={"1"}>
      <VStack justifyContent={"flex-start"} margin={5}>
        <Box style={styles.box}>
          <VStack>
            <Input value={title} onChangeText={setTitle} borderWidth="0" />
            <Divider bg="white" />
            <Select
              borderWidth="0"
              selectedValue={category}
              minWidth="200"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                setCategory(itemValue as TaskCategoryType)
              }>
              <Select.Item label="Школа" value={Category.SchoolCategory} />
              <Select.Item
                label="Дистанционное занятие"
                value={Category.DistanceLearningCategory}
              />
              <Select.Item
                label="Персональное занятие"
                value={Category.PersonalCategory}
              />
              <Select.Item label="репититор" value={Category.TutorCategory} />
              <Select.Item label="курс" value={Category.ElectivesCategory} />
            </Select>
          </VStack>
        </Box>
        <Box style={styles.box}>
          <Center>
            <HStack>
              <DatePicker
                label="Начало"
                date={startedAt}
                setDate={setStartedAt}
              />
              <Divider bg="white" orientation="vertical" mx="2" />
              <DatePicker label="Конец" date={closedAt} setDate={setClosedAt} />
            </HStack>
          </Center>
          <Checkbox value={"true"} onChange={setNotify}>
            Установить напоминание
          </Checkbox>
        </Box>
        <Box style={styles.box}>
          <Text>Заметки</Text>
          <TextArea
            value={comment}
            onChangeText={setComment}
            autoCompleteType="off"
            borderWidth="0"
            h={20}
            maxW="300"
          />
        </Box>
        <Button
          colorScheme="error"
          variant="outline"
          borderRadius={18}
          borderColor="red.600"
          onPress={remove}>
          Удалить
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#E8E8E8",
    borderRadius: 24,
    padding: 12,
    marginBottom: 16,
  },
});
