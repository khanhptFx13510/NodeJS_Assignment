exports.get404 = (req, res, next) => {
   console.log("404");
   if(res.status(404)){
      res.send('<h1>page not found</h1>');
   }
}