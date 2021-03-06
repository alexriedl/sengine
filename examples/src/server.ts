import * as express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.listen(port, (err) => {
	if (err) {
		return console.error(err);
	}

	return console.log(`server is listening on ${port}`);
});
