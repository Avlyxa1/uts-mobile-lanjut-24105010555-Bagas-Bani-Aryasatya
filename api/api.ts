export type BookItem = {
  key: string;
  title: string;
  author: string;
  year: string;
  cover: string;
};

export type BookDetail = {
  title: string;
  author: string;
  publisher: string;
  year: string;
  pages: string;
};

export async function getTrendingBooks(): Promise<BookItem[]> {
  const response = await fetch('https://openlibrary.org/trending/daily.json');
  const data = await response.json();

  const shuffled = data.works.sort(() => 0.5 - Math.random());
  const bookList = shuffled.slice(0, 15);

  return bookList.map((item: any) => {
    let cover = '';

    if (item.cover_id) {
      cover = `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
    } else if (item.cover_edition_key) {
      cover = `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`;
    } else if (item.key) {
      const workId = item.key.replace('/works/', '');
      cover = `https://covers.openlibrary.org/w/olid/${workId}-M.jpg`;
    } else {
      cover = 'https://covers.openlibrary.org/b/id/0-M.jpg';
    }

    return {
      key: item.key,
      title: item.title ?? 'Judul tidak ditemukan',
      author: item?.authors?.[0]?.name ?? 'Penulis tidak ditemukan',
      year: item.first_publish_year ? String(item.first_publish_year) : '-',
      cover,
    };
  });
}

export async function getBookDetail(workKey: string): Promise<BookDetail> {
  const response = await fetch(`https://openlibrary.org${workKey}.json`);
  const workData = await response.json();

  let author = 'Penulis tidak tersedia';
  if (workData?.authors?.[0]?.author?.key) {
    const authorResponse = await fetch(`https://openlibrary.org${workData.authors[0].author.key}.json`);
    const authorData = await authorResponse.json();
    author = authorData?.name ?? author;
  }

  const editionsResponse = await fetch(`https://openlibrary.org${workKey}/editions.json?limit=20`);
  const editionsData = await editionsResponse.json();
  const editions = editionsData?.entries ?? [];

  const editionWithPublisher = editions.find((item: any) => item?.publishers?.length > 0);
  const editionWithPages = editions.find((item: any) => item?.number_of_pages);
  const firstEdition = editions[0];

  const publisher =
    editionWithPublisher?.publishers?.[0] ??
    firstEdition?.publishers?.[0] ??
    'Penerbit tidak tersedia';
  const pages = editionWithPages?.number_of_pages
    ? String(editionWithPages.number_of_pages)
    : '-';
  const year =
    firstEdition?.publish_date ??
    (workData?.first_publish_date ? String(workData.first_publish_date) : '-');

  return {
    title: workData?.title ?? 'Judul tidak ditemukan',
    author,
    publisher,
    year,
    pages,
  };
}

export async function searchBooks(keyword: string): Promise<BookItem[]> {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(keyword)}&limit=20`
  );
  const data = await response.json();
  const docs = data?.docs ?? [];

  return docs.map((item: any) => {
    const workKey = item?.key ?? '';
    const coverId = item?.cover_i;
    const cover = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'https://covers.openlibrary.org/b/id/0-M.jpg';

    return {
      key: workKey,
      title: item?.title ?? 'Judul tidak ditemukan',
      author: item?.author_name?.[0] ?? 'Penulis tidak ditemukan',
      year: item?.first_publish_year ? String(item.first_publish_year) : '-',
      cover,
    };
  });
}
