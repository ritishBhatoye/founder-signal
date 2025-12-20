#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-unused-vars */

const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

// Clockio Brand Colors
const COLORS = {
  primary: "#2563EB", // Blue 600
  primaryDark: "#1E40AF", // Blue 800
  secondary: "#10B981", // Emerald 500
  accent: "#A855F7", // Violet 500
  white: "#FFFFFF",
  background: "#EFF6FF", // Blue 50
};

class IconGenerator {
  constructor() {
    this.assetsDir = path.join(__dirname, "..", "assets", "images");
  }

  log(message) {
    console.log(`🎨 ${message}`);
  }

  // Draw a modern clock icon with gradient
  drawClockIcon(ctx, size, withBackground = false) {
    const center = size / 2;
    const radius = size * 0.35;

    // Background circle (if needed)
    if (withBackground) {
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, size, size);
    }

    // Outer glow
    const gradient = ctx.createRadialGradient(
      center,
      center,
      radius * 0.8,
      center,
      center,
      radius * 1.2
    );
    gradient.addColorStop(0, COLORS.primary + "40");
    gradient.addColorStop(1, COLORS.primary + "00");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, radius * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Main clock circle with gradient
    const clockGradient = ctx.createLinearGradient(
      center - radius,
      center - radius,
      center + radius,
      center + radius
    );
    clockGradient.addColorStop(0, COLORS.primary);
    clockGradient.addColorStop(1, COLORS.primaryDark);
    ctx.fillStyle = clockGradient;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();

    // Inner white circle
    ctx.fillStyle = COLORS.white;
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.85, 0, Math.PI * 2);
    ctx.fill();

    // Clock marks (12, 3, 6, 9)
    ctx.fillStyle = COLORS.primary;
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const markRadius = i % 3 === 0 ? radius * 0.12 : radius * 0.06;
      const distance = radius * 0.7;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;

      ctx.beginPath();
      ctx.arc(x, y, markRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hour hand (pointing to 10)
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = size * 0.025;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(center, center);
    const hourAngle = (300 - 90) * (Math.PI / 180); // 10 o'clock
    ctx.lineTo(
      center + Math.cos(hourAngle) * radius * 0.4,
      center + Math.sin(hourAngle) * radius * 0.4
    );
    ctx.stroke();

    // Minute hand (pointing to 2)
    ctx.strokeStyle = COLORS.secondary;
    ctx.lineWidth = size * 0.02;
    ctx.beginPath();
    ctx.moveTo(center, center);
    const minuteAngle = (60 - 90) * (Math.PI / 180); // 2 o'clock (10 minutes)
    ctx.lineTo(
      center + Math.cos(minuteAngle) * radius * 0.6,
      center + Math.sin(minuteAngle) * radius * 0.6
    );
    ctx.stroke();

    // Center dot
    const centerGradient = ctx.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      radius * 0.1
    );
    centerGradient.addColorStop(0, COLORS.accent);
    centerGradient.addColorStop(1, COLORS.primary);
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = size * 0.02;
    ctx.shadowOffsetY = size * 0.01;
  }

  // Generate main app icon (1024x1024)
  generateMainIcon() {
    this.log("Generating main app icon (1024x1024)...");
    const size = 1024;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    this.drawClockIcon(ctx, size, true);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(this.assetsDir, "icon.png"), buffer);
    this.log("✅ Main icon generated");
  }

  // Generate Android adaptive icon foreground (1024x1024)
  generateAndroidForeground() {
    this.log("Generating Android foreground icon...");
    const size = 1024;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Transparent background
    ctx.clearRect(0, 0, size, size);
    this.drawClockIcon(ctx, size, false);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(
      path.join(this.assetsDir, "android-icon-foreground.png"),
      buffer
    );
    this.log("✅ Android foreground generated");
  }

  // Generate Android adaptive icon background (1024x1024)
  generateAndroidBackground() {
    this.log("Generating Android background icon...");
    const size = 1024;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, COLORS.background);
    gradient.addColorStop(1, "#DBEAFE"); // Blue 100
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(
      path.join(this.assetsDir, "android-icon-background.png"),
      buffer
    );
    this.log("✅ Android background generated");
  }

  // Generate Android monochrome icon (1024x1024)
  generateAndroidMonochrome() {
    this.log("Generating Android monochrome icon...");
    const size = 1024;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    const center = size / 2;
    const radius = size * 0.35;

    // Transparent background
    ctx.clearRect(0, 0, size, size);

    // White clock outline
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = size * 0.04;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Clock marks
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const markRadius = i % 3 === 0 ? radius * 0.1 : radius * 0.05;
      const distance = radius * 0.75;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;

      ctx.beginPath();
      ctx.arc(x, y, markRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hands
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = size * 0.025;
    ctx.lineCap = "round";

    // Hour hand
    ctx.beginPath();
    ctx.moveTo(center, center);
    const hourAngle = (300 - 90) * (Math.PI / 180);
    ctx.lineTo(
      center + Math.cos(hourAngle) * radius * 0.4,
      center + Math.sin(hourAngle) * radius * 0.4
    );
    ctx.stroke();

    // Minute hand
    ctx.beginPath();
    ctx.moveTo(center, center);
    const minuteAngle = (60 - 90) * (Math.PI / 180);
    ctx.lineTo(
      center + Math.cos(minuteAngle) * radius * 0.6,
      center + Math.sin(minuteAngle) * radius * 0.6
    );
    ctx.stroke();

    // Center dot
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.08, 0, Math.PI * 2);
    ctx.fill();

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(
      path.join(this.assetsDir, "android-icon-monochrome.png"),
      buffer
    );
    this.log("✅ Android monochrome generated");
  }

  // Generate favicon (48x48)
  generateFavicon() {
    this.log("Generating favicon...");
    const size = 48;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    this.drawClockIcon(ctx, size, true);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(this.assetsDir, "favicon.png"), buffer);
    this.log("✅ Favicon generated");
  }

  // Generate splash icon (200x200)
  generateSplashIcon() {
    this.log("Generating splash icon...");
    const size = 400;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Transparent background
    ctx.clearRect(0, 0, size, size);
    this.drawClockIcon(ctx, size, false);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(this.assetsDir, "splash-icon.png"), buffer);
    this.log("✅ Splash icon generated");
  }

  async generate() {
    try {
      this.log("🚀 Starting Clockio icon generation...\n");

      // Ensure assets directory exists
      if (!fs.existsSync(this.assetsDir)) {
        fs.mkdirSync(this.assetsDir, { recursive: true });
      }

      this.generateMainIcon();
      this.generateAndroidForeground();
      this.generateAndroidBackground();
      this.generateAndroidMonochrome();
      this.generateFavicon();
      this.generateSplashIcon();

      this.log("\n🎉 All icons generated successfully!");
      this.log("📁 Icons saved to: assets/images/");
    } catch (error) {
      console.error("❌ Error generating icons:", error.message);
      process.exit(1);
    }
  }
}

// Check if canvas is installed
try {
  require.resolve("canvas");
} catch (e) {
  console.log("📦 Installing canvas package...");
  require("child_process").execSync("npm install canvas", { stdio: "inherit" });
}

// Run generator
const generator = new IconGenerator();
generator.generate();
