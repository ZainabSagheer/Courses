import * as ftp from "basic-ftp";
import "dotenv/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    const host = process.env.FTP_HOST;
    const user = process.env.FTP_USER;
    const password = process.env.FTP_PASSWORD;

    if (!host || !user || !password) {
        console.error("❌ Missing FTP credentials. Set FTP_HOST, FTP_USER, FTP_PASSWORD in your .env.local file.");
        process.exit(1);
    }

    try {
        console.log("Connecting to FTP server...");
        await client.access({
            host,
            user,
            password,
            port: 21,
            secure: false
        });

        console.log("Successfully connected!");
        console.log("Uploading files from 'out' folder...");
        await client.ensureDir("/");
        await client.uploadFromDir("out");
        console.log("✅ Upload completed successfully! The website is now live.");
    } catch (err) {
        console.error("❌ FTP Deployment failed:", err.message);
    } finally {
        client.close();
    }
}

deploy();
