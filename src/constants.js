const authUrl = import.meta.env.VITE_AUTH_URL;
const dissectixUrl = import.meta.env.VITE_DISSECTIX_URL;

const LOGIN_URL = authUrl + "login/";
const REGISTER_URL = authUrl + "register/";

const CHALLENGE_URL = dissectixUrl + "challenge/";
const CODE_TESTING_URL = dissectixUrl + "codetesting/"

export {LOGIN_URL,REGISTER_URL,CHALLENGE_URL,CODE_TESTING_URL};