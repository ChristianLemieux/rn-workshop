import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../constants/Constants';

export default function TabBarIcon(props) {
  return (
    <MaterialIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? colors.tabIconSelected : colors.tabIconDefault}
    />
  );
}
