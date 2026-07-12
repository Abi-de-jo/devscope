import fs from "fs";
import path from "path";
import http from "http";
import { parse } from "url";
import dotenv from "dotenv";

// Load local environment variables from .env
dotenv.config();

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const PORT = parseInt(process.env.LINKEDIN_OAUTH_PORT || "9876", 10);
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Error: LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET is missing from .env.");
  process.exit(1);
}

// 1. Post details
const POST_COMMENTARY = `Everyone's a "10x engineer" on LinkedIn. Let's check GitHub.

We built DevScope to bring real, defensible engineering credibility to your social profiles. No vanity metrics or star counting—just real signal, automated scoring, and actual repo citations.

Check out your score, battle other developers, or rank on the local leaderboard:
👉 https://gitrating.mozen.in

#GitHub #WebDevelopment #SoftwareEngineering #NextJS #OpenSource`;

// Local images to upload (located in the public directory)
const IMAGE_FILES = [
  path.join(process.cwd(), "public", "app.png"),
  path.join(process.cwd(), "public", "og.png"),
];

// Helper to construct OAuth Authorization URL
function getAuthUrl(): string {
  // We request openid, profile, and w_member_social scopes
  const scopes = ["openid", "profile", "w_member_social"].join(" ");
  return `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&state=devscope_post_state` +
    `&scope=${encodeURIComponent(scopes)}`;
}

// Start a local HTTP server to receive the authorization code
async function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const parsedUrl = parse(req.url || "", true);
      const pathname = parsedUrl.pathname;

      if (pathname === "/callback") {
        const code = parsedUrl.query.code;
        const error = parsedUrl.query.error;
        const errorDescription = parsedUrl.query.error_description;

        if (error) {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end(`<h1>Authentication Failed</h1><p>${errorDescription || error}</p>`);
          server.close();
          reject(new Error(`OAuth error: ${errorDescription || error}`));
          return;
        }

        if (typeof code !== "string") {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end("<h1>Authentication Failed</h1><p>No code returned from LinkedIn.</p>");
          server.close();
          reject(new Error("No code parameter found in callback URL."));
          return;
        }

        // Send a success page to the browser
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <html>
            <body style="font-family: system-ui, sans-serif; text-align: center; padding: 40px; background: #0B0C0E; color: #E5E5E0;">
              <h1 style="color: #00C2D1;">Success!</h1>
              <p>Authentication complete. You can close this tab and return to the terminal.</p>
            </body>
          </html>
        `);

        server.close();

        // Exchange code for access token
        try {
          console.log("\nExchanging authorization code for access token...");
          const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code,
              redirect_uri: REDIRECT_URI,
              client_id: CLIENT_ID!,
              client_secret: CLIENT_SECRET!,
            }).toString(),
          });

          if (!tokenResponse.ok) {
            const errData = await tokenResponse.json();
            throw new Error(JSON.stringify(errData));
          }

          const tokenData = (await tokenResponse.json()) as { access_token: string };
          resolve(tokenData.access_token);
        } catch (err) {
          reject(err);
        }
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    server.listen(PORT, () => {
      const authUrl = getAuthUrl();
      console.log("\n========================================================");
      console.log("PLEASE DO THE FOLLOWING:");
      console.log("1. Make sure you registered this callback URL in your LinkedIn Developer dashboard:");
      console.log(`   ${REDIRECT_URI}`);
      console.log("2. Open the following URL in your browser to sign in & authorize:");
      console.log(`   \x1b[36m\x1b[4m${authUrl}\x1b[0m`);
      console.log("========================================================\n");
      console.log("Waiting for authentication callback...");
    });
  });
}

// Get the user's Person URN (sub ID)
async function getPersonUrn(accessToken: string): Promise<string> {
  console.log("Fetching LinkedIn profile info...");
  
  // Try Userinfo API (OIDC standard)
  try {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (response.ok) {
      const data = (await response.json()) as { sub: string; name?: string };
      console.log(`Authenticated as: ${data.name || "LinkedIn User"}`);
      return `urn:li:person:${data.sub}`;
    }
  } catch (err) {
    console.warn("Userinfo fetch failed, trying fallback to /v2/me...", err);
  }

  // Fallback to /v2/me API
  const response = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch LinkedIn profile: ${response.statusText}. Response: ${errorBody}`);
  }

  const data = (await response.json()) as { id: string; localizedFirstName?: string; localizedLastName?: string };
  console.log(`Authenticated as: ${data.localizedFirstName} ${data.localizedLastName}`);
  return `urn:li:person:${data.id}`;
}

// Upload a single image file to LinkedIn and return the image asset URN
async function uploadImage(accessToken: string, personUrn: string, filePath: string): Promise<string> {
  const fileName = path.basename(filePath);
  console.log(`Initializing upload for image: ${fileName}...`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Step 1: Initialize image upload
  const initResponse = await fetch("https://api.linkedin.com/v2/images?action=initializeUpload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initializeUploadRequest: {
        owner: personUrn,
      },
    }),
  });

  if (!initResponse.ok) {
    const errData = await initResponse.text();
    throw new Error(`Failed to initialize image upload for ${fileName}: ${errData}`);
  }

  const initData = (await initResponse.json()) as {
    value: {
      uploadUrl: string;
      image: string;
    };
  };

  const uploadUrl = initData.value.uploadUrl;
  const imageUrn = initData.value.image;

  console.log(`Uploading binary data for ${fileName} to LinkedIn...`);
  
  // Step 2: Upload raw binary content
  const fileBuffer = fs.readFileSync(filePath);
  const fileExtension = path.extname(filePath).toLowerCase();
  const contentType = fileExtension === ".jpg" || fileExtension === ".jpeg" ? "image/jpeg" : "image/png";

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": contentType,
    },
    body: fileBuffer,
  });

  if (!uploadResponse.ok) {
    const errData = await uploadResponse.text();
    throw new Error(`Failed to upload image file to LinkedIn: ${errData}`);
  }

  console.log(`Image ${fileName} uploaded successfully! Asset URN: ${imageUrn}`);
  return imageUrn;
}

// Publish the post with text and list of uploaded image URNs
async function publishPost(accessToken: string, personUrn: string, imageUrns: string[]) {
  console.log("Publishing LinkedIn post...");

  const requestBody: any = {
    author: personUrn,
    commentary: POST_COMMENTARY,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targeterParameters: [],
    },
  };

  if (imageUrns.length > 0) {
    requestBody.content = {
      multiImage: {
        images: imageUrns.map((urn) => ({ id: urn })),
      },
    };
  }

  const response = await fetch("https://api.linkedin.com/v2/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to publish LinkedIn post: ${response.status}. Response: ${errorBody}`);
  }

  const postUrn = response.headers.get("x-restli-id") || "(urn unknown)";
  console.log(`\n🎉 Success! Post published successfully to LinkedIn.`);
  console.log(`Post URN/ID: ${postUrn}`);
}

// Main execution function
async function main() {
  try {
    // 1. Get access token via OAuth
    const accessToken = await getAccessToken();
    console.log("Access token received!");

    // 2. Fetch authenticated person URN
    const personUrn = await getPersonUrn(accessToken);

    // 3. Upload all local images
    const imageUrns: string[] = [];
    for (const filePath of IMAGE_FILES) {
      const urn = await uploadImage(accessToken, personUrn, filePath);
      imageUrns.push(urn);
    }

    // 4. Publish post with images
    await publishPost(accessToken, personUrn, imageUrns);
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ An error occurred during execution:");
    console.error(error);
    process.exit(1);
  }
}

main();
