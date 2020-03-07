const fetchy = async (path, config = {}) => {
    let options = { ...config }
    let isFile = options.body instanceof File
  
    if (options.body && typeof options.body === 'object' && !isFile) {
      options.body = JSON.stringify(options.body)
    }
  
  let response = null
  
    try {
      response = await fetch(path, options)
      if (response.status === 401) {
        // Handle unauthorized requests
      }
  
      if (response.status < 200 || response.status >= 300) {
        // Get response as text
        return await response.text()
      }
      let data = await response.json()
  
      return data
    } catch (error) {
      // If data exists it means HTTP error occured
      if (response) {
        throw new Error(`Request failed with status ${data}`)
      } else {
        throw new Error('Custom Error:', error.toString())
      }
    }
  }
  
  export default fetchy