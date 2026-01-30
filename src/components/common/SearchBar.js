/**
 * SearchBar Component
 * 
 * Search input with clear and filter options
 */

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import { shadows } from '../../theme/shadows';

const SearchBar = forwardRef(({
  // Value
  value = '',
  onChangeText,
  
  // Placeholder
  placeholder = 'Search...',
  
  // Actions
  onSubmit,
  onClear,
  onFilter,
  showFilter = false,
  filterActive = false,
  
  // States
  autoFocus = false,
  editable = true,
  
  // Styling
  elevated = false,
  rounded = true,
  backgroundColor = colors.background.secondary,
  style,
  inputStyle,
  
  // Accessibility
  accessibilityLabel = 'Search',
  testID,
  
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      inputRef.current?.clear();
      onChangeText?.('');
      onClear?.();
    },
  }));

  /**
   * Handle text change
   */
  const handleChangeText = (text) => {
    onChangeText?.(text);
  };

  /**
   * Handle clear
   */
  const handleClear = () => {
    inputRef.current?.clear();
    onChangeText?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    onSubmit?.(value);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        rounded && styles.rounded,
        elevated && shadows.sm,
        isFocused && styles.focused,
        style,
      ]}>
      <Icon
                name="search"
        size={20}
        color={isFocused ? colors.primary.main : colors.icon.secondary}
        style={styles.searchIcon}
      />
      
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        autoFocus={autoFocus}
        editable={editable}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        style={[styles.input, inputStyle]}
        {...props}
      />
      
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Clear search"
          style={styles.clearButton}>
          <Icon
            name="close"
            size={18}
            color={colors.icon.secondary}
          />
        </TouchableOpacity>
      )}
      
      {showFilter && (
        <TouchableOpacity
          onPress={onFilter}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Filter"
          style={styles.filterButton}>
          <Icon
            name="tune"
            size={20}
            color={filterActive ? colors.primary.main : colors.icon.secondary}
          />
          {filterActive && <View style={styles.filterDot} />}
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rounded: {
    borderRadius: borderRadius.full,
  },
  focused: {
    borderColor: colors.primary.main,
    backgroundColor: colors.background.primary,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.textStyles.bodyMedium,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  filterButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
    position: 'relative',
  },
  filterDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.main,
  },
});

export default SearchBar;