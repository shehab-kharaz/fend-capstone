const app = require('./app'); 

const PORT = 8081;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server runing on ${PORT}`);
    });
}
