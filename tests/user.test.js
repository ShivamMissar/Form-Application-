const assert = require('assert');
const sinon = require('sinon');
const User = require('../Model/User.js');
const DB = require('../Model/db.js');


describe('User', function() 
{

  // it should be reset after each use as multiple tests will make use of this object. 
  this.afterEach(function(){sinon.restore();});
  
  describe("genUserId()", function() {
    it("should generate a user id", function() {
      const userId = User.genUserId();
      assert.ok(userId); // Check if userId is not null
    });

    it('should generate unique user ids', function() {
      const userId1 = User.genUserId();
      const userId2 = User.genUserId();
      assert.notStrictEqual(userId1, userId2); // Check if userIds do not duplicate
    });

  });
  describe('#securePassword()',function()
  {
    it('This should return a hashed password', function() 
    {
      const PASSWORD = "Test1234-";
      const convert_to_hash = User.securePassword(PASSWORD);
      assert.ok(convert_to_hash); // checks if return value is not null
    });


    describe("registerUser()", function() 
    {
      it("It should successfully register user", async function() 
      {
        const fake_query = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
          callback(null, {insertId : 1});
          
          
          const userInformation = 
          {
            Username: 'testuser',
            Email: 'test@example.com',
            Password: 'testpassword'
          };
    
          try {
            const result = User.register_user(userInformation);
            assert.ok(result); 
            assert.strictEqual(result, 1);
          } finally {
            fake_query.restore(); 
          }
        });
        });
      });
    });

    describe('User', function() {
      describe("user_login()", function() {
        
    
        it("should fail login when user not found", async function() {
        
          const queryStub = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
            
            callback(null, []); 
          });
    
          
          const username = '';
          const password = ''; 
        
          try {
            const result = await User.user_login(username, password);
            assert.strictEqual(result.success, false); 
            assert.strictEqual(result.message, "User not found"); 
          } finally {
            queryStub.restore(); 
          }
        });
      });
    });


    describe('User-Update', function() {
      describe('#updateEmail()', function() {
        it('should update the email for a user', async function() {
          const userId = 1;
          const newEmail = 'newemail@example.com';
    
          
          const queryStub = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
            // Simulate successful update
            callback(null, { insertId: userId }); 
          });
    
          try {
            const result = await User.updateEmail(userId, newEmail);
            assert.strictEqual(result, userId); 
          } finally {
            queryStub.restore(); 
          }
        });
      });
    
      
      describe('#updatePassword()', function() {
        it('should update the password for a user', async function() {
          const userId = 1;
          const newPassword = 'updatedPassword123-';
    
          
          const queryStub = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
            // Simulate successful update
            callback(null, { insertId: userId }); 
          });
    
          try {
            const result = await User.updatePassword(userId, newPassword);
            assert.strictEqual(result, userId); 
          } finally {
            queryStub.restore(); 
          }
        });
      });

      describe('#updateUsername()', function() {
        it('should update the username for a user', async function() {
          const userId = 1;
          const newUsername = 'TesterUser';
    
          
          const queryStub = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
            // Simulate successful update
            callback(null, { insertId: userId }); 
          });
    
          try {
            const result = await User.updateUsername(userId, newUsername);
            assert.strictEqual(result, userId); 
          } finally {
            queryStub.restore(); 
          }
        });
      });


    });






  });


