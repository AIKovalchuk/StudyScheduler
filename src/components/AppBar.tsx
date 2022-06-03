import { Box, HStack, Icon, IconButton, StatusBar, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";

const AppBar: React.FC = () => {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack alignItems="center">
          <IconButton
            icon={
              <Icon as={MaterialIcons} size="sm" name="menu" color="white" />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            Хэдер мать его итить
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="favorite"
                size="sm"
                color="white"
              />
            }
          />
          <IconButton
            icon={
              <Icon as={MaterialIcons} name="search" size="sm" color="white" />
            }
          />
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size={6}
                color="white"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
};

export default AppBar;
