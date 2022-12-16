import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, ScrollView, View, Pressable, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Habit from './components/Habit';

const createHabit = (text) => {
  return {
    text,
    completed: false,
    streak: 0,
  };
};

export default function App() {
  const [edit, setEdit] = useState(false);
  const [habit, setHabit] = useState();
  const [habits, setHabits] = useState([
    createHabit('Read a book'),
    createHabit('Run'),
    createHabit('Play Guitar'),
  ]);

  const addHabit = () => {
    Keyboard.dismiss();
    if (habit === null) {
      Alert.alert("Whoops!", "Make sure to type the habit first");
      return;
    }
    setHabits([...habits, createHabit(habit)]);
    setHabit(null);
  };

  const removeHabit = (index) => {
    let habitsCopy = [...habits];
    habitsCopy.splice(index, 1);
    setHabits(habitsCopy);
  };

  const toggleHabit = (index) => {
    let habitsCopy = [...habits];
    let completed = habitsCopy[index].completed;
    if (completed) {
      habitsCopy[index].streak -= 1;
    } else {
      habitsCopy[index].streak += 1;
    }
    habitsCopy[index].completed = !completed;
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
                    <Habit edit={edit} habit={habit} />
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
