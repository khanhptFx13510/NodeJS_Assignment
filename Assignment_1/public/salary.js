let table = document.getElementById("salary-table");

//  function convert time
function convertTime(time) {
   let seconds = Math.floor((time / 1000) % 60);
   let minutes = Math.floor((time / (1000 * 60)) % 60);
   let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

   return {hours: hours, minutes: minutes, seconds: seconds}
}

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
}
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
}

// check and render into cell AnnualLeave into table
function renderAnnual (month) {
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

// ------------------------ Check and render value in table-------------------------
function monthDetail(element) {
   table.tBodies[0].innerHTML = "";
   if(element.innerText === "January") {
      for(let i in data[1]){

         for(day of data[1][i]){
            table.tBodies[0].innerHTML += 
            `<tr class="tr">
               <td data-label= "Date">${new Date(day.beginWork).getDate()}</td>
               <td data-label= "Register Time">
                  ${new Date(day.beginWork).getHours()}:
                  ${new Date(day.beginWork).getMinutes()}:
                  ${new Date(day.beginWork).getSeconds()}s
               </td>
               <td data-label= "End Time">
                  ${new Date(day.endWork).getHours()}:
                  ${new Date(day.endWork).getMinutes()}:
                  ${new Date(day.endWork).getSeconds()}s
               </td>
               <td data-label= "Caculate Time">
                  ${calculateTime(day)}
               </td>
               <td data-label= "Work Place">
                  ${day.workPlace}
               </td>
               <td data-label= "Over Time"></td>
               <td data-label= "Lack Of Working Time"></td>
               <td data-label= "Annual Leave"></td>
            </tr>`
         };
      }
      renderAnnual(1);
      checkOverTime(1);
      calculateSalary()
   }
   else if(element.innerText === "February") {
      for(let i in data[2]){

         for(day of data[2][i]){
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
      renderAnnual(2);
      checkOverTime(2);
      calculateSalary()
   }
   else if(element.innerText === "March") {
      for(let i in data[3]){

         for(day of data[3][i]){
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
      renderAnnual(3);
      checkOverTime(3);
      calculateSalary();
   }
   else if(element.innerText === "April") {
      for(let i in data[4]){

         for(day of data[4][i]){
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
      renderAnnual(4);
      checkOverTime(4);
      calculateSalary();
   }
   else if(element.innerText === "May") {
      for(let i in data[5]){

         for(day of data[5][i]){
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
      renderAnnual(5);
      checkOverTime(5);
      calculateSalary();
   }
   else if(element.innerText === "June"){
      for(let i in data[6]){

         for(day of data[6][i]){
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
      renderAnnual(6);
      checkOverTime(6);
      calculateSalary();
   }
   else if(element.innerText === "July"){
      for(let i in data[7]){

         for(day of data[7][i]){
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
      renderAnnual(7);
      checkOverTime(7);
      calculateSalary();
   }
   else if(element.innerText === "August"){
      for(let i in data[8]){

         for(day of data[8][i]){
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
      renderAnnual(8);
      checkOverTime(8);
      calculateSalary()
   }
   else if(element.innerText === "September"){
      for(let i in data[9]){

         for(day of data[9][i]){
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
      renderAnnual(9);
      checkOverTime(9);
      calculateSalary();
   }
   else if(element.innerText === "October"){
      for(let i in data[10]){

         for(day of data[10][i]){
            table.tBodies[0].innerHTML += 
            `<tr class="tr">
               <td data-label= "Date">${new Date(day.beginWork).getDate()}</td>
               <td data-label= "Register Time">
                  ${new Date(day.beginWork).getHours()}:
                  ${new Date(day.beginWork).getMinutes()}:
                  ${new Date(day.beginWork).getSeconds()}s
               </td>
               <td data-label= "End Time">
                  ${new Date(day.endWork).getHours()}:
                  ${new Date(day.endWork).getMinutes()}:
                  ${new Date(day.endWork).getSeconds()}s
               </td>
               <td data-label= "Caculate Time">
                  ${calculateTime(day)}
               </td>
               <td data-label= "Work Place">
                  ${day.workPlace}
               </td>
               <td data-label= "Over Time"></td>
               <td data-label= "Lack Of Working Time"></td>
               <td data-label= "Annual Leave"></td>
            </tr>`
         };
      }
      renderAnnual(10);
      checkOverTime(10);
      calculateSalary();
   }
   else if(element.innerText === "November"){
      for(let i in data[11]){

         for(day of data[11][i]){
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
      renderAnnual(11);
      checkOverTime(11);
      calculateSalary()
   }
   else if(element.innerText === "December"){
      for(let i in data[12]){

         for(day of data[12][i]){
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
      renderAnnual(12);
      checkOverTime(12);
      calculateSalary();
   }
}


// -------------------handle overtime and Lack of Working Time--------------------------
function checkOverTime(month){   
   // -----Nhom cac lan lam viec co cung ngay lai voi nhau
   let daySamedate = {}
   for(let i = 0; i < table.tBodies[0].rows.length; i++) {
      let keyday = table.tBodies[0].rows[i].cells[0].innerText;
      if(keyday in daySamedate){
         daySamedate[keyday].push(table.tBodies[0].rows[i]);
      } else {
         daySamedate[keyday] = [table.tBodies[0].rows[i]]
      }    
   };

   // ----tinh thoi gian duoc nghi trong annualLeave
   let timeOfDateAnnual = {};
   for(days of annualLeave[month]){ 
      for(day of days.days){
         let keyOfAnnualLeave = day.split("/")[1]
         timeOfDateAnnual[keyOfAnnualLeave] = days.time
      }         
   }

   // -----tinh tong thoi gian lam moi ngay------ 
   for(let j in daySamedate) {
      // ______tinh toan thoi gian lam trong 1 ngay
      let timeWorkOnDay = calculateAllTimeInDay(data[month][j]);
      // css tao ranh gioi giua cac ngay
      daySamedate[j][daySamedate[j].length- 1].style.cssText = `
            border-bottom: 1px solid black;
      `
      // check annual leave neu staff co xin nghi ngay nao thi - vao thoi gian lam thieu cua nhan vien
      if(!timeOfDateAnnual[j]){
         // check time working enough 8 hours or not
         let timeRemaining = 0
         if(timeWorkOnDay <= 8*60*60*1000){
            timeRemaining = 8*60*60*1000 - timeWorkOnDay ;

            daySamedate[j][daySamedate[j].length- 1].cells[6].innerText = 
               "-" + convertTime(timeRemaining).hours + ":" 
               + convertTime(timeRemaining).minutes + ":" 
               + convertTime(timeRemaining).seconds + "s";           
         } else {
            timeRemaining = timeWorkOnDay - 8*60*60*1000;

            daySamedate[j][daySamedate[j].length- 1].cells[5].innerText = 
               "+" + convertTime(timeRemaining).hours + ":" 
               + convertTime(timeRemaining).minutes + ":" 
               + convertTime(timeRemaining).seconds + "s";
         }

      } else{

         if((timeWorkOnDay + timeOfDateAnnual[j] * 60*60*1000) <= 8*60*60*1000){
            timeRemaining = 8*60*60*1000 - (timeWorkOnDay + timeOfDateAnnual[j]*60*60*1000);
            
            daySamedate[j][daySamedate[j].length- 1].cells[6].innerText = 
               "-" + convertTime(timeRemaining).hours + ":" 
               + convertTime(timeRemaining).minutes + ":" 
               + convertTime(timeRemaining).seconds + "s";               
         }else{
            timeRemaining = (timeWorkOnDay + timeOfDateAnnual[j]*60*60*1000) - 8*60*60*1000;

            daySamedate[j][daySamedate[j].length- 1].cells[5].innerText = 
               "+" + convertTime(timeRemaining).hours + ":" 
               + convertTime(timeRemaining).minutes + ":" 
               + convertTime(timeRemaining).seconds + "s";
         }
      }      
   }
}

// Caculate Salary
function calculateSalary(){
   let salary = 0;
   // salary scale
   const salaryScale = props.salaryScale
   // tim gia tri cua tong thoi gian lam du va lam thieu trong table
   let tTable = table.tBodies[0];
   let totalOverTime = 0;
   let totalLackOfWork = 0;
   let arrayOverTime = [];
   let arrayLackOfWork = []; 

   for(let i = 0 ; i < tTable.rows.length; i++){
      if(tTable.rows[i].cells[5].innerText.replace(/[+s]/g,'') !== ""){
         arrayOverTime.push(tTable.rows[i].cells[5].innerText.replace(/[+s]/g,''));
      }
      if(tTable.rows[i].cells[6].innerText.replace(/[-s]/g,'') !== ""){
         arrayLackOfWork.push(tTable.rows[i].cells[6].innerText.replace(/[-s]/g,''));
      }
   }; 
   // find total Overtime convert to hours
   for(let e of arrayOverTime){
      let element = e.split(":");
      totalOverTime += (Number(element[0]) + Number(element[1]/60));
   };
   // find total lack of working time to hours
   for(let e of arrayLackOfWork){
      let element = e.split(":");
      totalLackOfWork += (Number(element[0]) + Number(element[1]/60));
   };

   // nap cac bien tim duoc vao cong thuc tinh luong
   salary = salaryScale * 3000000 + (totalOverTime.toFixed(2) - totalLackOfWork.toFixed(2))*200000;

   document.getElementById("salary").innerText = "Calculate Total Salary: " + salary + " VND";
   document.getElementById("salary").style.cssText ="background-color: #bf6839; color: white;margin: 0px;";
}