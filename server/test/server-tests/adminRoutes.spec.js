import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../../app';
import db, { User, ContactUs } from '../../models';
import { userDetails, userDetails1 } from '../testData/userData';

const { expect } = chai;
chai.use(chaiHttp);
let authToken1;
let usersId;
const baseEndpoint = '/api/v1/admin';

describe(`${baseEndpoint}/`, () => {
  beforeEach((done) => {
    db.User.sequelize.sync({ force: true }).then(() => {
      chai
        .request(app)
        .post('/api/v1/auth/signUp')
        .send({
          firstname: 'Admin',
          lastname: 'Weconnect',
          username: 'Admin',
          email: 'weconnect@admin.com',
          password: 'weconnect@admin',
          confirmPassword: 'weconnect@admin',
          telephoneNumber: '08165700940',
          homeNumber: '08022235913'
        })
        .end((err, res) => {
          authToken1 = `Bearer ${res.body.token}`;
          usersId = res.body.createdUser.userId;
          done();
        });
    });
  });

  it('gets a list of users', (done) => {
    chai
      .request(app)
      .get(`${baseEndpoint}/users`)
      .set('authorization', authToken1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body[0].lastname).to.equal('Weconnect');
        expect(res.body[0].firstname).to.equal('Admin');
        done();
      });
  });

  it('deletes a user', (done) => {
    chai
      .request(app)
      .delete(`${baseEndpoint}/user/${usersId}`)
      .set('authorization', authToken1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User Deleted');
        done();
      });
  });

  it('Catches validation error for userId', (done) => {
    chai
      .request(app)
      .delete(`${baseEndpoint}/user/10`)
      .set('authorization', authToken1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Adds a business location', (done) => {
    chai
      .request(app)
      .post(`${baseEndpoint}/businessLocation`)
      .set('authorization', authToken1)
      .send({ location: 'Ibadan' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Location added successfully');
        done();
      });
  });

  it('Adds a business category', (done) => {
    chai
      .request(app)
      .post(`${baseEndpoint}/businessCategory`)
      .set('authorization', authToken1)
      .send({ category: 'Medical' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Category added successfully');
        done();
      });
  });

  it('Gets a list of business categories', (done) => {
    chai
      .request(app)
      .get(`${baseEndpoint}/businessCategory`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.equal('GAMING');
        done();
      });
  });

  it('Gets a list of contactUs messages', (done) => {
    chai
      .request(app)
      .get(`${baseEndpoint}/contactUs`)
      .set('authorization', authToken1)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('No messages');
        done();
      });
  });

  it('Adds a contactUs message', (done) => {
    chai
      .request(app)
      .post(`${baseEndpoint}/contactUs`)
      .send({
        firstname: 'Dara',
        lastname: 'Aji',
        email: 'daramola@live.com',
        message: 'Unblock my Account pls'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Submitted');
        chai
          .request(app)
          .get(`${baseEndpoint}/contactUs`)
          .set('authorization', authToken1)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });

  it('Catches Validation errors', (done) => {
    chai
      .request(app)
      .post(`${baseEndpoint}/contactUs`)
      .send({
        firstname: 'Dara10',
        lastname: 'Aji',
        email: 'daramola@live.com',
        message: 'Unblock my Account pls'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Catches Required Fields Validation errors', (done) => {
    chai
      .request(app)
      .post(`${baseEndpoint}/contactUs`)
      .send({
        firstname: '',
        lastname: 'Aji',
        email: 'daramola@live.com',
        message: 'Unblock my Account pls'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
