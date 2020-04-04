import { useStateValue } from "../state";
import { Grid, Button, } from "semantic-ui-react";
import { Formik, Field, Form } from "formik";
import { DiagnosisSelection, TextField } from "./FormField";
import { Entry } from "../types";
import React from "react";

export type EntryFormValues = Omit<Entry, "id" >;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requireError = "Field is required";
                const errors: { [field: string]: string} ={};
                if (!values.date) {
                    errors.date = requireError;
                }
                if (!values.description) {
                    errors.description = requireError;
                }
                if (!values.specialist) {
                    errors.date = requireError;
                }
                if (!values.diagnosisCodes) {
                    errors.date = requireError;
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
                        {/* <Field
                            component={TextField}
                            label="Description"
                            placeholder="Description"
                            name="description"
                        /> */}

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

export default AddEntryHospitalForm;