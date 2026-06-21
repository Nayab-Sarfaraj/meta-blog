const BASE_URL = 'http://localhost:8080';

async function testAuthLimiter() {
  console.log("=== Testing Auth Limiter (Limit: 10 req / min) ===");
  // We need to make 12 requests to /api/v1/login to trigger the 10-request limit.
  for (let i = 1; i <= 12; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "test@example.com", password: "password123" })
      });
      const data = await res.json().catch(() => null);
      console.log(`[Auth Request ${i}] Status: ${res.status} - Message: ${data?.message || 'N/A'}`);
    } catch (error) {
      console.log(`[Auth Request ${i}] Error: ${error.message}`);
    }
  }
}

async function testGlobalLimiter() {
  console.log("\n=== Testing Global Limiter (Limit: 100 req / 15 mins) ===");
  // We will make 105 requests to the root endpoint "/" which is under the global limiter.
  
  const promises = [];
  for (let i = 1; i <= 105; i++) {
    promises.push(
      fetch(`${BASE_URL}/`).then(async (res) => {
        if (res.status === 429) {
           const data = await res.json().catch(() => null);
           return `[Global Request ${i}] Status: ${res.status} - ${data?.message || 'Too many requests'}`;
        }
        return `[Global Request ${i}] Status: ${res.status}`;
      }).catch(error => {
        return `[Global Request ${i}] Error: ${error.message}`;
      })
    );
  }
  
  // Run requests concurrently to speed up the test
  const results = await Promise.all(promises);
  
  // Print some early requests and the ones around the limit to keep output clean
  results.forEach((res, index) => {
     if (index < 3 || index >= 98) {
       console.log(res);
     } else if (index === 3) {
       console.log("... [Requests 4 to 98 omitted for brevity] ...");
     }
  });
}

async function run() {
  await testAuthLimiter();
  // await testGlobalLimiter();
}

run();
