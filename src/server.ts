import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

const { port, database_url } = config;

async function main() {
  try {
    await mongoose.connect(database_url as string);

    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
