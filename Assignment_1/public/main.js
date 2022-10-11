// show Content when push apply button
function showDetailsApply () {
   let contentApply = document.getElementById("contentApply");
   if(contentApply.style.display === "none"){
      contentApply.style.display = "block";
   } else {
      contentApply.style.display = "none";
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
   if(Number(remainingDays) === 0){
      $("#datepicker").val("") ;
      $("#timeAnnual").val("8") ;
      $(".error")[0].innerHTML = "Bạn đã hết ngày nghỉ";
      return false;
   }else if(Number(remainingDays) < totalDayOff){
      $("#datepicker").val("") ;
      $("#timeAnnual").val("8") ;
      $(".error")[0].innerHTML = "Tổng thời gian đăng kí nghỉ nhiều hơn thời gian nghỉ còn lại của bạn. Vui lòng nhập lại!";
      return false;
   } else {
      return true;
   }
}

// date-picker Select multiple days
$(document).ready(function() {
   $("#datepicker").multiDatesPicker();
});


// Profile Page
function openChangeImage() {
   let changeImage = document.getElementById("changeImage");
   if(changeImage.style.display === "none" ){
      changeImage.style.display = "block";
   } else {
      changeImage.style.display = "none";
   }
   
}

function handleImageChange(input){
   const showImage = document.getElementById("view");
   console.log(showImage);
   const valueInput = input.value;
   showImage.src = valueInput
}
