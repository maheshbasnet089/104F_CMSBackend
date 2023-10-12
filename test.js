const numbers = [1,2,3,4,5]
console.log(numbers,"Numbers")
const smallWords = ["manish","hello","world"]

const upperWords = smallWords.map((word)=>{
    return word.toUpperCase()
})
console.log(upperWords)
// map
//  const doubledNumbers = numbers.map((number)=>{
//     return number *2
//  })
// console.log(doubledNumbers)

 // forEach
//  const doubledNumbers = numbers.forEach((number)=>{
//     return number *2
//  })
//  console.log(doubledNumbers)