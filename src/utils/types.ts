export type AuthStack = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
};

export type AppStack = {
  UserTab: undefined;
  AddHabit: undefined;
  Details: {
    habitId: string;
  };
  FirestoreDemo: undefined;
  Premium: undefined;
};

export type UserTabStack = {
  Home: undefined;
  Stats: undefined;
  History: undefined;
  Settings: undefined;
};
