import chai from 'chai';
import bcrypt from 'bcrypt';
import db from '../../models/index';

const { expect } = chai;
const { User } = db;

describe('User Model', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => Promise.resolve(done()))
      .catch(err => Promise.reject(done(err)));
  });

  describe('create', () => {
    it('creates a new user', (done) => {
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
          expect(user.lastname).to.equal('Ajiboye');
          expect(user.telephoneNumber).to.equal('070664455523');
          expect(user.email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });
  });

  describe('finds users', () => {
    beforeEach((done) => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilareajiboye@live.com',
        password: bcrypt.hashSync('dammy100', 10),
        telephoneNumber: '070664455527',
        homeNumber: '08043553091',
      };
      const userDetails2 = {
        firstname: 'Julius',
        lastname: 'Ajiboye',
        email: 'juliusajiboye@live.com',
        password: bcrypt.hashSync('julius100', 10),
        telephoneNumber: '070664455565',
        homeNumber: '08043553087',
      };
      User.create(userDetails)
        .then((user) => {
          User.create(userDetails2)
            .then((user2) => {
              done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });

    it('finds one user', (done) => {
      User.findOne({
        where: {
          firstname: 'Julius'
        }
      })
        .then((user) => {
          expect(user).to.be.a('object');
          expect(user.lastname).to.equal('Ajiboye');
          done();
        });
    });

    it('finds all users', (done) => {
      User.findAll()
        .then((user) => {
          expect(user).to.be.a('array');
          expect(user[0].lastname).to.equal('Ajiboye');
          done();
        });
    });
  });

  describe('update users', () => {
    beforeEach((done) => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilareajiboye@live.com',
        password: bcrypt.hashSync('dammy100', 10),
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
      };
      User.create(userDetails)
        .then((user) => {
          done();
        })
        .catch(err => done(err));
    });

    it('updates a user\'s details', (done) => {
      User.findOne({ where: { firstname: 'Damilare' } })
        .then((user) => {
          user.update({ firstname: 'Damilola' })
            .then((updatedUser) => {
              expect(updatedUser.firstname).to.equal('Damilola');
              done();
            });
        });
    });
  });

  describe('deletes users', () => {
    beforeEach((done) => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilareajiboye@live.com',
        password: bcrypt.hashSync('dammy100', 10),
        telephoneNumber: '07066445527',
        homeNumber: '08043553091',
      };
      User.create(userDetails)
        .then((user) => {
          done();
        })
        .catch(err => done(err));
    });

    it('deletes a user', (done) => {
      User.findOne({ where: { firstname: 'Damilare' } })
        .then((user) => {
          user.destroy()
            .then((deletedUser) => {
              expect(deletedUser.firstname).to.equal(undefined);
              done();
            });
        });
    });
  });
});

