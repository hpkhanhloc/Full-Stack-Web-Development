import { useStateValue } from "../state";
import { Grid, Button, } from "semantic-ui-react";
import { Formik, Field, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField } from "./FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import React from "react";

export type EntryHealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryHealthCheckFormValues) => void;
    onCancel: () => void;
}

// const rateOptions: RateOption[] = [
//     { value: HealthCheckRating.CriticalRisk, label: "3" },
//     { value: HealthCheckRating.HighRisk, label: "2" },
//     { value: HealthCheckRating.LowRisk, label: "1" },
//     { value: HealthCheckRating.Healthy, label: "0" }
// ];

export const AddEntryHealthForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                healthCheckRating: HealthCheckRating.Healthy,
                diagnosisCodes: []
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requireError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requireError;
                }
                if (!values.description) {
                    errors.description = requireError;
                }
                if (!values.specialist) {
                    errors.specialist = requireError;
                }
                if (!values.healthCheckRating) {
                    errors.healthCheckRating = requireError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            component={TextField}
                            label="Description"
                            placeholder="Description"
                            name="description"
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Health Check Rating"
                            component={NumberField}
                            name="healthCheckRating"
                            min={0}
                            max={3}
                        />

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryHealthForm;