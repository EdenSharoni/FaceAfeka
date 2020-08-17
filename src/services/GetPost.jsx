const url = process.env.REACT_APP_SERVER;
const BaseUrl = url;

export function GetDataJSON(type, data) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: data,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((resposeJSON) => resolve(resposeJSON))
      .catch((error) => reject(error));
  });
}
