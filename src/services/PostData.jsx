const BaseUrl = "http://localhost/face_afeka/";

export function PostDataJSON(type, data) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.text.length > 0 && type !== "add_friend.php")
          reject({
            name: "php_response",
            message: responseJson.text,
          });
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function PostData(type, data) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: data,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
