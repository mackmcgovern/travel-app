<<<<<<< HEAD
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
||||||| parent of c75976d... initial commit
import { checkForm } from "./js/formChecker";
import { handleSubmit } from "./js/formHandler";
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

// console.log(checkForName);

// alert("I EXIST");
// console.log("CHANGE!!");

export {
    checkForm,
    handleSubmit
}
=======
import { handleSubmit } from "./js/app";
import "./styles/style.scss";
import { dayCount, formatDate } from "./js/dates";
import { checkDates } from "./js/checkDates";


document.querySelector('#generate').addEventListener('click', handleSubmit);


export {
    handleSubmit,
    dayCount,
    checkDates,
    formatDate
}
>>>>>>> c75976d... initial commit

console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");
