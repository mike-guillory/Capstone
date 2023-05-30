import html from "html-literal";

export default (state) => html`
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
  })
})()}

<main>
<h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="editBillsDiv" class="editDiv">
  <h2 class="divHeading">Edit Bills</h2>
    <table id="editBillsTable" class="editTable">
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
    <form id="editBillsForm" class="editForm" action="" method="">
      <input type="hidden" id="billId">
      <label for="billName" class="input">Name: </label>
      <input name="billName" id="billName" type="text"><br><br>
      <label for="billDueDate" class="input">Due Date: </label>
      <input name="dueDate" id="billDueDate" type="text" placeholder="Day of the month"><br><br>
      <label for="billAmount" class="input">&#36;</label>
      <input name="billAmount" id="billAmount" type="text"><br><br>
      <label for="billPaidFrom" class="input">Paid From</label>
      <select name="billPaidFrom" id="billPaidFrom">
            <option></option>
            ${state.paymentSources
            .map(source => {
              return `<option value="${source.name}">${source.name}</option>`
            })}
          </select><br><br>
      <input type="button" class="button" name="billAdd" value="Add">
      <input type="button" class="button" name="billUpdate" value="Update">
      <input type="button" class="button" name="billDelete"  value="Delete">
    </form>
  </div>
  <div id="editPayDaysDiv" class="editDiv">
  <h2 class="divHeading">Edit Paydays</h2>
    <table id="editPayDaysTable" class="editTable">
      <thead>
        <tr>
          <th>Source</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>

        ${state.payDays
        .map(payDay => {
          let payDate = new Date(payDay.date).toISOString().substring(0, 10);

          return `
            <tr id=${payDay._id}><td class="payDayData">${payDay.paySource}</td>
            <td class="payDayData">${payDay.amount}</td>
            <td class="payDayData">${payDate}</td></tr>`

        })}

      </tbody>
    </table>
    <form id="EditPayDaysForm" class="editForm" action="" method="">
    <input type="hidden" id="payDayId">
      <label for="incomeSource">Income Source:</label>
          <select name="incomeSource" id="incomeSource">
            <option selected></option>
            ${state.incomeSources
            .map(source => {
              return `<option value="${source.name}">${source.name}</option>`
            })}
          </select><br><br>
      <label for="payDate"></label>
          <input name="payDate" id="payDate" type="date" class="input"><br><br>
      <label for="payDayAmount">&#36;</label>
          <input name="payDayAmount" id="payDayAmount" type="text" class="input"><br><br>
          <input type="button" class="button" value="Add">
          <input type="button" class="button" value="Update">
          <input type="button" class="button" value="Delete">
    </form>
  </div>
  <div id="editPaymentSourcesDiv"  class="editDiv">
  <h2 class="divHeading">Edit Payment Sources</h2>
    <table id="editPaymentSourcesTable" class="editTable">
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
    <form id="editPaymentSourcesForm" class="editForm" action="" method="">
    <input type="hidden" id="paymentSourceId">
      <label for="paymentSourceName">Name: </label>
      <input name="paymentSourceName" id="paymentSourceName" type="text" class="input"><br><br>
      <input type="button" class="button" value="Add">
      <input type="button" class="button" value="Update">
      <input type="button" class="button" value="Delete">
    </form>
  </div>
  <div>
  <div id="editIncomeSourcesDiv" class="editDiv">
  <h2 class="divHeading">Edit Income Sources</h2>
   <table id="editIncomeSourceTable" class="editTable">
     <thead>
       <tr>
         <th>Name</th>
         <th>Amount</th>
         <!-- <th>Frequency</th>
         <th>Starting Date</th> -->
       </tr>
     </thead>
     <tbody>
      ${state.incomeSources
      .map(source  => {
         return `
          <tr id=${source._id}><td class="incomeSourceData">${source.name}</td>
          <td class="incomeSourceData">${source.amount}</td>`
          // <td class="incomeSourceData">${source.frequency}</td>
          // <td class="incomeSourceData">${source.startingDate}</td></tr>
      })}
     </tbody>
    </table>
    <form id="editIncomeSourcesForm" class="editForm" action="" method="">
    <input type="hidden" id="incomeSourceId">
      <label for="incomeSourceName">Name: </label>
        <input name="" id="incomeSourceName" type="text" class="input"><br><br>
      <label for="incomeSourceAmount">&#36;</label>
        <input name="" id="incomeSourceAmount" type="text" class="input" placeholder="Anticipated/Average Pay"><br><br>
      <!-- <label for="incomeSourceFrequency">Frequency: </label>
        <input name="" id="incomeSourceFrequency" type="text" class="input"><br><br>
      <label for="incomeSourceStartingDate">Starting Date: </label>
        <input name="" id="incomeSourceStartingDate" type="text" class="input"><br><br> -->
        <input type="button" class="button" value="Add">
        <input type="button" class="button" value="Update">
        <input type="button" class="button" value="Delete">
    </form>
  </div>
</main>`


// https://www.w3docs.com/snippets/html/how-to-create-a-table-with-a-fixed-header-and-scrollable-body.html



