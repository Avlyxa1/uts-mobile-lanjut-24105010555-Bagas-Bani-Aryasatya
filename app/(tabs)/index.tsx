import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookItem, getTrendingBooks } from '@/api/api';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getBooks = async () => {
    try {
      const bookList = await getTrendingBooks();
      setBooks(bookList);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getBooks();
    setRefreshing(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10, color: theme.text }}>Memuat data buku...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, color: theme.text }}>
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
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/detail/detailbuku',
                    params: {
                      workKey: item.key,
                      cover: item.cover,
                    },
                  })
                }
                style={{
                flex: 1,
                alignItems: 'center',
                marginBottom: 15,
                marginRight: 5,
              }}>
                <Image
                  source={{
                    uri: item.cover,
                  }}
                  style={{
                    width: 150,
                    height: 225,
                    borderRadius: 8,
                    backgroundColor: '#f0f0f0',
                  }}
                  contentFit="cover"
                  placeholder="https://covers.openlibrary.org/b/id/0-M.jpg"
                />
                <Text
                  style={{ marginTop: 8, fontSize: 12, textAlign: 'center', color: theme.text }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}