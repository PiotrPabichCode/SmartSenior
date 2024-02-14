import { useEffect } from 'react';
import { useFormikContext } from 'formik';

type FormikObserverProps = {
  onChange: ({ values, initialValues }: { values: any; initialValues: any }) => void;
};

const FormikObserver = ({ onChange }: FormikObserverProps) => {
  const { values, initialValues } = useFormikContext();

  useEffect(() => onChange({ values, initialValues }), [values, initialValues, onChange]);

  return null;
};

export default FormikObserver;
