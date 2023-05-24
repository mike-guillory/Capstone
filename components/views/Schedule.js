import html from "html-literal";
import { forEach } from "lodash";

export default (state) => html`
${console.log(state)};
${(() => {
  state.bills.sort((a, b) => {
    if (a.dueDate < b.dueDate) {
      return -1;
    }
    if (a.dueDate > b.dueDate) {
      return 1;
    }
    else{
      return 0;
    }
  })
})()}
<!-- /////////////////////////////////////////////////////////////////// -->
<!-- NEED TO SORT PAYMENTSOURCES SO THEY SHOW THE SAME ON EVERY SCHEDULE -->
<!-- /////////////////////////////////////////////////////////////////// -->


<main onload="addClick()">
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="scheduleDiv">
    <table class="scheduleTable">
     <thead>
        <tr>

        ${(() => {

          let columns = [];
          let rows = 0;
          let returnHtml = `
            <th>Due Date</th>
            <th>Bill</th>`

          state.bills.forEach(bill => {

            if(!columns.includes(bill.paidFrom)){
              columns.push(bill.paidFrom);
              returnHtml += `<th>${bill.paidFrom}</th>`
            }
          });

          returnHtml += `</tr></thead><tbody><tr>`;

          state.bills.forEach(bill => {

              returnHtml += `
                <td>${bill.dueDate}</td>
                <td>${bill.name}</td>`

                for(let i = 0; i < columns.length; i++){
                  if(bill.paidFrom === columns[i]){
                    returnHtml += `<td>${bill.amount}</td>`
                  }
                  else{
                    returnHtml += `<td></td>`
                  }
                  }
                  returnHtml += `</tr>`
                  rows++;
          });


          let c = 0;
          for(let i = 10; i > rows; i--){
            returnHtml += `<tr>`
            while(c < (columns.length + 2)){
              returnHtml += `<td></td>`;
              c++
            };
            c = 0
            returnHtml += `</tr>`;
          }

            return html`${returnHtml}`;

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


// ${(() => {
//   state.bills.forEach(bill => {
//     const thisDate = new Date(bill.dueDate);
//     console.log(thisDate.getMonth());
//   });

// })()};

// let bills = [];

// ${(() => {



//   // for(let i = 0; i <  state.bills.length; i++) {

//   // }
//   })};





// <!-- <th id="firstDate">Date</th>
// <th>Bill</th>
// <th>BoA</th>
// <th>BoA CC</th>
// <th>Citi</th>
// <th>Truist</th>
// <th>Cash</th> -->
