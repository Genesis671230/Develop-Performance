var axios = require('axios')

const BASE_URL = 'http://localhost:4000'
// const BASE_URL = 'https://performance-manager-a.herokuapp.com/'; //heroku
// const BASE_URL = 'https://6jwexj3zqs.us-east-1.awsapprunner.com/'; //aws

const ENDPOINTS = {
  SIGNUP: '/organization/signup',
  SIGNIN: '/signin',
  USER_NAME_AVAILABILITY: '/user/username-availability',
  EMAIL_AVAILABILITY: '/staff/email-availability',
  ORGANIZATION: '/organization',
  DEPARTMENT: '/department',
  EDIT_DEPARTMENT: (id) => `/department/${id}`,
  DELETE_DEPARTMENT: (id) => `/department/${id}`,
  GOAL: '/goal',
  EDIT_GOAL: (id) => `/goal/${id}`,
  DELETE_GOAL: (id) => `/goal/${id}`,
  REPORT: '/report',
  EDIT_REPORT: (id) => `/report/${id}`,
  DELETE_REPORT: (id) => `/report/${id}`,
  SCORE: '/score-card',
  EDIT_SCORE: (id) => `/score-card/${id}`,
  DELETE_SCORE: (id) => `/score-card/${id}`,
  TASK: '/task',
  EDIT_TASK: (id) => `/task/${id}`,
  DELETE_TASK: (id) => `/task/${id}`,
  UNIT: '/unit',
  EDIT_UNIT: (id) => `/unit/${id}`,
  DELETE_UNIT: (id) => `/unit/${id}`,
  STAFF: '/staff',
  SBU: '/sbu',
  EDIT_SBU: (id) => `/sbu/${id}`,
  DELETE_SBU: (id) => `/sbu/${id}`,
  REPORTTYPES: '/report_types',
  EDIT_REPORTTYPES: (id) => `/report_types/${id}`,
  DELETE_REPORTTYPES: (id) => `/report_types/${id}`,
  EDIT_STAFF: (id) => `/staff/${id}`,
  DELETE_STAFF: (id) => `/staff/${id}`,
  STAFF_AVAILABILITY: '/staff/email-availability',
  USER: '/user',
  DELETE_USER: (id) => `/user/${id}`,
  USER_ROLE: '/user-role',
  EDIT_USER_ROLE: (id) => `/user-role/${id}`,
  DELETE_USER_ROLE: (id) => `/user-role/${id}`,
  MONTHLY_REPORT: `/score-card/monthly-cumulative-report`,
}

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      // Request made and server responded
      console.log('Response error = ', error.response)
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request error = ', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Unknown Error', error.message)
    }

    return Promise.reject(error)
  },
)

//User or Organisation signup or registration
export const signup = async (organization) => {
  const newUser = await client.post(ENDPOINTS.SIGNUP, organization)
  return newUser
}

