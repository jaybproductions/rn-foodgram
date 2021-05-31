import firebase from "../firebase";

export async function getRecipes() {
  try {
    let tempDoc = [];
    await firebase.db
      .collection("recipes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          tempDoc.push(doc.data());
        });
        //setRecipes(tempDoc);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return tempDoc;
    //setRecipes(response.data);
  } catch (err) {
    console.error(err);
  }
}

export async function handleLike(recipe, user) {
  const docRef = firebase.db.collection("recipes").doc(recipe.id);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        let tempLikes = [...doc.data().likedBy];
        if (tempLikes.includes(user.uid)) {
          //setLiked(false);
          const filtered = tempLikes.filter((item) => item !== user.uid);
          firebase.db.collection("recipes").doc(recipe.id).update(
            {
              likedBy: filtered,
            },
            { merge: true }
          );
          return;
        }
        //setLiked(true);
        tempLikes.push(user.uid);
        firebase.db.collection("recipes").doc(recipe.id).update(
          {
            likedBy: tempLikes,
          },
          { merge: true }
        );
        return;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

export function handleCheckLikes(recipe, user) {
  recipe.likedBy.forEach((like) => {
    if (like === user.uid) {
      return true;
    } else {
      return false;
    }
  });
}
