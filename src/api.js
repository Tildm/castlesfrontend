const APIURL = "/castles/";

export async function getCastles() {
  return fetch(APIURL)
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }

  return resp.json();
  })
}


export async function createCastle(name, image, text){
  return fetch(APIURL, {method:"post",
                 headers: new Headers({
                   "Content-Type": "application/json",
                 }),
                 body: JSON.stringify({name: name, image: image, text: text})
  })
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }
  return resp.json();
  })
}


export async function removeCastle(id){
  const deleteUrl = APIURL + id;
  fetch(deleteUrl, {
    method:"delete",
  })
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }
  return resp.json();
  })
}


export async function updateCastle(castle){
  const updateUrl = APIURL + castle._id;
  return fetch(updateUrl, {
    method:"put",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({completed: !castle.completed}),
  })
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }
  return resp.json();
  })
}
