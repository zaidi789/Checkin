import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';

const GET_CHECK_IN_DATA = gql`
  query check_in {
    check_in {
      id
      name
      comment
      created_at
      image_url
      updated_at
    }
  }
`;

export default function CheckIn() {
  const isFocused = useIsFocused();
  const {loading, error, data, refetch} = useQuery(GET_CHECK_IN_DATA);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fetchedData, setFetchedData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  console.log(fetchedData);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetch().then(({data}) => {
        if (data && data.check_in) {
          setFetchedData(data.check_in);
        }
      });
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    const sortedData = [...fetchedData].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
    setSortedData(sortedData);
  }, [fetchedData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
      date,
    );
    const year = date.getFullYear();

    const formattedDay =
      day +
      (day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th');

    return `${formattedDay} of ${month} ${year}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatlistCon}>
        <FlatList
          data={sortedData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              {item.image_url && (
                <Image
                  source={{
                    uri: item.image_url,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <View style={styles.userCon}>
                <View style={styles.iconCon}>
                  <FontAwesome name="user" size={25} color="black" />
                </View>
                <View style={styles.userDetailsCon}>
                  {item.name === '' ? (
                    <Text style={styles.userName}>No Name</Text>
                  ) : (
                    <Text style={styles.userName}>{item.name}</Text>
                  )}
                  <Text style={styles.date}>{formatDate(item.created_at)}</Text>
                </View>
              </View>
              <View style={styles.commentCon}>
                {item.comment === null ? (
                  <Text style={styles.comment}>No Comment</Text>
                ) : (
                  <Text style={styles.comment}>{item.comment}</Text>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatlistCon: {
    marginTop: 10,
  },
  userCon: {
    flexDirection: 'row',
    marginTop: 15,
  },
  userName: {
    fontSize: 18,
    color: 'black',
  },
  date: {
    fontSize: 18,
    color: 'blue',
  },
  iconCon: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  userDetailsCon: {
    left: 8,
  },
  commentCon: {
    marginTop: 10,
    marginBottom: 10,
  },
  comment: {
    lineHeight: 20,
  },
  item: {
    width: '90%',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 10,
  },
});
