import { stat } from "fs";
import html from "html-literal";
import { scheduler } from "timers/promises";

export default (state) => html`

${(() => {

  state.payDays.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    else{
      return 0;
    }
  });

  state.bills.sort((a, b) => {
    if (a.dueDate < b.dueDate) {
       return -1;
    }
    else if (a.dueDate > b.dueDate) {
      return 1;
    }
    else{
      return 0;
    }
  })

  const payDays = state.payDays.map((date) => {
    let shortDate = date.date.substring(0, 10)
    let epocDate = new Date(shortDate).getTime() + 60000000;
    return  epocDate;
  });

  let uniquePayDates = [...new Set(payDays)];
  const payPeriods = uniquePayDates.map((date) => {
    return new Date(date).toISOString().substring(0, 10);
  });

  let uniquePayPeriods = [...new Set(payPeriods)];
  state["uniquePayPeriods"] = uniquePayPeriods;

  const schedule = [];
  // let thisPayPeriod = [];
  let billCounter = 0;
  let monthCounter = 0;

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  for(let i = 0; i < uniquePayDates.length; i++){

    if(uniquePayPeriods[i].substring(6, 7) > monthCounter){
      billCounter = 0;
    }

    console.log(`payday ${i}`)

    let thisPayPeriod = [];

    let varI = i;
    let year = uniquePayPeriods[i].substring(0, 4);
    let month = uniquePayPeriods[i].substring(6, 7);
    monthCounter = month;
    let fullDueDate = "";

    // console.log(month + " " + year)

    // Convert the bill due date into an epoc date
    for(let ii = billCounter; ii < state.bills.length; ii++){
      // console.log(`bill ${ii}`)
      fullDueDate = new Date(year, (month - 1), state.bills[ii].dueDate).getTime() + 42000000;
      // t = new Date(year, (month - 1), state.bills[ii].dueDate)
      // console.log(t)

      console.log(fullDueDate)
      console.log(uniquePayDates[varI])
      console.log(uniquePayDates[varI + 1])

      if(fullDueDate >= uniquePayDates[varI] && !(fullDueDate >= uniquePayDates[varI + 1])){
        console.log("yes")
          thisPayPeriod.push(state.bills[ii]);
        }
        else{
          console.log("no")
          billCounter = ii;
          schedule.push(thisPayPeriod);
          break;
        };
    };/////////////////////////////////////////////////////////////////////////////
  };///////////////////////////////////////////////////////////////////////////////////////

  state["schedule"] = schedule;
  state["index"] = 0;
  console.log(schedule)

})()}

<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  ${state.schedule
  .map(period => {
    state.index++;
    // console.log(period)
    state.columns.splice(0, state.columns.length);
      return `
    <div class="scheduleDiv">
    <h3>Pay Date: ${state.uniquePayPeriods[state.index - 1].substring(5, 10)}</h3>
      <table class="scheduleTable">
      <thead>
          <tr>
            <th>Due Date</th>
            <th>Bill</th>
            ${period
                .map(pay => {
                  if(!state.columns.includes(pay.paidFrom)){
                      state.columns.push(pay.paidFrom);
                      return `<th>${pay.paidFrom}</th>`;
                  }
            })}

        </tr>
      </thead>
      <tbody>
        <tr>
          ${period
          .map(pay => {

            let returnHtml = "";

                returnHtml =
                  `<td>${pay.dueDate}</td>
                   <td>${pay.name}</td>`;

                for(let i = 0; i < state.columns.length; i++){
                    if(pay.paidFrom === state.columns[i]){
                      returnHtml += `<td>$${pay.amount}</td>`;
                    }
                    else{
                      returnHtml += `<td></td>`;
                    }
                }
                returnHtml += `</tr>`;
                // state.rows++;
                return returnHtml;
          })}
          <!-- add empty rows -->
          ${(() => {

            let returnHtml = "";

            for(let i = 1; i > state.rows; i--){

                returnHtml += `<tr>`;
                for(let c = 0; c < (state.columns.length + 2); c++){
                  returnHtml += `<td></td>`;
                  };

                returnHtml += `</tr>`;
                }

                return returnHtml;

          })()}

      </tbody>
    </table>
    </div>
    </div>`
    // console.log(period)
  })}
  </main>`;

