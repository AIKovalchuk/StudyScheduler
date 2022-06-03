import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskType } from "../domain";

const useStorage = () => {
  const storeTask = async (key: string, value: TaskType) => {
    const prev = await getData(key);
    const newData = JSON.stringify([...prev, value]);
    try {
      await AsyncStorage.setItem(key, newData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async (key: string): Promise<TaskType[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.log(e);
      return [];
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log("Clear done");
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }

    console.log(keys);
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  const removeItem = async (key: string, id: string) => {
    const prev = await getData(key);
    const newData = JSON.stringify(prev.filter(val => val.id !== id));
    try {
      await AsyncStorage.setItem(key, newData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return { getData, storeTask, removeItem, clearAll, getAllKeys };
};

export default useStorage;
