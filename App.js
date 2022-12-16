import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, ScrollView, View, Pressable, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Habit from './components/Habit';

const now = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const indexOfToday = (dates) => {
  for (let i = 0; i < dates.length; ++i) {
    const date = dates[i];
    if (today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() && today.getDate() == date.getDate()) {
      return i;
    }
  }

  return -1;
};

const hasToday = (dates) => {
  return indexOfToday(dates) !== -1;
};

const createHabit = (text) => {
  return {
    text,
    dates: [],
  };
};

const saveHabits = async (habits) => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem('habits', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const loadHabits = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('habits');
    if (jsonValue === null) {
      return [];
    }

    const habits = JSON.parse(jsonValue);
    for (habit of habits) {
      habit.dates = habit.dates.map((date) => new Date(date));
    }
    return habits;

  } catch (e) {
    console.error(e);
  }

  return [];
};

const today = now();

export default function App() {
  const [edit, setEdit] = useState(false);
  const [habit, setHabit] = useState();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadHabits().then(habits => { setHabits(habits); }).catch(e => console.error(e));
  }, []);

  const addHabit = () => {
    Keyboard.dismiss();
    if (habit === null) {
      Alert.alert("Whoops!", "Make sure to type the habit first");
      return;
    }
    const newHabits = [...habits, createHabit(habit)];
    saveHabits(newHabits);
    setHabits(newHabits);
    setHabit(null);
  };

  const removeHabit = (index) => {
    let habitsCopy = [...habits];
    habitsCopy.splice(index, 1);
    saveHabits(habitsCopy);
    setHabits(habitsCopy);
  };

  const toggleHabit = (index) => {
    let habitsCopy = [...habits];
    let ind = indexOfToday(habitsCopy[index].dates);
    if (ind !== -1) {
      habitsCopy[index].dates.splice(ind, 1);
    } else {
      habitsCopy[index].dates.push(today);
    }
    saveHabits(habitsCopy);
    setHabits(habitsCopy);
  };

  const handleHabit = (index) => {
    Keyboard.dismiss();
    if (edit) { removeHabit(index); } else { toggleHabit(index); };
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.habitsWrapper}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Your Habits</Text>
          <TouchableOpacity onPress={() => setEdit(!edit) }>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1}} keyboardShouldPersistTaps='handled' >
          <View style={styles.items}>
            {
              habits.map((habit, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => handleHabit(index) }>
                    <Habit edit={edit} habit={habit} completed={hasToday(habit.dates)} today={today} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.writeHabitWrapper}>
        <TextInput style={styles.input} placeholder={'Write a habit'} value={habit} onChangeText={(text) => setHabit(text)}/>
        <TouchableOpacity onPress={() => addHabit()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  habitsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  edit: {
    color: '#00f',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeHabitWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
});
