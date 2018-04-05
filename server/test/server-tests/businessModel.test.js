import chai from 'chai';
import bcrypt from 'bcrypt';
import db from '../../models';

const { expect } = chai;
const { Business, User } = db;
let userId;

describe('Business Model', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => {
        const userDetails = {
          firstname: 'Damilola',
          lastname: 'Ajiboye',
          email: 'damilolaajiboye@live.com',
          password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
          telephoneNumber: '070664455523',
          homeNumber: '08043553081',
        };
        User.create(userDetails)
          .then((user) => {
            userId = user.id;
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  describe('create', () => {
    it('creates a new business', (done) => {
      const businessDetails = {
        name: 'Clash of clans',
        email: 'damilolaajiboye@live.com',
        location: 'LAGOS',
        category: 'GAMING',
        description: 'Game for collaboration',
        address: '23,Adeba Ibeju Lekki LAGOS',
        telephoneNumber: '07066445523',
        homeNumber: '08043553081',
        userId
      };
      Business.create(businessDetails)
        .then((business) => {
          expect(business.name).to.equal('Clash of clans');
          expect(business.email).to.equal('damilolaajiboye@live.com');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('finds businesses', () => {
    beforeEach((done) => {
      const businessDetails = {
        name: 'Clash of clans',
        email: 'damilolaajiboye@live.com',
        location: 'LAGOS',
        category: 'GAMING',
        description: 'Game for collaboration',
        address: '23,Adeba Ibeju Lekki LAGOS',
        telephoneNumber: '07066445523',
        homeNumber: '08043553081',
        userId
      };
      const businessDetails2 = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
        location: 'ABIA',
        category: 'SOLAR',
        description: 'we rent cars for taxis',
        address: '2 Jakande Lekki',
        userId
      };
      Business.create(businessDetails)
        .then((business) => {
          Business.create(businessDetails2)
            .then(business2 => done())
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });

    it('finds one business', (done) => {
      Business.findOne({
        where: {
          name: 'Uber Driving'
        }
      })
        .then((business) => {
          expect(business).to.be.a('object');
          expect(business.name).to.equal('Uber Driving');
          done();
        })
        .catch(err => done(err));
    });

    it('finds all businesses', (done) => {
      Business.findAll()
        .then((business) => {
          expect(business).to.be.a('array');
          expect(business[0].name).to.equal('Clash of clans');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('update businesses', () => {
    beforeEach((done) => {
      const businessDetails = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
        location: 'ABIA',
        category: 'SOLAR',
        description: 'we rent cars for taxis',
        address: '2 Jakande Lekki',
        userId
      };
      Business.create(businessDetails)
        .then((business) => {
          done();
        })
        .catch(err => done(err));
    });

    it('updates a business\'s details', (done) => {
      Business.findOne({ where: { name: 'Uber Driving' } })
        .then((business) => {
          business.update({ name: 'Taxify Driving' })
            .then((updatedBusiness) => {
              expect(updatedBusiness.name).to.equal('Taxify Driving');
              done();
            })
            .catch(err => done(err));
        });
    });
  });

  describe('deletes businesses', () => {
    beforeEach((done) => {
      const businessDetails = {
        name: 'Uber Driving',
        email: 'damilareajiboye@live.com',
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
        location: 'ABIA',
        category: 'SOLAR',
        description: 'we rent cars for taxis',
        address: '2 Jakande Lekki',
        userId
      };
      Business.create(businessDetails)
        .then((business) => {
          done();
        })
        .catch(err => done(err));
    });

    it('deletes a business', (done) => {
      Business.findOne({ where: { name: 'Uber Driving' } })
        .then((business) => {
          business.destroy()
            .then((deletedBusiness) => {
              expect(deletedBusiness.name).to.equal(undefined);
              done();
            });
        });
    });
  });
});

