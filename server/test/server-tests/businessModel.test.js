import chai from 'chai';
import bcrypt from 'bcrypt';
import db from '../../models/index';

const { expect } = chai;
const { Business, User } = db;

describe('Business Model', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => Promise.resolve(done()))
      .catch(err => Promise.reject(done(err)));
  });

  describe('create and findOne', () => {
    it('works', async () => {
      const businessDetails = {
        name: 'Clash of clans',
        email: 'damilolaajiboye@live.com',
        location: 'Lagos',
        category: 'gaming',
        description: 'Game for collaboration',
        address: '23,Adeba Ibeju Lekki Lagos',
        telephoneNumber: '07066445523',
        homeNumber: '08043553081',
        UserId: 1
      };
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
        telephoneNumber: '07066445523',
        homeNumber: '08043553081',
      };
      const createdUser = await User.create(userDetails);
      const createdBusiness = await Business.create(businessDetails);
      expect(createdBusiness.name).to.equal('Clash of clans');
      expect(createdBusiness.telephoneNumber).to.equal('07066445523');
      expect(createdBusiness.email).to.equal('damilolaajiboye@live.com');
      const foundBusiness = await Business.findOne();
      expect(foundBusiness.category).to.equal('gaming');
    });
  });

  describe('where', () => {
    it('finds only rows for the given condition', async () => {
      const businessDetails = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
        location: 'Abuja',
        category: 'transportation',
        description: 'we rent cars for taxis',
        UserId: 1,
        address: '2 Jakande Lekki'
      };
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
        telephoneNumber: '07066445523',
        homeNumber: '08043553081',
      };
      const createdUser = await User.create(userDetails);
      const [business1, business2] = await Promise.all([
        Business.create(businessDetails),
        Business.create({
          name: 'Bus Driving',
          email: 'damilareajiboye@livea.com',
          telephoneNumber: '07066445728',
          homeNumber: '08043552091',
          location: 'Abuja',
          category: 'transportation',
          description: 'we rent bus for taxis',
          UserId: 1,
          address: '12 Jakande Lekki'
        })
      ]);
      const businessCount = await Business.count();
      expect(businessCount).to.equal(2);
      const businesss = await Business.findAll({ where: { name: 'Uber Driving' } });
      expect(businesss.length).to.equal(1);
    });
  });

  describe('update and delete', () => {
    it('updates and deletes businesss', async () => {
      const businessDetails = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
        location: 'Abuja',
        category: 'transportation',
        description: 'we rent cars for taxis',
        UserId: 1,
        address: '2 Jakande Lekki'
      };
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
        telephoneNumber: '07066445523',
        homeNumber: '08043553081',
      };
      const createdUser = await User.create(userDetails);
      const business1 = await Business.create(businessDetails);
      const businesss = await Business.findOne({ where: { name: 'Uber Driving' } });
      const newName = { name: 'Taxify Driving' };
      const updatedBusiness = await businesss.update(newName, { fields: Object.keys(newName) });
      expect(updatedBusiness.name).to.equal('Taxify Driving');
      const businessToDelete = await Business.findOne({ where: { name: 'Taxify Driving' } });
      expect(businessToDelete.name).to.equal('Taxify Driving');
      const deleteBusiness = await businessToDelete.destroy();
      const deletedBusiness = await Business.findAll({ where: { name: 'Taxify Driving' } });
      expect(deletedBusiness.length).to.equal(0);
    });
  });
});

