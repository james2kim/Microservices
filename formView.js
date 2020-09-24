module.exports = ({req}) => {
  
  
  
  return `
  <DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <title>URL Shortener</title>
      </head>

      <body>

          <div class="card text-center">
            <h1>URL Shortener Microservice</h1>
                <ol>
                    <li>I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
                      Example : {"original_url":"www.google.com","short_url":1}</li>  
                    <li>If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.</li>
                    <li>When I visit the shortened URL, it will redirect me to my original link</li>
                    
                </ol>
            <div class="card-body">
                <h5 class="card-title">URL To Be Shortened</h5>

                <form method="POST">
                    <input required name="url" placeholder="Enter Valid URL"/>
                    <button>Submit</button>
                </form>

            </div>
          </div>
          
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
      </body>
  
    </html>

`
}