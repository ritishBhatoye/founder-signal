#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

class AndroidBuilder {
  constructor() {
    this.projectRoot = path.resolve(__dirname, "..");
    this.androidDir = path.join(this.projectRoot, "android");
    this.keystorePath = path.join(this.androidDir, "app", "clockio-release-key.keystore");
    this.gradlePropsPath = path.join(this.androidDir, "gradle.properties");
    this.buildGradlePath = path.join(this.androidDir, "app", "build.gradle");
  }

  log(message, type = "info") {
    const timestamp = new Date().toISOString();
    const prefix = type === "error" ? "❌" : type === "success" ? "✅" : "ℹ️";
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  executeCommand(command, description, cwd = this.projectRoot) {
    this.log(`${description}...`);
    try {
      const result = execSync(command, {
        cwd,
        stdio: "inherit",
        env: { ...process.env, NODE_ENV: "production" },
      });
      this.log(`${description} completed successfully`, "success");
      return result;
    } catch (error) {
      this.log(`${description} failed: ${error.message}`, "error");
      throw error;
    }
  }

  checkPrerequisites() {
    this.log("Checking prerequisites..."); // Check if project root exists

    if (!fs.existsSync(this.projectRoot)) {
      throw new Error("Project root directory not found");
    } // Check if package.json exists

    const packageJsonPath = path.join(this.projectRoot, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error("package.json not found");
    }

    this.log("Prerequisites check passed", "success");
  }

  cleanPreviousBuild() {
    this.log("Cleaning previous build..."); // Remove android directory if it exists

    if (fs.existsSync(this.androidDir)) {
      this.executeCommand("rm -rf android", "Removing existing android directory");
    }

    this.log("Clean completed", "success");
  }

  runExpoDoctor() {
    this.log("Running Expo doctor...");
    this.executeCommand("npx expo-doctor", "Running expo-doctor to check project health");
  }

  updateExpoPackages() {
    this.log("Checking and updating Expo packages...");
    this.executeCommand(
      "npx expo install --check",
      "Checking and updating Expo packages for compatibility",
    );
  }

  runPrebuild() {
    this.log("Running Expo prebuild...");
    this.executeCommand(
      "npx expo prebuild --platform android --clean",
      "Running expo prebuild for Android",
    );
  }

  configureKeystoreIfNeeded() {
    this.log("Checking keystore configuration..."); // Check if keystore exists

    if (!fs.existsSync(this.keystorePath)) {
      this.log("Keystore not found. Creating keystore...", "info"); // Create keystore directory if it doesn't exist

      const keystoreDir = path.dirname(this.keystorePath);
      if (!fs.existsSync(keystoreDir)) {
        fs.mkdirSync(keystoreDir, { recursive: true });
      } // Generate keystore

      const keystoreCommand = `keytool -genkey -v -keystore ${this.keystorePath} -alias clockio-key-alias -keyalg RSA -keysize 2048 -validity 10000 -storepass clockio123 -keypass clockio123 -dname "CN=Clockio, OU=Development, O=Clockio, L=City, ST=State, C=US"`;

      this.executeCommand(keystoreCommand, "Generating release keystore", this.androidDir);
    }

    this.configureGradleProperties();
    this.configureBuildGradle();
  }

  configureGradleProperties() {
    this.log("Configuring gradle.properties...");

    const gradleConfig = `
# Release signing configuration
CLOCKIO_UPLOAD_STORE_FILE=clockio-release-key.keystore
CLOCKIO_UPLOAD_KEY_ALIAS=clockio-key-alias
CLOCKIO_UPLOAD_STORE_PASSWORD=clockio123
CLOCKIO_UPLOAD_KEY_PASSWORD=clockio123`; // Read existing gradle.properties

    let gradleProps = "";
    if (fs.existsSync(this.gradlePropsPath)) {
      gradleProps = fs.readFileSync(this.gradlePropsPath, "utf8");
    } // Check if our config is already there

    if (!gradleProps.includes("CLOCKIO_UPLOAD_STORE_FILE")) {
      gradleProps += gradleConfig;
      fs.writeFileSync(this.gradlePropsPath, gradleProps);
      this.log("Updated gradle.properties with signing configuration", "success");
    } else {
      this.log("gradle.properties already configured", "success");
    }
  }

  configureBuildGradle() {
    this.log("Configuring build.gradle...");

    if (!fs.existsSync(this.buildGradlePath)) {
      this.log("build.gradle not found, skipping configuration", "error");
      return;
    }

    let buildGradle = fs.readFileSync(this.buildGradlePath, "utf8"); // Add release signing config if not present

    const releaseSigningConfig = `        release {
           if (project.hasProperty('CLOCKIO_UPLOAD_STORE_FILE')) {
               storeFile file(CLOCKIO_UPLOAD_STORE_FILE)
               storePassword CLOCKIO_UPLOAD_STORE_PASSWORD
               keyAlias CLOCKIO_UPLOAD_KEY_ALIAS
               keyPassword CLOCKIO_UPLOAD_KEY_PASSWORD
           }
       }`;

    if (!buildGradle.includes("CLOCKIO_UPLOAD_STORE_FILE")) {
      // Find signingConfigs section and add release config
      if (buildGradle.includes("signingConfigs {")) {
        buildGradle = buildGradle.replace(
          /(signingConfigs\s*\{[^}]*debug\s*\{[^}]*\})/,
          `$1\n${releaseSigningConfig}`,
        );
      } // Update release buildType to use release signing

      buildGradle = buildGradle.replace(
        /(release\s*\{[^}]*)(signingConfig\s+signingConfigs\.debug)/,
        "$1signingConfig signingConfigs.release",
      ); // If no signingConfig line exists in release, add it

      if (!buildGradle.match(/release\s*\{[^}]*signingConfig/)) {
        buildGradle = buildGradle.replace(
          /(release\s*\{)/,
          "$1\n            signingConfig signingConfigs.release",
        );
      }

      fs.writeFileSync(this.buildGradlePath, buildGradle);
      this.log("Updated build.gradle with signing configuration", "success");
    } else {
      this.log("build.gradle already configured", "success");
    }
  }

  buildRelease() {
    this.log("Building Android release..."); // Change to android directory and run gradle build

    this.executeCommand(
      "NODE_ENV=production ./gradlew assembleRelease --parallel --max-workers=4",
      "Building release APK",
      this.androidDir,
    ); // Check if APK was generated

    const apkPath = path.join(
      this.androidDir,
      "app",
      "build",
      "outputs",
      "apk",
      "release",
      "app-release.apk",
    );
    if (fs.existsSync(apkPath)) {
      this.log(`Release APK generated successfully at: ${apkPath}`, "success"); // Get file size

      const stats = fs.statSync(apkPath);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      this.log(`APK size: ${fileSizeInMB} MB`, "info");
    } else {
      throw new Error("Release APK was not generated");
    }
  }

  async run() {
    try {
      this.log("🚀 Starting Android release build process...");

      this.checkPrerequisites();
      this.cleanPreviousBuild();
      this.runExpoDoctor();
      this.updateExpoPackages();
      this.runPrebuild();
      this.configureKeystoreIfNeeded();
      this.buildRelease();

      this.log("🎉 Android release build completed successfully!", "success");
      this.log("Your APK is ready for distribution.", "success");
    } catch (error) {
      this.log(`Build failed: ${error.message}`, "error");
      process.exit(1);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const showHelp = args.includes("--help") || args.includes("-h");

if (showHelp) {
  console.log(`
🔨 Android Release Builder

Usage: node build-android-release.js [options]

Options:
--help, -h      Show this help message

This script will:
1. Clean previous build
2. Run expo-doctor to check project health
3. Update Expo packages for compatibility
4. Run expo prebuild --platform android --clean
5. Configure keystore and signing (auto-generate if needed)
6. Build release APK

Output: android/app/build/outputs/apk/release/app-release.apk
`);
  process.exit(0);
}

// Run the builder
const builder = new AndroidBuilder();
builder.run();
