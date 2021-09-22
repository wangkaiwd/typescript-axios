import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "../../../lib";
// document.cookie = "a=b; Max-Age=1000";

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
    console.log(e);
    const rate = e.loaded / e.total;
    NProgress.set(rate);
  }

  instance.interceptors.request.use((config) => {
    config.onDownloadProgress = progressHandler;
    config.onUploadProgress = progressHandler;
    return config;
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
downloadButton.addEventListener("click", () => {
  instance.post("/more/download", { responseType: "blob" }).then((response) => {
    console.log("response", response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "index.html");
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
});
