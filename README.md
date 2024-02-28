# 📝SmartInvoice
Smartinvoice is an intuitive application designed for generating professional invoices. It allows users to save their company information, register customer details, and create custom invoices using form inputs. The application features an efficient status management system, viewable through a comprehensive dashboard. Additionally, it supports team collaboration, enabling multiple users to work seamlessly together.
## Live URL
https://smartinvoice-sepia.vercel.app/signin

```
Sample Account(*To be removed)
Email: natsmy.1211gmail.com
Password: nats723
```

## Screenshots
### Home(Marketing)
<img width="1362" alt="Screenshot 2024-02-25 at 11 36 20 PM" src="https://github.com/natsumi-h/smartinvoice/assets/88537845/e8743c4c-12c2-40f8-8952-60fec76bf9d2">

### Dashboard
<img width="1362" alt="Screenshot 2024-02-25 at 11 36 31 PM" src="https://github.com/natsumi-h/smartinvoice/assets/88537845/348f1252-293f-43a3-88d1-2cc31b0d48cb">

### Invoice Detail
<img width="1362" alt="Screenshot 2024-02-25 at 11 36 39 PM" src="https://github.com/natsumi-h/smartinvoice/assets/88537845/0c14cff5-218d-4d07-a46d-415ebade21e5">

### Create Invoice
<img width="1362" alt="Screenshot 2024-02-25 at 11 36 59 PM" src="https://github.com/natsumi-h/smartinvoice/assets/88537845/5e30c82d-a651-4614-9a48-9bdf5e0b418d">

### Customers
<img width="1362" alt="Screenshot 2024-02-25 at 11 37 08 PM" src="https://github.com/natsumi-h/smartinvoice/assets/88537845/93b700e6-229a-4f28-bf4a-d161b4bdfee1">

### Customer's Contacts
<img width="1362" alt="Screenshot 2024-02-25 at 11 37 18 PM" src="https://github.com/natsumi-h/smartinvoice/assets/88537845/9277c79c-d8df-4a67-b94c-7a78eccaf13f">


## Technologies Used
### Core technologies
* [Next.js](https://nextjs.org/) Ver.14 App Router
* [Prisma](https://www.prisma.io/) -ORM
* [PlanetScale](https://planetscale.com/) -MySQL DB
* [Typescript](https://www.typescriptlang.org/)
* [Mantine](https://mantine.dev/) -UI Library
* [Mantine form](https://mantine.dev/form/use-form/) -Form validation
* [Zod](https://zod.dev/) -Form Schema Validation

### Other packeges used
* [jose](https://www.npmjs.com/package/jose) -JWT signing and encryption
* [Nodemailer](https://nodemailer.com/) -For Email sending
* [AmazonS3](https://aws.amazon.com/s3/) -PDF/Org logo image storage
* [Puppeteer](https://pptr.dev/) -Headless browser to convert html to PDF
* [dayjs](https://www.npmjs.com/package/dayjs) - Date value formatting

### Hosting
* [Vercel](https://vercel.com/)

## Documentations
* [Wireframe](https://www.figma.com/file/g9r1hUNXwvmQWFXePhVFPS/GA-Capstone-Mantine?type=design&node-id=1102-384&mode=design&t=LyXQIdN01dmU1Xsf-0)(Figma)
* [Page Structure](https://docs.google.com/spreadsheets/d/1fEhIKWBwyQ6nHCPvhyeVGnzgMv6qiBL49Tq5Oz7gI-s/edit#gid=0)
* [API Endpoints](https://docs.google.com/spreadsheets/d/1fEhIKWBwyQ6nHCPvhyeVGnzgMv6qiBL49Tq5Oz7gI-s/edit#gid=1534939420)
* [Database ERD](https://drawsql.app/teams/natsumi-horis-team/diagrams/project4)

![Screenshot 2024-02-28 at 4 19 39 PM](https://github.com/natsumi-h/smartinvoice/assets/88537845/08e3cf42-ce58-45c0-9f9f-7eb30222d882)

## Key Challenges/takeaways

### Server side rendering vs Client side rendering

### Soft delete practice

## Next Steps
* UI Enhancement (Pagination, Next.js loading/cache optimization)
* Multiple cases consideration
  * In case of users belonging to multiple organizations
  * Invoice status handling
  * User profile update
* Security enhancement
  * Token handling
  * S3 data protection

## References and Inspirations
* [Xero Online Invoicing Software](https://www.xero.com/sg/accounting-software/send-invoices/)
