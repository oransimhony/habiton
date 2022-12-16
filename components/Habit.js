import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';

const Habit = ({ edit, habit }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={edit ? styles.remove : styles.square}>
          <Text style={{ color: "#FFF" }}>{edit ? "-" : habit.streak}</Text>
        </View>
        <Text style={styles.itemText}>{habit.text}</Text>
      </View>
      <View style={habit.completed ? styles.circularCompleted : styles.circularToComplete}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  remove: {
    width: 42,
    height: 42,
    backgroundColor: '#FF2516',
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 42,
    height: 42,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    maxWidth: '80%',
  },
  circularCompleted: {
    width: 21,
    height: 21,
    borderColor: '#95FF16',
    backgroundColor: '#95FF16',
    borderWidth: 2,
    borderRadius: 5,
  },
  circularToComplete: {
    width: 21,
    height: 21,
    borderColor: '#FFB516',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Habit;
