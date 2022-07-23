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


