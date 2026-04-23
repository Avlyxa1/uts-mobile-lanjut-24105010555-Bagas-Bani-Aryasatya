import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/trending/daily.json');
      const data = await response.json();

      // Ambil 15 buku random
      const shuffled = data.works.sort(() => 0.5 - Math.random());
      const bookList = shuffled.slice(0, 15);
      
      // Log untuk debugging
      console.log('Books:', bookList);
      
      setBooks(bookList);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getBooks();
    setRefreshing(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Trending Books
        </Text>

        <FlatList
          data={books}
          numColumns={2}
          keyExtractor={(item) => item.key}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            // Coba ambil cover dari berbagai sumber
            let coverUri = '';
            
            if (item.cover_id) {
              coverUri = `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
            } else if (item.cover_edition_key) {
              coverUri = `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`;
            } else if (item.key) {
              // Fallback: gunakan work key
              const workId = item.key.replace('/works/', '');
              coverUri = `https://covers.openlibrary.org/w/olid/${workId}-M.jpg`;
            } else {
              coverUri = 'https://via.placeholder.com/150x225.png?text=No+Image';
            }

            return (
              <View style={{
                flex: 1,
                alignItems: 'center',
                marginBottom: 15,
                marginRight: 5,
              }}>
                <Image
                  source={{
                    uri: coverUri,
                  }}
                  style={{
                    width: 150,
                    height: 225,
                    borderRadius: 8,
                    backgroundColor: '#f0f0f0',
                  }}
                  contentFit="cover"
                  placeholder="https://via.placeholder.com/150x225.png?text=Loading"
                />
                <Text 
                  style={{ marginTop: 8, fontSize: 12, textAlign: 'center' }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}