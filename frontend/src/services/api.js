// Basic fetch wrapper placeholder
export const apiClient = {
  get: async (url) => fetch(url).then((res) => res.json()),
  post: async (url, body) =>
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(
      (res) => res.json(),
    ),
}
