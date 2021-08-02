const mongoose = require("mongoose");

const db = require("./models");

const createTutorial = function(tutorial){
    return db.Tutorial
    .create(tutorial)
    .then(docTutorial => {
        console.log("\n>> Create Tutorial: \n", docTutorial);
        return docTutorial;
    });
};

const createImage = function(tutorialId, Image) {
    return db.Image.create(Image).then(docImage => {
      console.log("\n>> Created Image:\n", docImage);
      return db.Tutorial.findByIdAndUpdate(
        tutorialId,
        {
          $push: {
            images: {
              _id: docImage._id,
              url: Image.url,
              caption: Image.caption
            }
          }
        },
        { 
          new: true, 
          useFindAndModify: false
        }
    );
    })
    
}

const createComment = function(tutorialId, comment){
  return db.Comment
          .create(comment)
          .then(docComment => {
                console.log("\n>> Created Comment:\n", docComment);

                return db.Tutorial.findByIdAndUpdate(
                  tutorialId,
                  {$push: {comments: docComment._id}},
                  {new: true, useFindAndModify: false}
                  );
  });
};

const getTutorialWithPopulate = function(id){
  return db.Tutorial.findById(id).populate("comments");
};

const run = async function() {
    var tutorial = await createTutorial({
      title: "Tutorial #1",
      author: "richard fp"
    });
  
    tutorial = await createImage(tutorial._id, {
      path: "sites/uploads/images/mongotest.jpg",
      url: "/images/mongotest.jpg",
      caption: "MongoDB Database",
      createdAt: Date.now()
    });
    console.log("\n>> Tutorial:\n", tutorial);
  
    tutorial = await createImage(tutorial._id, {
      path: "sites/uploads/images/one-to-many.JPG",
      url: "/images/one-to-many.JPG",
      caption: "One to Many Relationship",
      createdAt: Date.now()
    });
    console.log("\n>> Tutorial:\n", tutorial);
    tutorial = await createComment(tutorial._id, {
      username: "jack",
      text: "this is a great tutorial",
      createdAt: Date.now()
    });

    console.log("\n>> Tutorial:\n", tutorial);

    tutorial = await createComment(tutorial._id, {
      username: "bill jack",
      text: "Thank you, it helps me alot.",
      createdAt: Date.now()
    });

    console.log("\n>> Tutorial:\n", tutorial);

    tutorial = await getTutorialWithPopulate(tutorial._id);
    console.log("\n>> populate Tutorial\n", tutorial);

  };


mongoose
    .connect("mongodb://localhost/opencrud", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("successfully connect to mongoDB. "))
    .catch(err => console.error("Connection error ", err));

run();

