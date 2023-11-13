// import { Allow } from 'class-validator';
// import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
// import { OrderDetailEntity } from 'src/modules/order-detail/models/order-detail.entity';
// import { ChildEntity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
// import { QuickApplicationEntity } from './quickapplication.entity';

// @ChildEntity()
// export class BuyerQuickApplicationEntity extends QuickApplicationEntity {
//   @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.application)
//   @JoinColumn()
//   @Allow()
//   orderDetails: OrderDetailEntity;

//   @ManyToOne(
//     () => BuyerCompanyEntity,
//     (buyerCompany) => buyerCompany.applications,
//     {
//       eager: true,
//       cascade: true,
//       onDelete: 'CASCADE',
//     },
//   )
//   @JoinColumn()
//   company: BuyerCompanyEntity;
// }
