const NewsTickerRepository = require("../repositories/newsTickerRepository");

const newsTickerRepository = new NewsTickerRepository();

const responseMessages = require("../helpers/responseMessages");
const { logger } = require("../../../logger");

const createNewsTickerText = async text => {
  try {
    const newsTicker = await newsTickerRepository.createNewsTickerRecord({ text });

    /**
     * adding logger in only this method because there no controller method for creation of news ticker
     * so there no other place to keep log of news ticker creation than this.
     */

    logger.info(responseMessages.newsTicker.create.success, {
      fileName: __filename,
      functionName: "createNewsTickerText"
    });

    return {
      success: true,
      message: responseMessages.newsTicker.create.success,
      data: { newsTicker: newsTicker.toObject() }
    };
  } catch (error) {
    logger.error(error.message, {
      fileName: __filename,
      functionName: "createNewsTickerText",
      error
    });

    return { success: false, message: error.message, error };
  }
};

const updateNewsTickerText = async text => {
  try {
    const newsTicker = await newsTickerRepository.getNewsTickerRecord();

    if (newsTicker) {
      await newsTickerRepository.updateNewsTickerRecord({ text });

      return { success: true, message: responseMessages.newsTicker.update.success };
    }

    const response = await createNewsTickerText(text);

    if (response.success) {
      return { success: true, message: responseMessages.newsTicker.update.success };
    }

    return { success: false, message: responseMessages.newsTicker.update.failure };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

const getNewsTickerText = async () => {
  try {
    const newsTicker = await newsTickerRepository.getNewsTickerRecord();

    return {
      success: true,
      message: responseMessages.newsTicker.fetch.success,
      data: { newsTicker: newsTicker ? newsTicker.toObject() : {} }
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

module.exports = { createNewsTickerText, updateNewsTickerText, getNewsTickerText };
