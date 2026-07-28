let str = "welcome to javascript world";

  let revStr =  str.split(" ").reverse().join(" ");
  
  console.log(revStr);

  let arr = [1,2,3,4];
  
  console.log(arr.push(9))//it will add 
  console.log(newarr1);//element in last and will return size of array
  console.log("after push operation : ",arr);

  console.log(arr.pop())//it will remove last element of array and will return removed element
  console.log("after pop operation : ",arr);

  console.log(arr.shift())//it will remove first element of array and will return removed element
  console.log("after shift operation : ",arr);
  console.log(arr.unshift(6));//it will add element at 1st position and will return size of array
  console.log("after unshift operation : ",arr);


  //============//

  let arr = [1,2,3,4,5];

  let newarr = arr.filter(e=>e%2 !== 0);//it it takes a callback and it return new array on the basis of given condition
  console.log("old element : ",newarr);

  let newarr1 = arr.map(e=>{
    if(e % 2 !== 0)
    {
      e = e*2;
    }
    return e;
  });
  //it takes a callback and it return modified array ,size of array remains same
console.log("after map : ",newarr1)

let sum = arr.reduce((cv,a)=>{
  return cv+a;
},0);

console.log("sum of array : ",sum);

console.log(arr.find(ele => ele > 3));

//====reverse string====//
let str = "ehsan khan";
let str1 = "";
for(let i=str.length-1; i>=0; i--)
{
     str1 += str[i];
}
console.log("reverse : ",str1);
let str2 = str.split("").reverse().join("");
console.log("reverse : ",str2);


let input1 = "madam";
let output1 = input1.split("").reverse().join("");
let input2 = "hello";
let output2 = input2.split("").reverse().join("");
console.log("palindrome : ",output1 === output2);

let input3 =[12, 45, 2, 89, 34];
 let sorted = input3.sort((a,b)=>a-b);
 console.log("largest element : ",sorted[sorted.length-1])

let input4 = "javaScript";

function vowels(input){
  let reg = "aeiouAEIOU";
  let count = 0;

  for(let i=0; i<input.length; i++)
  {
        if(reg.includes(input[i]))
        {
          count++;
        }
  }
  return count;
}

console.log(vowels(input4))