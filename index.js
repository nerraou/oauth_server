const express = require("express");
const axios = require("axios");
//curl -X POST --data "grant_type=client_credentials&client_id=MY_AWESOME_UID&client_secret=MY_AWESOME_SECRET" https://api.intra.42.fr/oauth/token

const CLIENT_ID = "41fe239489f699c3606e6dda47d4fba2ae5afe3f47ea2ca45464809b8e5034a8";
const CLIENT_SECRET = "4fcdf68c560d3e3dda7beffff35b35d418db6bba6efa0ebf77da4edced9f31ba";
const INTRA_URL = "https://api.intra.42.fr/oauth/token";
const redirect_url = "http://localhost:8000/oauth/return";

const app = express();

app.get("/oauth/return", async (req, res) => {
	axios({
		method: "POST",
		url: `${INTRA_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}&redirect_uri=${redirect_url}&grant_type=authorization_code`
	}).then((response) => {
		axios({
			url: "https://api.intra.42.fr/v2/me",
			headers: {
				authorization:`Bearer ${response.data.access_token}`
			}
		}).then((response) =>{
			res.json(response.data)
		})
	}).catch((e)=>{
		console.log(e.message)
	});
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
