const axios = require('axios');

const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "python": 71,    
        "javascript": 63
    }
    return language[lang.toLowerCase()];
}

// ref: https://ce.judge0.com/#submissions-submission-batch-post
// ref:https://rapidapi.com/judge0-official/api/judge0-ce/playground/apiendpoint_2553301e-31a9-47e9-b8e9-82148465c885

const submitBatch = async (submissions)=>{
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false'
    },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

 return await fetchData();

}


const waiting = async(timer)=>{
  setTimeout(()=>{
    return 1;
  },timer);
}

// ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

const submitToken = async(resultToken)=>{

  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: resultToken.join(","),
      base64_encoded: 'false', // the input we send to url is in normal json form so no neeed to encode the input 
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while(true){ //make fetchData() call jab tak saake tokens ke statusid>2 nahi hotaeh ,because status_id 1,2 -> InQueue and processing , 3 -> accepted ;all other some sort of error hotah hai TLE,Null,Dividebyzero ,etc

  const result =  await fetchData();

    const IsResultObtained =  result.submissions.every((r)=>r.status_id>2); 

    if(IsResultObtained)
      return result.submissions;
    
    await waiting(1000);
  }

}


module.exports = {getLanguageById,submitBatch,submitToken};







