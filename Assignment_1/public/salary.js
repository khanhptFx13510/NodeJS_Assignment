// console.log(new Date(props.workOnDay[0].beginWork).getMonth());
// console.log(new Date(props.workOnDay[0].beginWork).getDate());

let table = document.getElementById("salary-table");

// caculate every working on day
function calculateTime(timeWork) {

   if(timeWork.endWork == undefined){
      return "In time working"
   } else{
      let aTime = new Date(
         new Date(timeWork.endWork).getTime() - 
         new Date(timeWork.beginWork).getTime()
      );
      let seconds = Math.floor((aTime / 1000) % 60);
      let minutes = Math.floor((aTime / (1000 * 60)) % 60);
      let hours = Math.floor((aTime / (1000 * 60 * 60)) % 24);
      return  hours + ":" + minutes + ":" + seconds
   }
}

// check and render AnnualLeave into table
function checkAnnual (month) {
   // parse all day annual leave of a month in new array
   let dayAnnualInMonth = [];
   for(days of annualLeave[month]){
      for(day of days.days)
         dayAnnualInMonth.push(day);
   }

   // render in table cell AnnualLeave
   for(let i = 0; i < dayAnnualInMonth.length; i++) {
      table.tBodies[0].rows[i].cells[7].innerHTML = `${dayAnnualInMonth[i]}`
   }   
}

// handle overtime and Lack of Working Time
function checkOverTime(){
   console.log(data)
}

// ------------------------ Check and render value in table-------------------------
function monthDetail(element) {
   table.tBodies[0].innerHTML = "";
   if(element.innerText === "January") {
      console.log(data[1]);
   }
   else if(element.innerText === "February") {
      console.log(data[2]);
   }
   else if(element.innerText === "March") {
      console.log(data[3]);
   }
   else if(element.innerText === "April") {
      console.log(data[4]);
   }
   else if(element.innerText === "May") {
      console.log(data[5]);
   }
   else if(element.innerText === "June"){
      console.log(data[6]);
   }
   else if(element.innerText === "July"){
      console.log(data[7]);
   }
   else if(element.innerText === "August"){
      console.log(data[8]);
   }
   else if(element.innerText === "September"){
      console.log(data[9]);
   }
   else if(element.innerText === "October"){
      for(let i in data[10]){

         for(day of data[10][i]){
            table.tBodies[0].innerHTML += 
            `<tr class="tr">
               <td>${new Date(day.beginWork).getDate()}</td>
               <td>
                  ${new Date(day.beginWork).getHours()}:
                  ${new Date(day.beginWork).getMinutes()}:
                  ${new Date(day.beginWork).getSeconds()}s
               </td>
               <td>
                  ${new Date(day.endWork).getHours()}:
                  ${new Date(day.endWork).getMinutes()}:
                  ${new Date(day.endWork).getSeconds()}s
               </td>
               <td>
                  ${calculateTime(day)}
               </td>
               <td>
                  ${day.workPlace}
               </td>
               <td></td>
               <td></td>
               <td></td>
            </tr>`
         };
      }
      checkAnnual(10);
      checkOverTime();
   }
   else if(element.innerText === "November"){
      console.log(data[11]);
   }
   else if(element.innerText === "December"){
      console.log(data[12]);
   }
}






// const workOnDay = props.workOnDay;
// create an object that stores data by month and day
// let monthInYear = { "1":{} ,"2":{} ,"3":{} ,"4":{} ,"5":{} ,"6":{} ,"7":{} ,"9":{} ,"10":{} ,"11":{} ,"12":{} };
// filter follow month in year
// for(e of workOnDay){
//    let dayKey = new Date(e.beginWork).getDate();
//    // January
//    if(new Date(e.beginWork).getMonth() === 1){
//       if(dayKey in monthInYear[1]){
//          monthInYear[1][dayKey].push(e);
//       } else{
//          monthInYear[1][dayKey] = [e];
//       }
//    }
//    // February
//    if(new Date(e.beginWork).getMonth() === 2){

//       if(dayKey in monthInYear[2]){
//          monthInYear[2][dayKey].push(e);
//       } else{
//          monthInYear[2][dayKey] = [e];
//       }
//    }
//    // March
//    if(new Date(e.beginWork).getMonth() === 3){

//       if(dayKey in monthInYear[3]){
//          monthInYear[3][dayKey].push(e);
//       } else{
//          monthInYear[3][dayKey] = [e];
//       }
//    }
//    // April
//    if(new Date(e.beginWork).getMonth() === 4){

//       if(dayKey in monthInYear[4]){
//          monthInYear[4][dayKey].push(e);
//       } else{
//          monthInYear[4][dayKey] = [e];
//       }
//    }
//    // May
//    if(new Date(e.beginWork).getMonth() === 5){

//       if(dayKey in monthInYear[5]){
//          monthInYear[5][dayKey].push(e);
//       } else{
//          monthInYear[5][dayKey] = [e];
//       }
//    }
//    // June
//    if(new Date(e.beginWork).getMonth() === 6){

//       if(dayKey in monthInYear[6]){
//          monthInYear[6][dayKey].push(e);
//       } else{
//          monthInYear[6][dayKey] = [e];
//       }
//    }
//    // July
//    if(new Date(e.beginWork).getMonth() === 7){

//       if(dayKey in monthInYear[7]){
//          monthInYear[7][dayKey].push(e);
//       } else{
//          monthInYear[7][dayKey] = [e];
//       }
//    }
//    // August
//    if(new Date(e.beginWork).getMonth() === 8){

//       if(dayKey in monthInYear[8]){
//          monthInYear[8][dayKey].push(e);
//       } else{
//          monthInYear[8][dayKey] = [e];
//       }
//    }
//    // September
//    if(new Date(e.beginWork).getMonth() === 9){

//       if(dayKey in monthInYear[9]){
//          monthInYear[9][dayKey].push(e);
//       } else{
//          monthInYear[9][dayKey]= [e]
//       }
//    }
//    // October
//    if(new Date(e.beginWork).getMonth() === 10){

//       if(dayKey in monthInYear[10]){
//          monthInYear[10][dayKey].push(e);
//       } else{
//          monthInYear[10][dayKey] = [e];
//       }
//    }
//    // November
//    if(new Date(e.beginWork).getMonth() === 11){

//       if(dayKey in monthInYear[11]){
//          monthInYear[11][dayKey].push(e);
//       } else{
//          monthInYear[11][dayKey] = [e];
//       }
//    }
//    // December
//    if(new Date(e.beginWork).getMonth() === 12){

//       if(dayKey in monthInYear[12]){
//          monthInYear[12][dayKey].push(e);
//       } else{
//          monthInYear[12][dayKey] = [e];
//       }
//    }
// };

// console.log(monthInYear);