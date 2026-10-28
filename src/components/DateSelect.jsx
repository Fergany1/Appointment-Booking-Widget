export const AvaliableDays = ({ totalDays = 14 }) =>{
  const days = [];
  const today = new Date();

  for (let i = 0 ; i < totalDays ; i++){
    const futureDate = new Date(); //
    futureDate.setDate(today.getDate() + 1);

    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1 ).padStart(2 , '0')
  }
}