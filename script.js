async function deployToNetlify(siteName, files) {
const options = {
  method: 'GET',
  headers: {Authorization: 'Bearer zu4xScy3hcSK_yLyAVqu0welMZRimGmMrGTn3NqDXOk'}
};

fetch('https://api.netlify.com/api/v1/sites/', options)
  .then(response => response.json())
  .then(response => response.forEach(async (obj) => {
  if(obj.name === siteName){
    siteid=obj.id;
                const apiUrl = 'https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/deploys'; // Replace with your actual site ID

            const headers = new Headers({
                Authorization: `Bearer YOUR_API_ACCESS_TOKEN`, // Replace with your actual Netlify API token
                'Content-Type': 'application/json'
            });

            const fileHashes = {};
            for (const filename in files) {
                const content = files[filename];
                const hash = sha1(content); // Calculate SHA-1 hash
                fileHashes[`/${filename}`] = hash;
            }

            const requestBody = {
                files: fileHashes,
                functions: {}
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();

                return {
                    success: true,
                    deployId: data.id,
                    requiredFiles: data.required,
                    requiredFunctions: data.required_functions
                };
            } catch (error) {
                return {
                    success: false,
                    error: error.message
                };
            }
  }
}))
  .catch(err => console.error(err));   
        }

    