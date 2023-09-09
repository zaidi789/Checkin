import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';

const INSERT_CHECK_IN_MUTATION = gql`
  mutation InsertCheckIn(
    $name: String!
    $comment: String!
    $imageUrl: String!
    $created_at: timestamptz!
  ) {
    insert_check_in_one(
      object: {
        name: $name
        comment: $comment
        image_url: $imageUrl
        created_at: $created_at
      }
    ) {
      id
      name
      comment
      created_at
      image_url
    }
  }
`;

export default function Submit() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mutationResult, setMutationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [insertCheckIn] = useMutation(INSERT_CHECK_IN_MUTATION);

  const handleButtonPress = async () => {
    try {
      setIsLoading(true);

      const currentTimestamp = new Date().toISOString();

      const {data} = await insertCheckIn({
        variables: {
          name,
          comment,
          imageUrl,
          created_at: currentTimestamp,
        },
      });

      setMutationResult(data.insert_check_in_one);

      setName('');
      setComment('');
      setImageUrl('');
    } catch (error) {
      console.error('Error inserting check-in:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        {isLoading && <Text>Loading...</Text>}
        {mutationResult && (
          <Text>Mutation Result: {JSON.stringify(mutationResult)}</Text>
        )}
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
