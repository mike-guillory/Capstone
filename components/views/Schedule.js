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
  });

  function getMonthName(number){
    const date = new Date();
    date.setMonth(number - 1);
    return date.toLocaleString("en-US", {month: "short"});
  }

  // Convert payday dates "YYYY-MM-DDT00:00:00.000Z" to Epoc date
  // to compare with bill due date
  const payDays = state.payDays.map((date) => {
    let shortDate = date.date.substring(0, 10)
    let epocDate = new Date(shortDate).getTime() + 60000000;
    return  epocDate;
  });
  let uniquePayDates = [...new Set(payDays)];

  // Sometimes need pay periods in yyyy-mm-dd
  const payPeriods = uniquePayDates.map((date) => {
    return new Date(date).toISOString().substring(0, 10);
  });
  let uniquePayPeriods = [...new Set(payPeriods)];
  state["uniquePayPeriods"] = uniquePayPeriods;

  const schedule = [];
  const billsDue = [];

  // payMonths will be used to convert bill due dates from 1 or 2 digit
  // day of the month to yyyy-mm-dd for each month where there
  // are paydays
  const payMonths = uniquePayPeriods.map(period => {

    let year = parseInt(period.substring(0, 4));
    let month = parseInt(period.substring(5, 7));
    return `${year}-${month}`;
  });
  const uniquePayMonths = [...new Set(payMonths)];

  billsDueByMonth = uniquePayMonths.map(date => {

      return state.bills.map(bill => {

        let day = `${date.substring(0, 4)}-${date.substring(5, 7)}-${bill.dueDate}`;
        let epocDate = new Date(day).getTime() + 42000000;
        let monthName = getMonthName(date.substring(5, 7));
        return {
          id: bill._id,
          name: bill.name,
          amount: bill.amount,
          dueDate: `${monthName}-${bill.dueDate}`,
          dueDateEpoc: epocDate,
          paidFrom: bill.paidFrom
        };
      });
  });



  billsDueByMonth.map(bill => {
    bill.map(b => {
      billsDue.push(b);
    });
  });

  uniquePayDates.map((payDay, i, array) => {

      let payTotal = 0;
      let billTotal = 0;

      let month = getMonthName(uniquePayPeriods[i].substring(5, 7));
      let day = parseInt(uniquePayPeriods[i].substring(8, 10));
      let thisPayDate = `${month}-${day}`;

      state.payDays.map(payday => {

        if(payday.date.substring(0, 10) === uniquePayPeriods[i]){

          payTotal += payday.amount;
        };
      });

      let nextPayDay = array[i + 1];
      const thisPayPeriod = [];

      billsDue.map((bill, i, index) => {

        if(bill.dueDateEpoc >= payDay && !(bill.dueDateEpoc >= nextPayDay)){
          thisPayPeriod.push(bill);
          billTotal += bill.amount;
          thisPayPeriod["payTotal"] = payTotal;
          thisPayPeriod["billTotal"] = billTotal;
          thisPayPeriod["left"] = payTotal - billTotal;
        }
        else{
          thisPayPeriod["payTotal"] = payTotal;
          thisPayPeriod["billTotal"] = billTotal;
          thisPayPeriod["left"] = payTotal - billTotal;
          thisPayPeriod["date"] = thisPayDate;
        };
      });
      schedule.push(thisPayPeriod);
  });

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
      <h3>Pay Date: ${period.date}</h3>
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
          <!-- add an empty row -->
          ${(() => {

            let returnHtml = "";

            for(let i = 1; i > state.rows; i--){

                returnHtml += `<tr>`;
                for(let c = 0; c < (state.columns.length + 2); c++){
                  returnHtml += `<td></td>`;
                  };

                if(true){
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

