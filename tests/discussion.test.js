const DB = require('../Model/db.js');
const Discussions = require('../Model/Discussions.js');
const assert = require('assert');
const sinon = require('sinon');


describe('Discussions', function() 
{

    describe("#postDiscussion()", function()
    {
        it("Should post a discussion to the database successfully", async function() 
        {
            const postData = 
            {
                Title: "Test",
                Description: "This is a test",
                ModelType: "A4"
            };

            const UserId = 1;

            const fake_query = sinon.stub(DB, 'query').callsFake((SQL, VALUES, callback) => {
                // Simulate successful posting
                callback(null, { insertId: 1 }); //acts a recipt 
              });

              try {
                const result = await Discussions.postDiscussionToDatabase(postData, UserId);
                assert.strictEqual(result, 1);
              } finally {
                fake_query.restore(); 
              }
        });
    });

    describe("#getAllDiscussions()", function() 
    {
        it("This should result in getting all the discussions for that given model", async function()
        {
            const model = "A7"; // this defined here as its both the parameter for the function and the value in the simulated db

            const fake_query = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
                // Simulate successful retrieval
                const mockValues = [
                  { DiscussionId: 1, UserId: 1, Username: 'user1', Title: 'Discussion 1', Description: 'Description 1', model },
                  { DiscussionId: 2, UserId: 2, Username: 'user2', Title: 'Discussion 2', Description: 'Description 2', model }
                ];
                callback(null, mockValues);
              });
              try {
                const result = await Discussions.getAllDiscussions(model);
                assert.strictEqual(result.length, 2); 
                assert.strictEqual(result[0].DiscussionId, 1); 
                assert.strictEqual(result[1].DiscussionId, 2); 
              } finally {
                fake_query.restore(); 
              }
        });
    });


    describe("#deletePostById()", function() {
        it("should delete a post by its ID", async function() {
          const postId = 1;
      
          
          const fakeQuery = sinon.stub(DB, 'query').callsFake((sql, values, callback) => {
            // Simulate successful deletion
            callback(null, { deletedRow: 1 }); 
          });
      
          try {
            const result = await Discussions.deletePostById(postId);
            assert.strictEqual(result.deletedRow, 1); 
          } finally {
            fakeQuery.restore(); 
          }
        });
      });

});