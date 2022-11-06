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
   document.getElementById("pagination").style.display = "none";
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
      checkOverTime(9);
      calculateSalary();
   }
   else if(element.innerText === "October"){
      renderTableSalary(data[10]);
      renderAnnual(10);
      checkOverTime(10);
      calculateSalary();
   }
   else if(element.innerText === "November"){
      renderTableSalary(data[11]);
      renderAnnual(11);
      checkOverTime(11);
      calculateSalary()
   }
   else if(element.innerText === "December"){
      renderTableSalary(data[12]);
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
   const salaryScale = staff.salaryScale;
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

// ------------------render all time working when load page-----------------------------
let workOnDay = staff.workOnDay;
var pageNumber = 1;
var pageSize = 10;
let tagSize = document.getElementById("size");

// thay doi so trang
function convertPageNumber (value){    
   if(value){
      pageNumber += 1;
      renderPage(workOnDay,pageSize, pageNumber);
   }else{
      pageNumber -= 1;
      if(pageNumber <= 0){ 
         pageNumber = 1;
         renderPage(workOnDay,pageSize, pageNumber);
      }
      renderPage(workOnDay,pageSize, pageNumber);
   }
};

// thay doi so luong dong cua trang
tagSize.addEventListener("change", function(){convertPageSize(this.value)} , false);

function convertPageSize(newPageSize) {
   table.tBodies[0].innerHTML = "";
   pageSize = Number(newPageSize);
   renderPage( workOnDay, pageSize , pageNumber);
   console.log(newPageSize);
};
// -----------render result pagination on view-----------
function renderPage( element ,pSize, pNumber) { 
   table.tBodies[0].innerHTML = "";  
   for(e of pagination(element, pSize , pNumber)){
      table.tBodies[0].innerHTML += 
      `<tr class="tr">
         <td>${new Date(e.beginWork).getDate()}</td>
         <td>
            ${new Date(e.beginWork).getHours()}:
            ${new Date(e.beginWork).getMinutes()}:
            ${new Date(e.beginWork).getSeconds()}s
         </td>
         <td>
            ${new Date(e.endWork).getHours()}:
            ${new Date(e.endWork).getMinutes()}:
            ${new Date(e.endWork).getSeconds()}s
         </td>
         <td>
            ${calculateTime(e)}
         </td>
         <td>
            ${e.workPlace}
         </td>
         <td></td>
         <td></td>
         <td></td>
      </tr>`
   };
}

function workAllTime() {
   renderPage(workOnDay ,10 ,1);       
}

window.onload = workAllTime();

// ---------------pagination----------------------------------------------
function pagination(array, page_size, page_number) {
   return array.slice((page_number -1) * page_size, page_number * page_size);
}
