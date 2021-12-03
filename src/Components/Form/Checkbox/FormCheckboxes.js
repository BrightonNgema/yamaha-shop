import React from 'react'
import { FormLabel } from '@material-ui/core';
import Checkbox from './Checkbox';
import { colors } from 'theme';

export default function CheckboxList({
  onChange,
  items,
  label,
  name,
  values,
  checked
}) {

  return (
    <div className="input-container">
      <FormLabel key={`cbxtitle_${label}`} component="legend">{label}</FormLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', flexBasis: 4 }}>
        {items.map((item, index) =>
          <>
            <Checkbox
              style={{ flex: 1 }}
              key={`cbx_${item.key}`}
              checked={item.value}
              label={typeof item === 'string' ? item : item.label}
              onChange={(k, v) => {

                onChange(`${item.key}`, v, index);
              }}
              value={item.key}
              color={colors.primary}
            />
          </>
        )}
      </div>
    </div>
  )
};
