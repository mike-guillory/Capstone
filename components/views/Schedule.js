import html from "html-literal";
import { uniq } from "lodash";

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
  let billCounter = 0;
  let monthValue = 100;
  let lastDueDate = 0;

  for(let i = 0; i < uniquePayPeriods.length; i++){

    ////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    let payTotal = 0;
    let payTotals = state.payDays.map(payday => {

        if(payday.date.substring(0, 10) === uniquePayPeriods[i]){

          payTotal += payday.amount;
        }
    })
    state.payTotal = payTotal;
    let thisPayPeriod = [];
    //////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    let year = uniquePayPeriods[i].substring(0, 4);
    let month = uniquePayPeriods[i].substring(6, 7);
    let fullDueDate = "";

    for(let ii = billCounter; ii < state.bills.length; ii++){


      fullDueDate = new Date(year, (month - 1), state.bills[ii].dueDate).getTime() + 42000000;

      if(fullDueDate >= uniquePayDates[i] && !(fullDueDate >= uniquePayDates[i + 1])){

        thisPayPeriod.push(state.bills[ii]);
        lastDueDate = state.bills[ii].dueDate;

        if(!(ii < state.bills.length - 1)){
          schedule.push(thisPayPeriod);
          billCounter = 0;
        }
      }
      else{
        billCounter = ii;
        schedule.push(thisPayPeriod);
        break;
      };
    };
  };

  state["schedule"] = schedule;
  state["index"] = 0;

})()}
<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  ${state.schedule
  .map(period => {
    state.index++;
    state.columns.splice(0, state.columns.length);
      return html`
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
                      return html `<th>${pay.paidFrom}</th>`;
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
                      returnHtml += `<td>${pay.amount}</td>`;
                    }
                    else{
                      returnHtml += `<td></td>`;
                    }
                }
                returnHtml += `</tr>`;
                // state.rows++;
                return returnHtml;
          })}
          <!-- add an empty row -->
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
    </div>
  `})}
  </main>`;

