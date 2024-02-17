// const cssPath = path.join(process.cwd(), "public", "pdf.css");
// const css = fs.readFileSync(cssPath, "utf-8");
import dayjs from "dayjs";

export const generateHtml = (payload: any) => {
  const issueDate = dayjs(payload.issueDate).format("DD MMMM YYYY");
  const dueDate = dayjs(payload.dueDate).format("DD MMMM YYYY");
  const company = payload.company;
  const customer = payload.customer;
  const bankDetails1 = `Bank: ${company.bankname}, Branch: ${company.branchname}, A/C Name: ${company.accountname},`;
  const bankDetails2 = `A/C Type: ${company.accounttype}, A/C #: ${company.accountnumber},`;
  const bankDetails3 = `Bank Code: ${company.bankcode}, SWIFT BIC Code: ${company.swiftcode}, Branch #: ${company.branchnumber}`;
  const items = payload.items
    .map((item: any) => {
      return `
      <tr>
        <td>${item.description}</td>
        <td>${item.qty}</td>
        <td>${Number(item.unitPrice).toFixed(2)}</td>
        <td>${Number(item.amount).toFixed(2)}</td>
      </tr>
    `;
    })
    .join("");

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
   <style>${style}</style>
  </head>
  <body>
    <header>
      <div class="flex header">
        <h1>Invoice</h1>
        <div class="image">
          <img
            src=${company.logoUrl}
            alt=${company.name}
          />
        </div>
      </div>

      <div class="flex">
        <div>
          <p>${customer.name}</p>
          <p>Attn: ${customer.contact[0].title} ${customer.contact[0].name}</p>
          <p>${customer.street} ${customer.city}</p>
          <p>${customer.state} ${customer.postcode}</p>
        </div>

        <div class="flex right">
          <div>
            <p class="bold">Invoice number</p>
            <p>INV-${payload.id}</p>
            <p class="bold invoicedate">Invoice Date</p>
            <p>${issueDate}</p>
          </div>
          <div class="company">
            <p>${company.name}</p>
            <p>${company.street}</p>
            <p>${company.city}</p>
            <p>${company.state}, ${company.postcode}</p>
            <p>phone: ${company.phone}</p>
            <p>UEN: ${company.uen}</p>
          </div>
        </div>
      </div>
    </header>

    <main>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
             ${items}
        </tbody>
      </table>

      <table class="total">
        <tr>
          <td>Subtoal:</td>
          <td>$${Number(payload.subtotal).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total Tax:</td>
          <td>$${Number(payload.totalTax).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>$${Number(payload.totalAmount).toFixed(2)}</td>
        </tr>
      </table>
    </main>

    <footer>
      <p class="bold duedate">Due Date: ${dueDate}</p>
      <p>
        For cheque payment, no receipt will be issued.
      </p>
      <p>
        Cheque is to be crossed and made payable to ${company.name}.
      </p>
      <p>${bankDetails1}</p>
      <p>${bankDetails2}</p>
      <p>${bankDetails3}</p>
    </footer>
  </body>
</html>
  `;
};

const style = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 50px 30px;
}

header {
  padding: 10px;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.flex .right {
  gap: 30px;
  width: 50%;
}

.company {
  flex: 1;
}

footer {
  margin-top: 50px;
  padding: 10px;
}

.total {
  margin-left: auto;
  margin-top: 50px;
  width: 40%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th {
  /* border: 1px solid #ddd; */
  padding: 8px;
}
td {
  /* border: 1px solid #ddd; */
  padding: 8px;
}

th {
  text-align: left;
}

tfoot {
  font-weight: bold;
}

p {
  margin: 0;
  padding: 0;
}

.bold {
  font-weight: bold;
}

.duedate {
  margin: 10px 0;
  font-size: large;
}

.invoicedate {
  margin-top: 10px;
}

.header {
  align-items: flex-start;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

.image {
  width: 50%;
  height: 50px;
}

img {
  width: auto;
  height: 100%;
  object-fit: contain;
}
`;