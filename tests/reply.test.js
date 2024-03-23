const assert = require('assert');
const sinon = require('sinon');
const DB = require('../Model/db.js');
const Reply = require('../Model/Reply.js');

describe("Reply", function()
{


    describe("replyToUser()", function()
    {
        it("Should reply to user by inserting into the db", async function()
        {
            const fakeReply = {
                Message: "Test reply",
                dicussionId: 1,
                Username: "TestUser"
            };

            const fake_query = sinon.stub(DB, 'query').callsFake((SQL, VALUES, callback) => {
                // Simulate successful posting
                callback(null, { insertId: 1 }); //acts a recipt 
              });


              try {
                const result = await Reply.replyToUser(fakeReply);
                assert.strictEqual(result, 1); 
              } finally {
                fake_query.restore();
              }
        });
    });


    describe("getReply()", function() {
        it("should get replies for a given discussion ID", async function() {
          const discussionId = 1;
    
         
          const fake_query = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
            // Simulate successful retrieval
            const mockValues = [
              { Username: 'user1', message: 'Reply 1' },
              { Username: 'user2', message: 'Reply 2' }
            ];
            callback(null, mockValues);
          });
    
          try {
            const result = await Reply.getReply(discussionId);
            assert.strictEqual(result.length, 2); 
            assert.strictEqual(result[0].Username, 'user1'); 
            assert.strictEqual(result[1].Username, 'user2');
          } finally {
            fake_query.restore(); 
          }
        });
      });


});