const url = process.env.REACT_APP_SERVER;
const BaseUrl = url;

export function PostDataJSON(type, data) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: data,
      credentials: "same-origin",
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
        console.log(error);
        reject(error);
      });
  });
}

export function PostData(type, data) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: data,
      credentials: "same-origin",
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
