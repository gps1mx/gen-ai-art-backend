const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const https = require("https");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_results = response.data.data[0].url;

    const prompt_string = prompt.replace(/ /g, "-");

    const file = fs.createWriteStream(`images/${prompt_string}.png`);
    https.get(image_results, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close();
        console.log("Image saved");
      });
    });

    res.status(200).json({
      success: true,
      data: file,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateImage,
};
