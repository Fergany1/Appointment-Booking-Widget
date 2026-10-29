import { AvaliableDays , TimeSlots , ForamtTimeTo12H } from "./src/utils/dateUtils";

// export default function Testing(){
//     const day = 9 ;
//     const formattedDay = String(day).padStart(2 ,'0');
//     console.log(formattedDay); // OutPut 09

//     // Mask Credit Card Number
//     const card = '1234567812348888';
//     const last4 = card.slice(-4);
//     const formattedCard = String(last4).padStart(card.length , '*');
//     console.log(formattedCard); //Output ************8888

//     // pads text
//     const text = 'Apple';
//     console.log(text.padStart(10)); // add 10 empty spaces leading text

// }

export function DateUtilsTest(){

    console.group("🧪 Running Date Utils Test Cases :-");

    // --TEST 1 Test 12-Hour Time Formatter
    const testCases = [
        {input : '09:00' , expected: '09:00 AM'},
        {input : '17:00' , expected: '05:00 PM'},
        {input : '12:00' , expected: '12:00 PM'},
        {input : '23:00' , expected: '11:00 PM'},
        {input : '00:30' , expected: '12:30 AM'},
        {input : '22:40' , expected: '10:40 PM'},
    ]

    testCases.forEach(({input , expected} , index) => {
        const actual = ForamtTimeTo12H(input);
        const passed = actual === expected;
        console.log(
            `Test ${index + 1} - FormatTime12H("${input}"):`,
            passed ? "✅ PASSED": `❌ Failed (Expected "${expected}" , Got "${actual}")`
        )
    })
}