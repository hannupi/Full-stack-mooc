import diagnosesData from "../data/diagnoses"
import { diagnoseEntry } from "../types"

const diagnoses: Array<diagnoseEntry> = diagnosesData;

const getDiagnoses = (): Array<diagnoseEntry> => {
    return diagnoses;
}

export default {
    getDiagnoses
}