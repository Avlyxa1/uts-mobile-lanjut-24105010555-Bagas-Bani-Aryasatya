import { BookItem } from '@/api/api';
import { useFavoriteStore } from '@/store/favorite-store';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const router = useRouter();
  const favoriteBooks = useFavoriteStore((state) => state.favoriteBooks);
  const addFavoriteBook = useFavoriteStore((state) => state.addFavoriteBook);
  const removeFavoriteBook = useFavoriteStore((state) => state.removeFavoriteBook);
  const params = useLocalSearchParams<{
    action?: string;
    key?: string;
    title?: string;
    author?: string;
    year?: string;
    cover?: string;
    updatedAt?: string;
  }>();

  useEffect(() => {
    if (!params.action || !params.key) {
      return;
    }

    if (params.action === 'add') {
      const newBook: BookItem = {
        key: params.key ?? '',
        title: params.title ?? 'Judul tidak ditemukan',
        author: params.author ?? 'Penulis tidak ditemukan',
        year: params.year ?? '-',
        cover: params.cover ?? 'https://covers.openlibrary.org/b/id/0-M.jpg',
      };
      addFavoriteBook(newBook);
    }

    if (params.action === 'remove') {
      removeFavoriteBook(params.key);
    }
  }, [params.action, params.key, params.updatedAt, params.title, params.author, params.year, params.cover, addFavoriteBook, removeFavoriteBook]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Favorite Books
        </Text>

        {favoriteBooks.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Belum ada buku favorit.</Text>
          </View>
        ) : (
          <FlatList
            data={favoriteBooks}
            numColumns={2}
            keyExtractor={(item) => item.key}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/detail/detailbuku',
                      params: {
                        workKey: item.key,
                        cover: item.cover,
                        isFavorite: 'true',
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
                    style={{ marginTop: 8, fontSize: 12, textAlign: 'center' }}
                    numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}