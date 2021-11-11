import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "../../../lib";

import "./baseUrl";

document.cookie = "a=b; Max-Age=1000";
//
// axios
//   .get("http://localhost:3001/more/credentials", { withCredentials: true })
//   .then((res) => {
//     console.log("res", res);
//   });
//
// axios
//   .get("http://localhost:3001/more/credentials", { withCredentials: false })
//   .then((res) => {
//     console.log("res", res);
//   });
//
// axios
//   .get("/more/get", {
//     xsrfCookieName: "test-cookie-name",
//     xsrfHeaderName: "test-header-name",
//   })
//   .then((res) => {
//     console.log(res);
//   });

const instance = axios.create();
const file = document.getElementsByClassName("file")[0];
const downloadButton = document.getElementsByClassName("download")[0];

function loadProgress() {
  function progressHandler(e: ProgressEvent<XMLHttpRequestEventTarget>) {
    console.log("upload", e);
    // console.log(e);
    // const rate = e.loaded / e.total;
  }

  function download(e: ProgressEvent<XMLHttpRequestEventTarget>) {
    const rate = e.loaded / e.total;
    console.log("rate", rate);
    NProgress.set(rate);
  }

  instance.interceptors.request.use((config) => {
    NProgress.start();
    config.onDownloadProgress = download;
    config.onUploadProgress = progressHandler;
    return config;
  });
  instance.interceptors.response.use((res) => {
    NProgress.done();
    NProgress.remove();
    return res;
  });
}

loadProgress();

// upload
file.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0]!;
  const formData = new FormData();
  formData.append("file", file);
  console.log("upload");
  instance.post("/more/upload", formData);
});
// download
// todo: why download video can't play ?
downloadButton.addEventListener("click", () => {
  instance
    .post("/more/download", { responseType: "stream" })
    .then((response) => {
      console.log("response", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "test-video.mp4");
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
});
