import html from "html-literal";
import { uniq } from "lodash";

export default (state) => html`
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

              return returnHtml;

          })()}
    </div>
  `})}
</main>`;

