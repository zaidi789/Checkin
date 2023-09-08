import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {format} from 'date-fns';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {format} from 'date-fns';
export default function Submit() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment}
          onChangeText={setComment}
        />
        <TextInput
          style={styles.input}
          placeholder="ImageUrl"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleButtonPress();
          }}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  background: {
    height: '100%',
    width: '90%',
    marginTop: 20,
  },

  input: {
    width: '100%',
    height: 50,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
