import { Heading, Icon, IconButton, ScrollView } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { Task, TasksList } from "../../components/tasks";
import { TaskType } from "../../domain";
import { RootStackParamList } from "../../routes";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useStorage } from "../../service";

// const tasks1: TaskType[] = [
//   {
//     title: "Уроки в шкалке",
//     date: "2022-06-03",
//     startedAt: "8:00",
//     closedAt: "13:40",
//     type: Category.SchoolCategory,
//     comment: "Комментарий (если написан) но тут типо написал",
//   },
//   {
//     date: "2022-06-03",
//     title: "Занятие в Zoom",
//     startedAt: "15:00",
//     type: Category.DistanceLearningCategory,
//   },
//   {
//     date: "2022-06-03",
//     title: "Репетитор по русскому",
//     startedAt: "16:30",
//     closedAt: "17:15",
//     type: Category.TutorCategory,
//   },
//   {
//     date: "2022-06-03",
//     title: "Сходить в магазин",
//     startedAt: "17:20",
//     type: Category.PersonalCategory,
//   },
//   {
//     date: "2022-06-03",
//     title: "Уроки в шкалке",
//     startedAt: "8:00",
//     closedAt: "13:40",
//     type: Category.SchoolCategory,
//     comment: "Комментарий (если написан) но тут типо написал",
//   },
//   {
//     date: "2022-06-03",
//     title: "Уроки в шкалке",
//     startedAt: "8:00",
//     closedAt: "13:40",
//     type: Category.SchoolCategory,
//     comment: "Комментарий (если написан) но тут типо написал",
//   },
// ];

export type MyTasksScreenProps = DrawerScreenProps<
  RootStackParamList,
  "MyTasks"
>;

const MyTasksPage: React.FC<MyTasksScreenProps> = ({ route, navigation }) => {
  const formatDate = (date: string) => {
    const days = [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ];
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const chossenDate = new Date(date);
    const day = chossenDate.getDay();
    const month = chossenDate.getMonth();
    const day2 = chossenDate.getDate();
    const today =
      new Date().toISOString().split("T")[0] === date ? "Сегодня " : "";
    return `${today}${day2} ${months[month]}, ${days[day]}`;
  };

  const [tasks, setTasks] = React.useState<TaskType[]>([]);
  const { getData, getAllKeys } = useStorage();

  const loadData = async () => {
    console.log("qweqw");
    getAllKeys();
    const tasks$ = await getData(route.params.date);
    console.log("Get tasks", tasks$);
    setTasks(tasks$);
  };

  React.useEffect(() => {
    loadData();
  }, [route.params.date]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("drawerItemPress", () => {
      navigation.navigate("MyTasks", {
        date: new Date().toISOString().split("T")[0],
      });
      navigation.closeDrawer();
    });

    return unsubscribe;
  }, [navigation]);

  const onPress = () => {
    navigation.navigate("create");
  };

  return (
    <>
      <ScrollView backgroundColor={"#565459"}>
        <Heading
          marginLeft={4}
          marginTop={2}
          marginBottom={4}
          color="white"
          fontWeight="normal"
          fontSize={24}>
          {route.params?.date
            ? formatDate(route.params.date)
            : formatDate(new Date().toISOString().split("T")[0])}
        </Heading>
        <TasksList tasks={tasks} />
      </ScrollView>
      <IconButton
        onPress={onPress}
        position="absolute"
        right="5"
        bottom="5"
        borderRadius="full"
        backgroundColor="red.600"
        size="lg"
        icon={
          <Icon
            as={MaterialIcons}
            name="add"
            size="3xl"
            color="white"
            borderRadius="full"
          />
        }
      />
    </>
  );
};

export default MyTasksPage;
