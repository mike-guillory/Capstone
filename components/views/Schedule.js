import html from "html-literal";
// import { forEach } from "lodash";

export default (state) => html`

${(() => {

  let today = new Date();

  state.payDays.forEach(element => {

    let payDayMonth = element.date.substring(6, 7);

    if(payDayMonth >= today.getMonth() + 1
          && payDayMonth < payDayMonth +1 ){
      console.log(payDayMonth);
    }
  });

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
  })
})()}

<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="scheduleDiv">
    <table class="scheduleTable">
     <thead>
        <tr>
          <th>Due Date</th>
          <th>Bill</th>

          ${(() => {
            state.bills.sort((a, b) => {
              if (a.paidFrom < b.paidFrom) {
              return -1;
              }
              else if (a.paidFrom > b.paidFrom) {
                return 1;
              }
              else{
              return 0;
              }
            })
          })()}

          ${state.bills
          .map(bill => {

            if(!state.columns.includes(bill.paidFrom)){
                state.columns.push(bill.paidFrom);
                return `<th>${bill.paidFrom}</th>`;
            }
          })}

        </tr>
      </thead>
      <tbody>
        <tr>

        ${(() => {
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
        })()}
          ${state.bills
          .map(bill => {

            let returnHtml = "";

                returnHtml =
                  `<td>${bill.dueDate}</td>
                   <td>${bill.name}</td>`;

                for(let i = 0; i < state.columns.length; i++){
                    if(bill.paidFrom === state.columns[i]){
                      returnHtml += `<td>${bill.amount}</td>`;
                    }
                    else{
                      returnHtml += `<td></td>`;
                    }
                }
                returnHtml += `</tr>`;
                state.rows++;
                return returnHtml;
          })}
          <!-- If there are less than 10 rows, add empty rows until there are 10 -->
          ${(() => {

            let returnHtml = "";

            for(let i = 10; i > state.rows; i--){

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
<div id="totalsDiv">
    <table class="totalsTable" style="border: 1px solid">
      <tr>
        <td>BoA</td>
        <td>$976</td>
      </tr>
      <tr>
        <td>BoA CC</td>
        <td></td>
      </tr>
      <tr>
        <td>Citi</td>
        <td></td>
      </tr>
      <tr>
        <td>Truist</td>
        <td></td>
      </tr>
      <tr>
        <td>Cash</td>
        <td>$195</td>
      </tr>
      <tr>
        <td>Total</td>
        <td></td>
      </tr>
      <tr>
        <td>Cash Left</td>
        <td></td>
      </tr>
      </table>
  </div>
</main>`;


