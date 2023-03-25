import { writable } from "svelte/store";
import { auth } from "./firebase_conf";

let initialToken = localStorage.getItem("userToken");
let defaultToken;

if (initialToken) {
  defaultToken = initialToken;
}

const userTokenStore = writable(initialToken);

userTokenStore.subscribe((token) => {
  localStorage.setItem("userToken", token);
});

const checkPassword = function (password, confirmPassword) {
  if (password != confirmPassword) {
    alert("আপনার পাসওয়ার্ড ম্যাচ করে না। আবার লিখুন!");
    return false;
  }
  if (password.length < 6) {
    alert("আপনার পাসওয়ার্ড অন্তত ৬ অক্ষর হতে হবে। আবার লিখুন!");
    return false;
  }

  return true;
};

const checkPhoneNumber = function (phoneNumber) {
  if (phoneNumber.length != 11 || !phoneNumber.startsWith("0")) {
    alert("আপনার ফোন নাম্বার ঠিক নেই। আবার লিখুন!");
    return false;
  }
  return true;
};

const checkUsername = function( userName ){
  
  return true ;
}
const logOut = function () {
  userTokenStore.set(null);
  localStorage.setItem("userToken", null);
  auth.signOut().then(() => {
    console.log("Logged out");
  });
};



const isLoggedIn = () => {
  let flag = false;

  if (auth.currentUser != null) {
    flag = true;
  }
  return flag;
};

export { checkUsername, checkPassword, checkPhoneNumber, logOut, isLoggedIn, userTokenStore };
