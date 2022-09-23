function showFunction (status) {
   console.log("in function", status);
   let contentApply = document.getElementById("contentApply");
   if(contentApply.style.visibility === "hidden" ){
      contentApply.style.visibility = "visible";
   } else {
      contentApply.style.visibility = "hidden";
   }
}