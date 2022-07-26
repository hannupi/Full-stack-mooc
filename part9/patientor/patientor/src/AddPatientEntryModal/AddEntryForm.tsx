import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, SelectField, RatingOption } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating, } from "../types";

import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */



const RatingOptions: RatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy 0" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk 1" },
    { value: HealthCheckRating.HighRisk, label: "High Risk 2" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk 3" }
];

export type formValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: formValues) => void;
    onCancel: () => void;
}


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                type: "HealthCheck",
                healthCheckRating: HealthCheckRating.LowRisk,

            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <SelectField label="Health rating" name="healthCheckRating" options={RatingOptions} />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;