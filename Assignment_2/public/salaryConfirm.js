let table = document.getElementById("salary-table");

//  function convert time
function convertTime(time) {
   let seconds = Math.floor((time / 1000) % 60);
   let minutes = Math.floor((time / (1000 * 60)) % 60);
   let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

   return {hours: hours, minutes: minutes, seconds: seconds}
};

// caculation time everytime working on a day
function calculateTime(timeWork) {
   // console.log("timeWork", timeWork);
   if(timeWork.endWork == undefined){
      return "In time working";
   } else{
      let aTime = new Date(
         new Date(timeWork.endWork).getTime() - 
         new Date(timeWork.beginWork).getTime()
      );
      return convertTime(aTime).hours + ":" 
         + convertTime(aTime).minutes + ":" 
         + convertTime(aTime).seconds;
   }
};

// calculate all time work in a day
function calculateAllTimeInDay(day) {  
   let totalTime = 0;
   for(let i of day) {
      totalTime += new Date(
         new Date(i.endWork).getTime() - 
         new Date(i.beginWork).getTime()
      ).getTime();
   }
   return totalTime;
};

// check and render into cell AnnualLeave into table
function renderAnnual(month) {
   // parse all day annual leave of a month in new array
   let dayAnnualInMonth = [];
   for(days of annualLeave[month]){ 
      for(day of days.days)
         dayAnnualInMonth.push(day);
   }
   // render in table cell AnnualLeave
   for(let i = 0; i < dayAnnualInMonth.length; i++) {
      table.tBodies[0].rows[i].cells[7].innerText = `${dayAnnualInMonth[i]}`
   }   
};

// deleted a time working in a day
function deleted(time){
   console.log(time);
};

// render value table
function renderTableSalary(data) {
   for(let i in data){
      for(day of data[i]){
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
               <button onClick='${deleted(day)}'>delete</button>
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
};

// ------------------------ Check and render value in table-------------------------
function monthDetail(element) {
   table.tBodies[0].innerHTML = "";
   if(element.innerText === "January") {
      renderTableSalary(data[1]);
      renderAnnual(1);
      checkOverTime(1);
      calculateSalary()
   }
   else if(element.innerText === "February") {
      renderTableSalary(data[2]);
      renderAnnual(2);
      checkOverTime(2);
      calculateSalary()
   }
   else if(element.innerText === "March") {
      renderTableSalary(data[3]);
      renderAnnual(3);
      checkOverTime(3);
      calculateSalary();
   }
   else if(element.innerText === "April") {
      renderTableSalary(data[4]);
      renderAnnual(4);
      checkOverTime(4);
      calculateSalary();
   }
   else if(element.innerText === "May") {
      renderTableSalary(data[5]);
      renderAnnual(5);
      checkOverTime(5);
      calculateSalary();
   }
   else if(element.innerText === "June"){
      renderTableSalary(data[6]);
      renderAnnual(6);
      checkOverTime(6);
      calculateSalary();
   }
   else if(element.innerText === "July"){
      renderTableSalary(data[7]);
      renderAnnual(7);
      checkOverTime(7);
      calculateSalary();
   }
   else if(element.innerText === "August"){
      renderTableSalary(data[8]);
      renderAnnual(8);
      checkOverTime(8);
      calculateSalary();
   }
   else if(element.innerText === "September"){
      renderTableSalary(data[9]);
      renderAnnual(9);
      // checkOverTime(9);
      // calculateSalary();
   }
   else if(element.innerText === "October"){
      renderTableSalary(data[10]);
      renderAnnual(10);
      // checkOverTime(10);
      // calculateSalary();
   }
   else if(element.innerText === "November"){
      renderTableSalary(data[11]);
      renderAnnual(11);
      // checkOverTime(11);
      // calculateSalary()
   }
   else if(element.innerText === "December"){
      renderTableSalary(data[12]);
      renderAnnual(12);
      // checkOverTime(12);
      // calculateSalary();
   }
}