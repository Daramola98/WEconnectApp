import chai from 'chai';
import bcrypt from 'bcrypt';
import db from '../../models/index';

const { expect } = chai;
const { Business, User, BusinessReview } = db;

describe('BusinessReview Model', () => {
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
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
        UserId: 1
      };
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      const reviewDetails = {
        ReviewerId: 1,
        BusinessId: 1,
        review: 'Nice Business'
      };
      const createdUser = await User.create(userDetails);
      const createdBusiness = await Business.create(businessDetails);
      const addReview = await BusinessReview.create(reviewDetails);
      expect(addReview.review).to.equal('Nice Business');
      expect(createdBusiness.telephoneNumber).to.equal('070664455523');
      expect(createdBusiness.email).to.equal('damilolaajiboye@live.com');
      const foundReview = await BusinessReview.findOne();
      expect(foundReview.ReviewerId).to.equal(1);
    });
  });

  describe('where', () => {
    it('finds only rows for the given condition', async () => {
      const businessDetails = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '070664455527',
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
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      const reviewDetails = {
        ReviewerId: 1,
        BusinessId: 1,
        review: 'Nice Business'
      };
      const createdUser = await User.create(userDetails);
      const [business1, business2] = await Promise.all([
        Business.create(businessDetails),
        Business.create({
          name: 'Bus Driving',
          email: 'damilareajiboye@livea.com',
          telephoneNumber: '070664455728',
          homeNumber: '08043552091',
          location: 'Abuja',
          category: 'transportation',
          description: 'we rent bus for taxis',
          UserId: 1,
          address: '12 Jakande Lekki'
        })
      ]);
      const addReview = await BusinessReview.create(reviewDetails);
      const businessCount = await Business.count();
      expect(businessCount).to.equal(2);
      const review = await BusinessReview.findAll({ where: { ReviewerId: 1 } });
      expect(review.length).to.equal(1);
    });
  });

  describe('update and delete', () => {
    it('updates and deletes businesss', async () => {
      const businessDetails = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '070664455527',
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
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      const reviewDetails = {
        ReviewerId: 1,
        BusinessId: 1,
        review: 'Nice Business'
      };
      const createdUser = await User.create(userDetails);
      const business1 = await Business.create(businessDetails);
      const addReview = await BusinessReview.create(reviewDetails);
      const review = await BusinessReview.findOne({ where: { ReviewerId: 1 } });
      const newReview = { review: 'Excellent Business' };
      const updatedReview = await review.update(newReview, { fields: Object.keys(newReview) });
      expect(updatedReview.review).to.equal('Excellent Business');
      const reviewToDelete = await BusinessReview.findOne({ where: { ReviewerId: 1 } });
      expect(reviewToDelete.review).to.equal('Excellent Business');
      const deleteReview = await reviewToDelete.destroy();
      const deletedReview = await BusinessReview.findAll({ where: { ReviewerId: 1 } });
      expect(deletedReview.length).to.equal(0);
    });
  });
});

