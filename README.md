# 📝SmartInvoice
Smartinvoice is an intuitive application designed for generating professional invoices. It allows users to save their company information, register customer details, and create custom invoices using form inputs. The application features an efficient status management system, viewable through a comprehensive dashboard. Additionally, it supports team collaboration, enabling multiple users to work seamlessly together.
## Live URL

## Screenshots

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
  
![Screenshot 2024-02-25 at 11 20 27 PM](https://github.com/natsumi-h/smartinvoice/assets/88537845/92a2c4e4-d27c-445c-8720-db148a5eb8a7)



## Key Challenges/takeaways

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
