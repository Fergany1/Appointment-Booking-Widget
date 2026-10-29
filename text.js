export default function Testing(){
    const day = 9 ;
    const formattedDay = String(day).padStart(2 ,'0');
    console.log(formattedDay); // OutPut 09

    // Mask Credit Card Number
    const card = '1234567812348888';
    const last4 = card.slice(-4);
    const formattedCard = String(last4).padStart(card.length , '*');
    console.log(formattedCard); //Output ************8888

    // pads text
    const text = 'Apple';
    console.log(text.padStart(10)); // add 10 empty spaces leading text

}