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
  <div>
    <form id="payDayForm" action="" method="POST">
      <label for="incomeSource">Income Source:</label>
          <select name="incomeSource" id="incomeSource">
            ${state.incomeSources
            .map(source => {
              return `<option value="${source.name}">${source.name}</option>`
            })}
          </select><br><br>
      <label for="payDate"></label>
          <input name="payDate" id="payDate" type="date"><br><br>
      <label for="paydayAmount">$</label>
          <input name="payDayAmount" id="payDayAmount" type="text"><br><br>
    <input type="submit" value="Submit">
  </form>
  </div>
  <div>

  </div>
  <div id="editBillsDiv">
    <table class="editBillsTable">
     <thead>
        <tr>
          <th>Bill</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Paid From</th>
        </tr>
      </thead>
      <tbody>
          ${state.bills
          .map(bill => {

              return `
                <tr id=${bill._id}><td class="billData">${bill.name}</td>
                <td class="billData">${bill.dueDate}</td>
                <td class="billData">${bill.amount}</td>
                <td class="billData">${bill.paidFrom}</td></tr>`
          })}
      </tbody>
    </table>
  </div>
  <div>
    <form id="editBillsForm" action="" method="POST">
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
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          ${state.paymentSources
          .map(source => {

              return `<tr id=${source._id}><td class="paymentSourceData">${source.name}</td></tr>`

          })}
        </tbody>
      </table>
  </div>
  <div>
    <form id="editPaymentSourceForm" action="" method="POST">
      <label for="paymentSourceName">Name: </label><input name="paymenySourceName" id="paymentSourceName" type="text"><br><br>
      <input type="submit" value="Add"><input type="submit" value="Update"><input type="submit" value="Delete">
    </form>
  </div>
  <div id="editIncomeSourcesDiv">
      <table class="editIncomeSourceTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Frequency</th>
            <th>Starting Date</th>
          </tr>
        </thead>
        <tbody>
            ${state.incomeSources
            .map(source => {

                return `
                  <tr id=${source._id}><td class="incomeSourceData">${source.name}</td>
                  <td class="incomeSourceData">${source.amount}</td>
                  <td class="incomeSourceData">${source.frequency}</td>
                  <td class="incomeSourceData">${source.startingDate}</td></tr>`
            })}
        </tbody>
      </table>
  </div>
  <div>
    <form id="editIncomeSourcesForm" action="" method="POST">
      <label for="incomeSourceName">Name: </label>
        <input name="" id="incomeSourceName" type="text"><br><br>
      <label for="incomeSourceAmount">Amount: </label>
        <input name="" id="incomeSourceAmount" type="text"><br><br>
      <label for="incomeSourceFrequency">Frequency: </label>
        <input name="" id="incomeSourceFrequency" type="text"><br><br>
      <label for="incomeSourceStartingDate">Starting Date: </label>
        <input name="" id="incomeSourceStartingDate" type="text"><br><br>
    </form>
  </div>
</main>`;



