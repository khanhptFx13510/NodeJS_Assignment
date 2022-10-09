// show Content when push apply button
function showDetailsApply () {
   let contentApply = document.getElementById("contentApply");
   if(contentApply.style.visibility === "hidden" ){
      contentApply.style.visibility = "visible";
   } else {
      contentApply.style.visibility = "hidden";
   }
}

// show content when push button's take annual Leave
function showDetailsAnnual (){
   let annualLeave = document.getElementById("contentAnnualLeave");
   if(annualLeave.style.display === "none" ){
      annualLeave.style.display = "block";
   } else {
      annualLeave.style.display = "none";
   }
}

// Calculate time workOnDay
function calculate(){
   let table = document.getElementById("table");
   let tBody = table.tBodies[0]
   let total = 0;
   
   for(let i=0; i<tBody.rows.length; i++){
      // console.log(table.tBodies[1].rows[0].cells[1]);
      total += Number(tBody.rows[i].cells[5].innerHTML)
   }
   table.tBodies[1].rows[0].cells[1].innerHTML = `${total} minutes`;
}

window.onload = calculate();

// Validate Form annualLeave
function submitAnnualLeave(remainingDays){
   let numberOfDays = $("#datepicker").val().split(",").length;
   let numberOfTime = $("#timeAnnual").val();
   
   let totalDayOff = (numberOfDays * Number(numberOfTime)) / 8;
   if(Number(remainingDays) < totalDayOff){
      $("#datepicker").val("") ;
      $("#timeAnnual").val("8") ;
      $(".error")[0].innerHTML = "Tổng thời gian đăng kí nghỉ nhiều hơn thời gian nghỉ còn lại của bạn. Vui lòng nhập lại!";
      return false;
   } else{
      return true;
   }
}


// date-picker Select multiple days
$(document).ready(function() {
   $("#datepicker").multiDatesPicker();
});