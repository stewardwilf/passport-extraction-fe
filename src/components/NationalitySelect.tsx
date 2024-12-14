import React from 'react';
import { Form } from 'semantic-ui-react';
import { Nationality } from '../common/Nationalities';

interface NationalitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

// Convert enum values to options for Semantic UI dropdown
const nationalityOptions = Object.entries(Nationality).map(([key, value]) => ({
  key,
  text: value,
  value: key,
}));

const NationalitySelect = ({ value, onChange }: NationalitySelectProps) => {
  return (
    <Form.Field>
      <label style={{ marginBottom: '.5rem', fontWeight: '600' }}>Select your Nationality</label>
      <Form.Select
        placeholder="Select Nationality"
        options={nationalityOptions}
        onChange={(e, { value }) => onChange(value as string)}
        value={value}
      />
    </Form.Field>
  );
};

export default NationalitySelect;
