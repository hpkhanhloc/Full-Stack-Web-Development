import { useStateValue } from "../state";
import { Grid, Button, } from "semantic-ui-react";
import { Formik, Field, Form } from "formik";
import { TextField, DiagnosisSelection } from "./FormField";
import { OccupationalHealthcareEntry } from "../types";
import React from "react";

export type EntryOccupationFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (values: EntryOccupationFormValues) => void;
    onCancel: () => void;
}

export const AddEntryOccupationForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                employerName: "",
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
                if (!values.employerName) {
                    errors.employerName = requireError;
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
                            component={TextField}
                            label="EmployerName"
                            placeholder="EmployerName"
                            name="employerName"
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

export default AddEntryOccupationForm;