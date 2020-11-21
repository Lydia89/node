const ageCalculator = function (date) {
  let today = new Date();
  let birthday =new Date(date)
  console.log("birthday", birthday)
  let age = 0;

  age = today.getFullYear() - birthday.getFullYear();

  return age;
};

//console.log(ageCalculator('04/04/1989'))
module.exports=ageCalculator





