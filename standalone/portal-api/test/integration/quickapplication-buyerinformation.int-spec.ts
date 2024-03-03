import { faker } from '@faker-js/faker';
import path from 'path';
import { initializeTransactionalContext } from '../../src/common/transaction';
import { BuyerQuickApplicationService } from '../../src/modules/applications/services/buyer-quick-application.service/application.service';
import { BuyerCompanyEntityService } from '../../src/modules/company/services/buyer-entity.service';
import request from 'supertest';
import { AppFactory } from '../factories/app';

describe('BuyerInformation for Application (integration)', () => {
  let app: AppFactory;
  let buyerEntityId: string;
  let firstApplicationId: string;
  let secondApplicationId: string;
  let buyerCompanyEntityService: BuyerCompanyEntityService;
  let buyerQuickApplicationService: BuyerQuickApplicationService;

  beforeAll(async () => {
    initializeTransactionalContext();
    await AppFactory.dropTables();
    app = await AppFactory.new();
    buyerCompanyEntityService = app.instance.get(BuyerCompanyEntityService);
    buyerQuickApplicationService = app.instance.get(
      BuyerQuickApplicationService,
    );
  });

  it('should create a buyer', async () => {
    const createBuyer = await request(app.instance.getHttpServer())
      .post('/entities')
      .attach('logo', path.resolve(__dirname, '../../testLogo.png'))
      .field('name', 'Verner')
      .field('beneficialOwner', 'John Smith')
      .field('phoneNumber', '1234567891')
      .field('registrationNumber', '123456')
      .field('abbreviation', '55-NB')
      .field('nationality', 'Germany')
      .field('headquarters', 'Berlin')
      .field('industryType', 'Information Technology')
      .field('coreBusiness', 'Software Development')
      .field('incorporationDate', '2022-12-12')
      .field('legalForm', 'Limited')
      .field('taxAndRevenue[lastFiscalYear]', 2023)
      .field('taxAndRevenue[totalRevenue]', 120)
      .expect(201);

    buyerEntityId = createBuyer.body.id;
    expect(buyerEntityId).toBeDefined();
  });

  it('should create an application', async () => {
    const createApplication = await request(app.instance.getHttpServer())
      .post('/quick-applications')
      .send({
        title: faker.lorem.words(3),
        entityId: buyerEntityId,
      })
      .expect(201);

    firstApplicationId = createApplication.body.id;
    expect(firstApplicationId).toBeDefined();
  });

  it('should create an application buyer information', async () => {
    const result = await request(app.instance.getHttpServer())
      .post(`/quick-applications/${firstApplicationId}/buyer-info`)
      .send({
        address: {
          city: 'Cluj-Napoca',
          addressLine1: 'main address (unchanged)',
          addressLine2: 'main address (unchanged)',
          postalCode: 'ABC123',
        },
      })
      .expect(201);
  });

  it('should update address of buyerinformation', async () => {
    const updateApplication = await request(app.instance.getHttpServer())
      .patch(`/quick-applications/${firstApplicationId}/buyer-info`)
      .send({
        address: {
          city: 'Cluj-Napoca',
          addressLine1: 'main address (changed)',
          addressLine2: 'main address (changed)',
          postalCode: 'ABC123',
        },
      })
      .expect(200);

    expect(updateApplication.body.address.addressLine1).toBe(
      'main address (changed)',
    );
  });

  it('should not affect company address', async () => {
    const buyerCompanyInformation =
      await buyerCompanyEntityService.findBuyerEntityById(buyerEntityId);

    expect(
      buyerCompanyInformation.companyInformation.address.addressLine1,
    ).toBe('main address (unchanged)');
  });

  it('should create another application', async () => {
    // Mark first application as COMPLETED to bypass active application restriction (ONLY ALLOWED FOR TESTING)

    const getFirstApplication =
      await buyerQuickApplicationService.findApplicationById(
        firstApplicationId,
      );

    getFirstApplication.status = 'COMPLETED';
    getFirstApplication.save();

    const createSecondApplication = await request(app.instance.getHttpServer())
      .post('/quick-applications')
      .send({
        title: faker.lorem.words(3),
        entityId: buyerEntityId,
      })
      .expect(201);

    secondApplicationId = createSecondApplication.body.id;
    expect(secondApplicationId).toBeDefined();

    const getAllApplications =
      await buyerQuickApplicationService.getAllApplications(buyerEntityId);

    expect(getAllApplications.length).toBe(2);
  });

  it('should create second application buyer information', async () => {
    const result = await request(app.instance.getHttpServer())
      .post(`/quick-applications/${secondApplicationId}/buyer-info`)
      .send({
        address: {
          city: 'Cluj-Napoca',
          addressLine1: 'new address',
          addressLine2: 'new address',
          postalCode: 'ABC123',
        },
      });
    console.log('TEST', result.body);
  });

  it('should not change company main address', async () => {
    const buyerCompanyInformation =
      await buyerCompanyEntityService.findBuyerEntityById(buyerEntityId);

    expect(
      buyerCompanyInformation.companyInformation.address.addressLine1,
    ).toBe('main address (unchanged)');
  });

  it('should check first application address', async () => {
    const getFirstApplication = await request(app.instance.getHttpServer())
      .get(`/quick-applications/${firstApplicationId}/buyer-info`)
      .expect(200);

    expect(getFirstApplication.body.address.addressLine1).toBe(
      'main address (changed)',
    );
  });

  it('should check second application address', async () => {
    const getSecondApplication = await request(app.instance.getHttpServer())
      .get(`/quick-applications/${secondApplicationId}/buyer-info`)
      .expect(200);

    expect(getSecondApplication.body.address.addressLine1).toBe('new address');
  });

  afterAll(async () => {
    await app.close();
  });
});
