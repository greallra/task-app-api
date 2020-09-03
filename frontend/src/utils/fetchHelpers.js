export const createFetchOptionsObject =  (method, mode, contentType, data)=>({
        method, // *GET, POST, PUT, DELETE, etc.
        mode,
        headers: {
          'Content-Type': contentType
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
})

export const createAuthHeader = (token)=>(
  {
      headers: {
      "Authorization" : `Bearer ${token}` //have to alllow this on server
      }
  }

)

