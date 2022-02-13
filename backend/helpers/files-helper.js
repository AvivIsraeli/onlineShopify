const fs = require("fs");
function safeDelete(absolutePath) {
    try {
        if (!absolutePath || !fs.existsSync(absolutePath)) return;
        fs.unlinkSync(absolutePath);
    }
    catch (err) {
        notify.error(err);
    }
}

module.exports = {
    safeDelete
}