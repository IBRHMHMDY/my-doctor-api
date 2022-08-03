import 'dotenv/config';
import models, {sequelize} from './models';
import app from './app.js';

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000);
    });
})