//User or Organisation signin
export const signin = async (user) => {
  const token = await client.post(ENDPOINTS.SIGNIN, user)
  return token
}
export const organization = async (token) => {
  const org = await client.get(ENDPOINTS.ORGANIZATION, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return org
}

export const department = async (department, token) => {
  const newDepartment = await client.post(ENDPOINTS.DEPARTMENT, department, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newDepartment
}

export const getDepartment = async (token) => {
  const dep = await client.get(ENDPOINTS.DEPARTMENT, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}
export const ediDepartment = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_DEPARTMENT(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}
export const deleteDepartment = async (token, id) => {
  const dep = await client.delete(ENDPOINTS.DELETE_DEPARTMENT(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const goal = async (goal, token) => {
  const newGoal = await client.post(ENDPOINTS.GOAL, goal, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newGoal
}

export const getGoal = async (token) => {
  const goal = await client.get(ENDPOINTS.GOAL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return goal
}

export const editGoal = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_GOAL(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const deleteGoal = async (token, id) => {
  const goal = await client.delete(ENDPOINTS.DELETE_GOAL(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return goal
}

export const setReport = async (report, token) => {
  const newReport = await client.post(ENDPOINTS.REPORT, report, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newReport
}

export const getReport = async (token) => {
  const report = await client.get(ENDPOINTS.REPORT, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return report
}

export const editReport = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_REPORT(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const deleteReport = async (token, id) => {
  const report = await client.delete(ENDPOINTS.DELETE_REPORT(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return report
}

export const setScore = async (score, token) => {
  const newScore = await client.post(ENDPOINTS.SCORE, score, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newScore
}
export const getScore = async (token) => {
  const score = await client.get(ENDPOINTS.SCORE, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return score
}

export const editScore = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_SCORE(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const deleteScore = async (token, id) => {
  const score = await client.delete(ENDPOINTS.DELETE_SCORE(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return score
}

export const setTask = async (task, token) => {
  const newTask = await client.post(ENDPOINTS.TASK, task, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newTask
}

export const getTask = async (token) => {
  const task = await client.get(ENDPOINTS.TASK, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return task
}

export const editTask = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_TASK(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const deleteTask = async (token, id) => {
  const task = await client.delete(ENDPOINTS.DELETE_TASK(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return task
}

export const setUnit = async (unit, token) => {
  const newUnit = await client.post(ENDPOINTS.UNIT, unit, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newUnit
}
export const getUnit = async (token) => {
  const unit = await client.get(ENDPOINTS.UNIT, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return unit
}

export const editUnit = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_UNIT(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const deleteUnit = async (token, id) => {
  const unit = await client.delete(ENDPOINTS.DELETE_UNIT(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return unit
}



export const setSbu = async (sbu, token) => {
  const newSbu = await client.post(ENDPOINTS.SBU, sbu, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newSbu
}
export const getSbu = async (token) => {
  const sbu = await client.get(ENDPOINTS.SBU, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return sbu
}

export const editSbu = async (id, user, token) => {
  const sbu = await client.put(ENDPOINTS.EDIT_SBU(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return sbu
}

export const deletesbu = async (token, id) => {
  const sbu = await client.delete(ENDPOINTS.DELETE_SBU(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return sbu
}
export const setReportTypes = async (rt, token) => {
  const newSbu = await client.post(ENDPOINTS.REPORTTYPES, rt, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newSbu
}
export const getReportTypes = async (token) => {
  const sbu = await client.get(ENDPOINTS.REPORTTYPES, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return sbu
}

export const editReportTypes = async (id, user, token) => {
  const sbu = await client.put(ENDPOINTS.EDIT_REPORTTYPES(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return sbu
}

export const deleteReportTypes = async (token, id) => {
  const sbu = await client.delete(ENDPOINTS.DELETE_REPORTTYPES(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return sbu
}




export const setStaff = async (staff, token) => {
  const newStaff = await client.post(ENDPOINTS.STAFF, staff, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newStaff
}
export const getStaff = async (token) => {
  const staff = await client.get(ENDPOINTS.STAFF, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return staff
}

export const editStaff = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_STAFF(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const staffAVL = async (email) => {
  const check = await client.post(ENDPOINTS.STAFF_AVAILABILITY, {
    email: email,
  })
  return check
}

export const deleteStaff = async (token, id) => {
  const staff = await client.delete(ENDPOINTS.DELETE_STAFF(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return staff
}

export const setUserRole = async (userRole, token) => {
  const newUserRole = await client.post(ENDPOINTS.USER_ROLE, userRole, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return newUserRole
}
export const getUserRole = async (token) => {
  const userRole = await client.get(ENDPOINTS.USER_ROLE, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return userRole
}

export const editUserRole = async (id, user, token) => {
  const dep = await client.put(ENDPOINTS.EDIT_USER_ROLE(id), user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return dep
}

export const deleteUserRole = async (token, id) => {
  const userRole = await client.delete(ENDPOINTS.DELETE_USER_ROLE(id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return userRole
}


export const getMonthlyReport = async (token) => {
  const monthlyReport = await client.get(ENDPOINTS.MONTHLY_REPORT, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return monthlyReport
}


export const CONTACT_API_URL =
   'https://b9u20w7dcl.execute-api.us-east-1.amazonaws.com/dev/contact';
   
// const uploadTermAndConditionFile = async (collectionId, TermsFileURL) => {
//   // console.log('id: ', collectionId);
//   // console.log('body ', TermsFileURL);
//   // console.log('URL ', `${ENDPOINTS.UPDATE_COLLECTION + collectionId}`);

//   const response = await client.put(
//     `${ENDPOINTS.UPDATE_COLLECTION + collectionId}`,
//     TermsFileURL
//   );
//   return response;
// };

// /*
//  * creates a fancurve tier including cedar tier
//  * */
// const fcCreateTier = async (cedarTier, fcCollectionId) => {
//   let fancurveTier = {
//     fcCollectionId: fcCollectionId,
//     cedarTierId: cedarTier.id,
//     ...cedarTier,
//   };
//   try {
//     const response = await client.post(ENDPOINTS.CREATE_TIER, fancurveTier);
//     return response;
//   }
//   catch(e) {
//     console.log('err = ', e)
//     console.log('Retrying...')
//     await sleep(10000)
//     return fcCreateTier(cedarTier, fcCollectionId)
//   }
// };

// /*
//  * creates a fancurve upload url to upload images
//  * */
// async function fcUploadURL (tierId, index, filename) {
//   try {
//     const response = await client.post(ENDPOINTS.UPLOAD_TOKEN_IMAGE(tierId, index), {extension: filename&&filename.split('.')[1]});
//     return response;
//   }
//   catch(e) {
//     console.log('err = ', e)
//     console.log('Retrying...')
//     await sleep(10000)
//     return await fcUploadURL(tierId, index, filename)
//   }
// };

// const updateFancurveTokenImage = async (fcTierId, pathToFile, fileName, index) => {
//   try {
//     console.log('updateFancurveTokenImage = ', fcTierId, pathToFile, fileName, index)
//     const response = await fcUploadURL(fcTierId, index, fileName)
//     // console.log('resp = ', response)
//     if(response && response.data) {
//       console.log('response.URL, pathToFile, fileName = ', response.data.URL, pathToFile, fileName)
//       // const filePath = response.fileName;
//       // const URL = response.URL
//       const resp = await fcUploadTokenImage(response.data.URL, pathToFile, fileName);
//       console.log('fcUploadTokenImage = ', resp.status);
//       const respSave = await saveImageInFC(fcTierId, index, response.data.fileName);
//       return respSave;
//     }
//   } catch (err) {
//     console.log('Catch error: ', err);
//     // addToLogs(`Error Catch (updateFancurveTokenImage) =  ${err}`);
//     await sleep(10000);
//     return await updateFancurveTokenImage(fcTierId, pathToFile, fileName, index);
//   }
// }

// /*
//  * upload image to fancurve
//  * */
// // export const uploadImage = async (url, imageData) => {
// //   try {
// //     const response = await axios.put(url,imageData, {
// //       headers: {
// //         'x-ms-blob-type': 'BlockBlob'
// //       }
// //     });
// //     return response;
// //   }
// //   catch(e) {
// //     console.log('Retrying uploadImage ... e = ')
// //     await sleep(10000)
// //     return uploadImage(url, imageData)
// //   }
// // };

// /*
//  * creates a fancurve token  including cedar token
//  * */
// const fcCreateToken = async (cedarToken, fcCollectionId, fcTierId) => {
//   let fancurveToken = {
//     cedarTokenId: cedarToken.id,
//     cedarCollectionId: cedarToken.collectionId,
//     fcTierId: fcTierId,
//     fcCollectionId: fcCollectionId,
//     extension: 'png',
//     ...cedarToken,
//   };
//   const response = await client.post(ENDPOINTS.CREATE_TOKEN, fancurveToken);
//   return response;
// };

// /*
//  * save fancurve image
//  * */
// const saveImageInFC = async (tierId, index, filePath) => {
//   try {
//     const response = await client.put(ENDPOINTS.SAVE_TOKEN_IMAGE(tierId, index), {
//       imagePath: filePath
//     });
//     return response;
//   }
//   catch (e) {
//     await sleep(10000)
//     console.log('Err (saveImageInFC) = ', e)
//     return await saveImageInFC(tierId, index, filePath);
//   }
// };

// /*
//  * Add token attributes in fc DB
//  * */
// const fcAddTokenAttributes = async (cedarTokenId, attributes) => {
//   const response = await client.put(
//     `/tokens/${cedarTokenId}/attributes`,
//     attributes
//   );
//   return response;
// };

// /*
//  *  upload token image at azure blobs
//  **/

// const fcUploadTokenImage = async (URL, pathToFile, fileName) => {
//   try {
//     // const fileParts = fileName.split('.');
//     // const containerName = 'token';
//     // const dbFileName = `${containerName}/${
//     //   fileParts[0]
//     // }/${new Date().getTime()}.${fileParts[1]}`;
//     // const azureFilePath = `${fileParts[0]}/${new Date().getTime()}.${
//     //   fileParts[1]
//     // }`;
//     // //Get signed URL to upload token image at azure storage
//     // const URL = getSignedURL(containerName, azureFilePath).toString();
//     // console.log('Image upload URL: ', URL);
//     //Read token image form local directory and upload at azure
//     const mainImageData = await fs.readFileSync(pathToFile);
//     console.log('reading file = ', pathToFile)
//     var config = {
//       method: 'put',
//       url: URL,
//       headers: {
//         'x-ms-blob-type': 'BlockBlob',
//         'Content-Type': 'image/png',
//       },
//       data: mainImageData,
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     };
//     const imageResponse = await axios(config);
//     console.log('Uploaded image at blob: ', imageResponse.data);
//     //Update image Path in FC-DB
//     // const response = await client.put(`/tokens/${TOKEN_ID}/image`, {
//     //   image: dbFileName,
//     // });
//     // // console.log('image upload at fc: ', response.data);
//     return imageResponse;
//   } catch (err) {
//     console.log('catch error: ', err);
//     process.exit(1);
//     return await fcUploadTokenImage(pathToFile, fileName)
//   }
// };

// module.exports = {
//   fcCreateCollection,
//   uploadTermAndConditionFile,
//   fcCreateTier,
//   fcCreateToken,
//   fcAddTokenAttributes,
//   fcUploadTokenImage,
//   updateFancurveTokenImage
// };
