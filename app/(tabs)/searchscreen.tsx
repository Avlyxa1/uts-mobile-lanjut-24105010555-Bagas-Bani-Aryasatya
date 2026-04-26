import { BookItem, searchBooks } from '@/api/api';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [keyword, setKeyword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const onSearch = async () => {
    const text = keyword.trim();

    if (!text) {
      setErrorText('Field tidak boleh kosong.');
      return;
    }

    if (text.length < 3) {
      setErrorText('Field harus minimal 3 karakter.');
      return;
    }

    setErrorText('');
    setLoading(true);
    setIsSearched(true);

    try {
      const list = await searchBooks(text);
      setBooks(list.filter((item) => item.key));
    } catch (error) {
      console.log('Error saat mencari buku:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: theme.text }}>
          Search Books
        </Text>

        <TextInput
          value={keyword}
          onChangeText={(value) => {
            setKeyword(value);
            if (errorText) {
              setErrorText('');
            }
          }}
          placeholder="Cari judul buku..."
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginBottom: 8,
            color: theme.text,
          }}
          placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
        />

        {errorText ? (
          <Text style={{ color: '#ff3b30', marginBottom: 8 }}>{errorText}</Text>
        ) : null}

        <TouchableOpacity
          onPress={onSearch}
          style={{
            backgroundColor: '#007AFF',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Search</Text>
        </TouchableOpacity>

        {loading ? (
          <View style={{ marginTop: 8, alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={{ marginTop: 8, color: theme.text }}>Mencari buku...</Text>
          </View>
        ) : (
          <>
            {isSearched && books.length === 0 ? (
              <Text style={{ textAlign: 'center', color: theme.text }}>
                Buku tidak ditemukan.
              </Text>
            ) : null}

            <FlatList
              data={books}
              keyExtractor={(item) => item.key}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => (
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
                    source={{ uri: item.cover }}
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
                    numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}