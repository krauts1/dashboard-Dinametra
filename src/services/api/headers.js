const headers = {
    get: {
        method: 'GET',
        headers: {
          },
      },
      post: {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
      },
      post_urlencoded: {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
      },
};
export default headers;
