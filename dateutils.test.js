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

    // Test 2 - Check Avability for Monday Blocking
    const days = AvaliableDays(7);
    console.log('Generated Days : ' , days);

    days.forEach((day , index) => {
        const isMon = day.dayTxt === 'Mon';
        const shouldBeAvailable = !isMon;
        const passed = day.isAvaliable === shouldBeAvailable;
        
        console.log(
            `Test 2.${index + 1} - Date ${day.dateStr} ${day.dayTxt} | Available ? ${day.isAvaliable}`,
            passed ? "✅ PASSED": `❌ Failed (Expected: ${shouldBeAvailable})`

        )
    })

    // Test 3 - check Service Durations
    const mockTakenSlot = ['09:00' , '09:30'];
    const slots = TimeSlots('09:00' ,'12:00' , 30 , mockTakenSlot);
    const expectedSlotCount = 6;
    console.log(
        `Test 3.1 - Slot Count Check Expected: ${expectedSlotCount} ,
        Got ${slots.length},`, slots.length === expectedSlotCount ?
        "✅ PASSED": "❌ Failed "
    );

    // Check If '09:30' is Available
    const slot930 = slots.find((s) => s.time24 === '09:30');
    console.log(
        'Test 3.2 - Is 09:30 Taken ?',
        slot930 && slot930.isTaken ? "✅ PASSED": "❌ Failed "
    );

    // Check If '02:00' Available
    const slot0200 = slots.find((s) => s.time24 === '02:00');
    console.log(
        "Test 3.3 - Check IF 02:00 Is Available ?",
        slot0200 && !slot0200.isTaken ? "✅ PASSED": "❌ Failed "
    );

    console.groupEnd();
}