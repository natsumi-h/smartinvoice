# SmartInvoice
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
* [dayjs](https://www.npmjs.com/package/dayjs) - Date value formatting
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [Nodemailer](https://nodemailer.com/)
* [AmazonS3](https://aws.amazon.com/s3/) -PDF/Org logo image storage
* [Puppeteer](https://pptr.dev/) -Headless browser to convert html to PDF

### PaaS
* [Vercel](https://vercel.com/)

## Documentations
* [Wireframe](https://www.figma.com/file/g9r1hUNXwvmQWFXePhVFPS/GA-Capstone-Mantine?type=design&node-id=1102-384&mode=design&t=LyXQIdN01dmU1Xsf-0)(Figma)
* [Page Structure](https://docs.google.com/spreadsheets/d/1fEhIKWBwyQ6nHCPvhyeVGnzgMv6qiBL49Tq5Oz7gI-s/edit#gid=0)
* [API Endpoints](https://docs.google.com/spreadsheets/d/1fEhIKWBwyQ6nHCPvhyeVGnzgMv6qiBL49Tq5Oz7gI-s/edit#gid=1534939420)
* [Database ERD](https://drawsql.app/teams/natsumi-horis-team/diagrams/project4)
  
![Screenshot 2024-02-24 at 7 47 26 PM](https://github.com/natsumi-h/smartinvoice/assets/88537845/d9047872-665f-45ce-97d9-cc22de8fc323)

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
