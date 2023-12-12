import { DateButton, DatePicker } from '@src/components';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';

type Props = {
  onChange: any;
  birthDate: Timestamp | null;
};

const BirthDate = ({ onChange, birthDate }: Props) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  return (
    <>
      <DateButton
        date={birthDate}
        onPress={setShowDate}
        label={'account.title.birthDate'}
        labelEmpty={'account.placeholder.birthDate'}
      />
      <DatePicker
        date={birthDate}
        fieldName={'birthDate'}
        isVisible={showDate}
        onChange={onChange}
        onClose={setShowDate}
      />
    </>
  );
};

export default BirthDate;
