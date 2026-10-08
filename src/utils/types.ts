import { NavigatorScreenParams } from "@react-navigation/native";
export type AuthStack = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
};

export type AppStack = {
  UserTab: NavigatorScreenParams<UserTabStack>;
  AddHabit: undefined;
  Details: {
    habitId: string;
  };
  FirestoreDemo: undefined;
  Premium: undefined;
  ImagePicker: undefined;
};

export type UserTabStack = {
  Home: undefined;
  Stats: undefined;
  History: undefined;
  Settings: undefined;
};
