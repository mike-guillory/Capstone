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


  // For each pay period
  for(let i = 0; i < uniquePayPeriods.length; i++){


    let payTotal = 0;
    // Get the total pay even if there is more
    // than one paycheck on that day
    let payTotals = state.payDays.map(payday => {

        if(payday.date.substring(0, 10) === uniquePayPeriods[i]){

          payTotal += payday.amount;
        }
    })


    let thisPayPeriod = [];
    let year = uniquePayPeriods[i].substring(0, 4);
    let month = uniquePayPeriods[i].substring(6, 7);
    let fullDueDate = "";
    let billTotal = 0;


    // For every bill that falls between this payday and the next
    for(let ii = billCounter; ii < state.bills.length; ii++){


      fullDueDate = new Date(year, (month - 1), state.bills[ii].dueDate).getTime() + 42000000;

      // If the bill does fall into this pay period
      if(fullDueDate >= uniquePayDates[i] && !(fullDueDate >= uniquePayDates[i + 1])){

        // Push this bill onto this pay period
        thisPayPeriod.push(state.bills[ii]);
        // Record this bill as the last bill pushed
        // so the next itteration will start with the
        // next bill
        lastDueDate = state.bills[ii].dueDate;
        billTotal += state.bills[ii].amount;

        // if bill is NOT the last one
        if(!(ii < state.bills.length - 1)){
          schedule.push(thisPayPeriod);
          thisPayPeriod["payTotal"] = payTotal;
          thisPayPeriod["billTotal"] = billTotal;
          thisPayPeriod["left"] = (payTotal - billTotal)
          billCounter = 0;
        }
      }
      else{
        billCounter = ii;
        thisPayPeriod["payTotal"] = payTotal;
        thisPayPeriod["billTotal"] = billTotal;
        thisPayPeriod["left"] = (payTotal - billTotal)
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

                if(!(period.billTotal === 0)){
                  returnHtml += `</tr>
                                </tbody>
                              </table>
                            </div>
                            <div class="totalsDiv">
                              <table class="totalsTable">
                                <tr><td>Total Income</td><td class="totalDollars">$${period.payTotal}</td></tr>
                                <tr><td>Total Bills</td><td class="totalDollars">$${period.billTotal}</td></tr>
                                <tr><td>Remaining</td><td class="totalDollars">$${period.left}</td></tr>
                                </tr></tbody></table></div>`;
                }
                else{
                  returnHtml += `</tr></tbody></table></div>`
                }
              }
                return returnHtml;

          })()}


    </div>
  `})}
  </main>`;

