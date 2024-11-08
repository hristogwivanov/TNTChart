const bcrypt = require('bcryptjs');

(async () => {
    const testPassword = 'chernomore';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);

    console.log("Generated Hashed Password:", hashedPassword);

    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    console.log("Password match result:", isMatch); // Should print `true`
})();