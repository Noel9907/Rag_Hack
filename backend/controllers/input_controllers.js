const errorHandler = require("../middlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const diseasesData = require("../data/diseases");




const saveInput = asyncHandler(async (req, res) => {
    const { symptom, days } = req.body;
    if (!symptom || !days) {
        res.status(400);
        throw new Error("All fields are mandatory");
    } else {
        res.status(200).json({
        message: "Data has been saved successfully",
        });
    }
    });

const getDiseases = asyncHandler(async (req, res) => {
    const { symptom } = req.query;

    if (!symptom) {
        return res
        .status(400)
        .json({ message: "Symptom query parameter is required" });
    }

    const diseases = diseasesData[symptom.toLowerCase()];

    if (diseases) {
        res.status(200).json({
        symptom: symptom,
        diseases: diseases,
        });
    } else {
        res.status(404).json({
        message: `No diseases found for the symptom: ${symptom}`,
        });
    }
});

module.exports = { saveInput, getDiseases };