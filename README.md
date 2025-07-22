## Order Backend
This is a Node.js backend that handles order submissions for a shopping list application, storing orders in Elasticsearch 9.0.3. It exposes a single endpoint for creating orders.

### Prerequisites

- Node.js 18+: Install from https://nodejs.org.
- Elasticsearch 9.0.3: Install from https://www.elastic.co/downloads/elasticsearch.
- Git: Install from https://git-scm.com/download/win.
- Visual Studio Code (optional): For editing and running the project.

### Installation

#### Clone the Repository:
```
git clone https://github.com/olisak78/orderbackend.git
cd orderbackend
```

#### Install Dependencies:
```
npm install
```

#### Configure Elasticsearch:

Start Elasticsearch:
```
cd C:\Users\your-username\elasticsearch-9.0.3\bin
.\elasticsearch.bat
```

Enable security in C:\Users\your-username\elasticsearch-9.0.3\config\elasticsearch.yml:
```
xpack.security.enabled: true
xpack.security.http.ssl.enabled: true
xpack.security.http.ssl.keystore.path: certs/http.p12
xpack.security.http.ssl.truststore.path: certs/http.p12
```

Set the elastic user password:
```
cd C:\Users\your-username\elasticsearch-9.0.3\bin
.\elasticsearch-setup-passwords auto
```


#### Configure Environment Variables:

Create a .env file in the project root:
```
PORT=3001
ELASTICSEARCH_URL=https://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=<your-elastic-password>
```

Replace <your-elastic-password> with the elastic password.

#### Create the orders Index:
```
curl -u elastic:<your-elastic-password> -X PUT "https://localhost:9200/orders" -H "Content-Type: application/json" -d @mappings/orders.json -k
```


### Running the Application

#### Build and Start the Backend:
```
npm run build
npm start
```

The server runs at http://localhost:3001.

#### Test the Endpoint:

Submit a test order:
```
curl -X POST http://localhost:3001/api/orders -H "Content-Type: application/json" -d "{\"fullName\":\"John Doe\",\"address\":\"123 Main St\",\"email\":\"john@example.com\",\"shoppingList\":[{\"category\":\"Fruits\",\"product\":\"Apples\",\"quantity\":2}]}"
```

Expected output: {"message":"Order created successfully"}
Verify in Elasticsearch:
```
curl -u elastic:<your-elastic-password> https://localhost:9200/orders/_search?pretty -k
```

### Project Structure

- src/index.ts: Main server file with Express and Elasticsearch client setup.
- src/controllers/orderController.ts: Logic for handling order submissions.
- mappings/orders.json: Elasticsearch index mapping for orders.
- .env: Environment variables (excluded from Git).

### Notes

- The .gitignore file excludes node_modules/, dist/, and .env.
- Use -k with curl for development to bypass self-signed certificate issues.
- For production, use a CA-signed certificate or configure the Elasticsearch client with the CA certificate.
