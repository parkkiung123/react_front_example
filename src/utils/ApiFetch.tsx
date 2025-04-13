import { SERVER_URL, URL, CODE } from "./Config";

export function requestFetch(
    url: any,
    requestOptions: RequestInit | undefined,
    handler: (arg0: any) => void | undefined,
    errorHandler: (arg0: any) => void | undefined,
  ) {
    console.groupCollapsed("requestFetch");
    console.log("requestFetch [URL] : ", SERVER_URL + url);
    console.log("requestFetch [requestOption] : ", requestOptions);

    fetch(SERVER_URL + url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (URL.LOGIN === url) {
          if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) {
            return false;
          } else {
            return resp;
          }
        } else {
          return resp;
        }
      })
      .then((resp) => {
        console.groupCollapsed("requestFetch.then()");
        console.log("requestFetch [response] ", resp);
        if (typeof handler === "function") {
          handler(resp);
        } else {
          console.log("fetch handler not assigned!");
        }
        console.groupEnd();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error === "TypeError: Failed to fetch") {
          alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
        }
        if (typeof errorHandler === "function") {
          errorHandler(error);
        } else {
          console.error("error handler not assigned!");
          alert("ERR : " + error.message);
        }
      })
      .finally(() => {
        console.log("requestFetch finally end");
        console.groupEnd();
      });
  }
  
