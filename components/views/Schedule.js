import html from "html-literal";

export default (state) => html`
<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="scheduleDiv">
    <!-- I've just hard-coded a table here to start to nail down the layout. -->
    <table class="scheduleTable">
     <thead>
        <tr>
          <th>Date</th>
          <th>Bill</th>
          <th>BoA</th>
          <th>BoA CC</th>
          <th>Citi</th>
          <th>Truist</th>
          <th>Cash</th>
        </tr>
      </thead>
     <tbody>
       <tr>
          <td>1 Jan</td>
          <td class="billName">Rent</td>
          <td>$900</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
       <tr>
          <td>4 Jan</td>
          <td class="billName">Electric</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>$195</td>
        </tr>
        <tr>
          <td>4 Jan</td>
          <td class="billName">Comcast</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6 Jan</td>
          <td class="billName">Netflix</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8 Jan</td>
          <td class="billName">Affirm</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8 Jan</td>
          <td class="billName">BoA CC</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>Totals</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
</div>
<div id="totalsDiv">
    <table class="totalsTable">
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
</main>
`;
