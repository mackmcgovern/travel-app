const dayCount = (date1, date2) => {
    const dayOne = Date.parse(date1);
    const dayTwo = Date.parse(date2)
    let difference = dayOne - dayTwo;
    let numOfDays = Math.ceil(difference / (1000 * 3600 * 24));
 return numOfDays;
}

const formatDate = (date) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const setDate = new Date(date);
    // let day = date.getUTCDate();
    // let month = date.getUTCMonth() + 1;
    // let year = date.getUTCFullYear();
    const formattedDate = `${month[setDate.getUTCMonth()]} ${setDate.getUTCDate()}, ${setDate.getUTCFullYear()}`;
    return(formattedDate);
}


export { dayCount, formatDate }