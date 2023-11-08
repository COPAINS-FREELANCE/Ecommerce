import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000

export const startServer = (app) => {
    try {

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);

    }

}