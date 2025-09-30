const fs = require('fs');
const path = require('path');

// Build ESM version
const distDir = path.join(__dirname, '../dist');
const esmDir = path.join(distDir, 'esm');

// Copy CommonJS files to ESM directory and rename to .mjs
function convertToESM() {
    if (!fs.existsSync(esmDir)) {
        fs.mkdirSync(esmDir, { recursive: true });
    }

    // Copy and rename .js files to .mjs
    const files = fs.readdirSync(distDir);
    files.forEach(file => {
        if (file.endsWith('.js') && !file.includes('cli')) {
            const srcPath = path.join(distDir, file);
            const destPath = path.join(distDir, file.replace('.js', '.mjs'));

            let content = fs.readFileSync(srcPath, 'utf8');

            // Convert CommonJS exports to ESM
            content = content.replace(/exports\./g, 'export ');
            content = content.replace(/module\.exports\s*=\s*/g, 'export default ');
            content = content.replace(/require\(['"]([^'"]+)['"]\)/g, "import $1 from '$1'");

            fs.writeFileSync(destPath, content);
        }
    });

    // Create package.json for ESM
    const esmPackageJson = {
        "type": "module"
    };
    fs.writeFileSync(path.join(esmDir, 'package.json'), JSON.stringify(esmPackageJson, null, 2));

    console.log('ESM build completed');
}

convertToESM();