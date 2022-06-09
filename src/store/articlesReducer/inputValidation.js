export function checkData(article, setError) {
  if (!article.title || !article.description || !article.body) {
    if (!article.title) setError({ title: 'Title cannot be empty' });
    if (article.title) setError({ title: '' });

    if (!article.description) setError({ description: 'Description cannot be empty' });
    if (article.description) setError({ description: '' });

    if (!article.body) setError({ body: 'Body cannot be empty' });
    if (article.body) setError({ body: '' });
  } else {
    setError({});
  }
}
