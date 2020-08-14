const BaseUrl = "http://localhost/face_afeka/";

export function GetDataJSON(type, data) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((resposeJSON) => resolve(resposeJSON))
      .catch((error) => reject(error));
  });
}
