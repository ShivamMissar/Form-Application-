const DB = require('../Model/db.js');
const admin = require('../Model/admin.js');
const assert = require('assert');
const sinon = require('sinon');


describe('Admin', function() {
    describe("viewAllUsers()", function() {
      it("It should retrieve all users from the database", async function() {
        // Stub DB.query() to simulate successful retrieval
        const queryStub = sinon.stub(DB, 'query').callsFake((sql, callback) => {
          // Simulated user data from the database
          const mockResult = [
            { UserId: 1, Username: 'user1', Email: 'user1@example.com' },
            { UserId: 2, Username: 'user2', Email: 'user2@example.com' }
          ];
          callback(null, mockResult);
        });
  
        try {
          const users = await admin.viewAllUsers();
          assert.strictEqual(users.length, 2); 
          assert.strictEqual(users[0].UserId, 1); 
          assert.strictEqual(users[1].UserId, 2); 
        } finally {
          queryStub.restore(); 
        }
      });
    });
  
    describe('#deleteUserById()', function() {
      it('should delete the user with the specified ID', async function() {
      
        const queryStub = sinon.stub(DB, 'query').callsFake((sql, value, callback) => {
         
          const mockResult = { affectedRows: 1 }; 
          callback(null, mockResult);
        });
  
        try {
          const userId = 1; 
          const result = await admin.deleteUserById(userId);
          assert.strictEqual(result.affectedRows, 1);
        } finally {
          queryStub.restore(); 
        }
      });
    });
  });