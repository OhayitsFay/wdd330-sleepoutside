import { showCartCount } from "./cartCount.js";

function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if(clear){
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
    
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, position = "afterBegin", clear = false, callback) {
  if(clear){
    parentElement.innerHTML = "";
  }

  const htmlTemplate = await templateFn(data);

  parentElement.insertAdjacentHTML(position, htmlTemplate.innerHTML);

  if(callback) {
    callback();
  }
}

export async function loadTemplate(path) {
  let html = await fetch(path).then(convertToText);
  let template = document.createElement("template")
  template.innerHTML = html;

  return template;
}

export async function loadHeaderFooter() {
  const headerPath = "/partial/header.html";
  const footerPath =  "/partial/footer.html";
  const headerTarget = document.getElementsByTagName("header")[0];
  const footerTarget = document.getElementsByTagName("footer")[0];
  renderWithTemplate(
    loadTemplate, 
    headerTarget, 
    headerPath, 
    "afterBegin", 
    false, 
    () => showCartCount());
  renderWithTemplate(loadTemplate, footerTarget, footerPath);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert-box");
  alert.innerHTML = `<div class="alert"> <p>${message}</p> </div>`;

  document.querySelector("main").prepend(alert);

  if(scroll) window.scrollTo({ top: 0, behavior: "smooth"});

  setTimeout(() => alert.remove(), 5000);
}
