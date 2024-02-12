// const cssPath = path.join(process.cwd(), "public", "pdf.css");
// const css = fs.readFileSync(cssPath, "utf-8");

export const generateHtml = (payload: any) => {
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
            src="https://smartinvoice-gacapstone.s3.ap-southeast-2.amazonaws.com/img_206.jpg"
            alt="logo"
          />
        </div>
      </div>

      <div class="flex">
        <div>
          <p>General Assembly Singapore</p>
          <p>Attn: Mr.Saito</p>
          <p>Address</p>
        </div>

        <div class="flex right">
          <div>
            <p class="bold">Invoice number</p>
            <p>123456</p>
            <p class="bold invoicedate">Invoice Date</p>
            <p>February 12, 2024</p>
          </div>
          <div class="company">
            <p>TAMSAN Pte Ltd</p>
            <p>WeWork</p>
            <p>36 Robinson Road</p>
            <p>Singapore, 068877</p>
            <p>phone:12345667</p>
            <p>UEN:1234455</p>
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
          <tr>
            <td>Item 1</td>
            <td>2</td>
            <td>$10.00</td>
            <td>$20.00</td>
          </tr>
          <tr>
            <td>Item 1</td>
            <td>2</td>
            <td>$10.00</td>
            <td>$20.00</td>
          </tr>
          <tr>
            <td>Item 1</td>
            <td>2</td>
            <td>$10.00</td>
            <td>$20.00</td>
          </tr>
        </tbody>
      </table>

      <table class="total">
        <tr>
          <td>Subtoal:</td>
          <td>$20.00</td>
        </tr>
        <tr>
          <td>Total Tax:</td>
          <td>$20.00</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>$20.00</td>
        </tr>
      </table>
    </main>

    <footer>
      <p class="bold duedate">Due Date: 14 Feb 2024</p>
      <p>
        For cheque payment, no receipt will be issued. Cheque is to be crossed
        and made payable to TAMSAN PTE. LTD.
      </p>
      <p>Bank: DBS Bank Ltd, Branch: MBFC Branch, A/C Name: TAMSAN PTE. LTD.</p>
      <p>A/C Type: Current Account, A/C #: 001-907810-5</p>
      <p>Bank Code: 7171, SWIFT BIC Code: DBSSSGSG, Branch #: 001</p>
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