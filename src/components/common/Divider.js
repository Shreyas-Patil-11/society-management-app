/**
 * Divider Component
 * 
 * Visual separator between content
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const Divider = ({
  // Direction
  vertical = false,
  
  // Text in divider
  text,
  textPosition = 'center', // 'left', 'center', 'right'
  
  // Styling
  color = colors.border.light,
  thickness = 1,
  spacing: dividerSpacing = spacing.base,
  length, // For vertical divider
  inset = 0, // Horizontal inset
  
  // Custom
  style,
  textStyle,
  
  ...props
}) => {
  // Vertical divider
  if (vertical) {
    return (
      <View
        style={[
          styles.vertical,
          {
            width: thickness,
            backgroundColor: color,
            height: length || '100%',
            marginHorizontal: dividerSpacing,
          },
          style,
        ]}
        {...props}
      />
    );
  }

  // Horizontal divider with text
  if (text) {
    return (
      <View
        style={[
          styles.textContainer,
          {
            marginVertical: dividerSpacing,
            marginHorizontal: inset,
          },
          style,
        ]}
        {...props}>
        {textPosition !== 'left' && (
          <View
            style={[
              styles.line,
              {
                backgroundColor: color,
                height: thickness,
              },
              textPosition === 'center' && styles.lineFlex,
            ]}
          />
        )}
        
        <Text
          style={[
            styles.text,
            textPosition === 'left' && styles.textLeft,
            textPosition === 'right' && styles.textRight,
            textStyle,
          ]}>
          {text}
        </Text>
        
        {textPosition !== 'right' && (
          <View
            style={[
              styles.line,
              {
                backgroundColor: color,
                height: thickness,
              },
              textPosition === 'center' && styles.lineFlex,
            ]}
          />
        )}
      </View>
    );
  }

  // Simple horizontal divider
  return (
    <View
      style={[
        styles.horizontal,
        {
          height: thickness,
          backgroundColor: color,
          marginVertical: dividerSpacing,
          marginHorizontal: inset,
        },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    alignSelf: 'stretch',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 0,
    width: 20,
  },
  lineFlex: {
    flex: 1,
  },
  text: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginHorizontal: spacing.md,
    textTransform: 'uppercase',
  },
  textLeft: {
    marginLeft: 0,
  },
  textRight: {
    marginRight: 0,
  },
});

export default Divider;