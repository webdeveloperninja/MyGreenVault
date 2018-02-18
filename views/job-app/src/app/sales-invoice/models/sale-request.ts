import { Sale } from 'app/sales-invoice/models';

export class SaleRequest {
  data: Sale;
  emails: string[];
}
