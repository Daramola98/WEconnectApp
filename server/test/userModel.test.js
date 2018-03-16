import chai from 'chai';
import bcrypt from 'bcrypt';
import db from '../models/index';

process.env.NODE_ENV = 'test';
const { expect } = chai;
const { User } = db;

describe('User Model', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => Promise.resolve(done()))
      .catch(err => Promise.reject(done(err)));
  });

  describe('create and findOne', () => {
    it('works', async () => {
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      const createdUser = await User.create(userDetails);
      expect(createdUser.lastname).to.equal('Ajiboye');
      expect(createdUser.telephoneNumber).to.equal('070664455523');
      expect(createdUser.email).to.equal('damilolaajiboye@live.com');
      const foundUser = await User.findOne();
      expect(foundUser.firstname).to.equal('Damilola');
    });
  });

  describe('where', () => {
    it('finds only rows for the given condition', async () => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilareajiboye@live.com',
        password: bcrypt.hashSync('dammy100', 10),
        telephoneNumber: '070664455527',
        homeNumber: '08043553091',
      };
      const [user1, user2] = await Promise.all([
        User.create(userDetails),
        User.create({
          firstname: 'Julius',
          lastname: 'Ajiboye',
          email: 'juliusajiboye@live.com',
          password: bcrypt.hashSync('julius100', 10),
          telephoneNumber: '070664455565',
          homeNumber: '08043553087',
        })
      ]);
      const userCount = await User.count();
      expect(userCount).to.equal(2);
      const users = await User.findAll({ where: { firstname: 'Julius' } });
      expect(users.length).to.equal(1);
    });
  });

  describe('update and delete', () => {
    it('updates and deletes users', async () => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilareajiboye@live.com',
        password: bcrypt.hashSync('dammy100', 10),
        telephoneNumber: '070664455527',
        homeNumber: '08043553091',
      };
      const [user1, user2] = await Promise.all([
        User.create(userDetails),
        User.create({
          firstname: 'Julius',
          lastname: 'Ajiboye',
          email: 'juliusajiboye@live.com',
          password: bcrypt.hashSync('julius100', 10),
          telephoneNumber: '070664455565',
          homeNumber: '08043553087',
        })
      ]);
      const users = await User.findOne({ where: { firstname: 'Julius' } });
      const newLastname = { lastname: 'Taye' };
      const updatedUser = await users.update(newLastname, { fields: Object.keys(newLastname) });
      expect(updatedUser.lastname).to.equal('Taye');
      const userToDelete = await User.findOne({ where: { firstname: 'Damilare' } });
      expect(userToDelete.lastname).to.equal('Ajiboye');
      const deleteUser = await userToDelete.destroy();
      const deletedUser = await User.findAll({ where: { firstname: 'Damilare' } });
      expect(deletedUser.length).to.equal(0);
    });
  });
});

