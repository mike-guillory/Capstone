import html from "html-literal";

export default (state) => html`

${console.log(state)}
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

<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="editBillsDiv">
    <table class="editBillsTable">
     <thead>
        <tr>

        ${(() => {

          let returnHtml = `
            <th>Bill</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Paid From</th>`

          returnHtml += `</tr></thead><tbody>`;

          state.bills.forEach(bill => {

              returnHtml += `
                <tr id=${bill._id}><td class="billData">${bill.name}</td>
                <td class="billData">${bill.dueDate}</td>
                <td class="billData">${bill.amount}</td>
                <td class="billData">${bill.paidFrom}</td></tr>`

          });
          return html`${returnHtml}`;

        })()}

      </tbody>
    </table>
  </div>
  <div>
    <form id="editBillsForm" action="" method="">
      <label for="billName">Name: </label><input name="billName" id="billName" type="text"><br><br>
      <label for="billDueDate">Due Date: </label><input name="dueDate" id="billDueDate" type="text"><br><br>
      <label for="billAmount">Amount: </label><input name="billAmount" id="billAmount" type="text"><br><br>
      <label for="billPaidFrom">Paid From</label><br><input name="paidFrom" id="billPaidFrom" type="text"><br><br>
      <input type="submit" value="Add"><input type="submit" value="Update"><input type="submit" value="Delete">
    </form>
  </div>
  <div id="editPaymentSourcesDiv">
      <table class="editPaymentSourceTable">
      <thead>
          <tr>

          ${(() => {

            let returnHtml = `
              <th>Name</th></tr></thead><tbody>`;

            state.paymentSources.forEach(source => {

                returnHtml += `
                  <tr id=${source._id}><td class="paymentSourceData">${source.name}</td></tr>`

            });
            return html`${returnHtml}`;
          })()}
        </tbody>
      </table>
  </div>
  <div>
    <form id="editPaymentSourceForm" action="" method="">
      <label for="paymentSourceName">Name: </label><input name="paymenySourceName" id="paymentSourceName" type="text"><br><br>
      <input type="submit" value="Add"><input type="submit" value="Update"><input type="submit" value="Delete">
    </form>
  </div>
  <div id="editIncomeSourcesDiv">
      <table class="editIncomeSourceTable">
      <thead>
          <tr>

            ${(() => {

            let returnHtml = `
              <th>Name</th>
              <th>Amount</th>
              <th>Frequency</th>
              <th>Starting Date</th>`

            returnHtml += `</tr></thead><tbody><tr>`;

            state.incomeSources.forEach(source => {

                returnHtml += `
                  <td id="sourceName">${source.name}</td>
                  <td id="sourceAmount">${source.amount}</td>
                  <td id="sourceFrequency">${source.frequency}</td>
                  <td id="sourceStartingDate">${source.startingDate}</td></tr>`

            });
            return html`${returnHtml}`;
            })()}

        </tbody>
      </table>
  </div>
  <div>
    <form id="editIncomeSourcesForm" action="" method="">
      <label for="">Name: </label><input name="" id="" type="text"><br><br>
      <label for="">Amount: </label><input name="" id="" type="text"><br><br>
      <label for="">Frequency: </label><input name="" id="" type="text"><br><br>
      <label for="">Starting Date: </label><input name="" id="" type="text"><br><br>
    </form>
  </div>
</main>`;



