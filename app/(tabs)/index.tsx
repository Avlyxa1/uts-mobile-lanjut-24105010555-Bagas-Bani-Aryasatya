import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [subject, setSubject] = useState('love');
  const [error, setError] = useState(false);
  const router = useRouter();

  const getBooks = () => {
    setError(false);

    fetch(`https://openlibrary.org/subjects/${subject}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => setBooks(data.works))
      .catch(() => setError(true));
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error saat mengambil data</Text>
          <Button title="Coba lagi" onPress={getBooks} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>\
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
  Cari Genre
</Text>
        <TextInput
          value={subject}
          onChangeText={setSubject}
          placeholder="contoh: love, science, history"
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        />

        <Button title="Cari" onPress={getBooks} />

        <Text style={{ fontSize: 20, marginVertical: 10 }}>
          Daftar Buku
        </Text>

        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/book/${item.key.replace('/works/', '')}`)
              }
              style={{
                padding: 10,
                borderBottomWidth: 1,
              }}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}