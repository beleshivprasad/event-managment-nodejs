const convertDateToTimeZone = (inputDate, targetTimeZone = "America/New_York") => {
  // Create an instance of the Intl.DateTimeFormat with the target time zone
  const formatter = new Intl.DateTimeFormat(undefined, {
    timeZone: targetTimeZone,
    hour12: false, // Use 24-hour format
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  // Get the formatted parts of the input date for the target time zone
  const dateParts = formatter.formatToParts(inputDate);

  // Reassemble the date parts into a string in the target time zone
  let convertedDate = "";
  for (const part of dateParts) {
    convertedDate += part.value;
  }

  return new Date(convertedDate);
};

module.exports = { convertDateToTimeZone };
