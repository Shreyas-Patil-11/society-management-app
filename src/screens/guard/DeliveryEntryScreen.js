// /**
//  * Delivery Entry Screen
//  */

// import React, { useState } from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import { borderRadius } from '../../theme/borderRadius';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import Header from '../../components/common/Header';
// import { useToast } from '../../hooks/useToast';

// const COMPANIES = [
//   { id: 'swiggy', name: 'Swiggy', icon: 'fastfood' },
//   { id: 'zomato', name: 'Zomato', icon: 'restaurant' },
//   { id: 'amazon', name: 'Amazon', icon: 'shopping-bag' },
//   { id: 'flipkart', name: 'Flipkart', icon: 'inventory-2' },
//   { id: 'other', name: 'Courier', icon: 'local-shipping' },
// ];

// const DeliveryEntryScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { showSuccess } = useToast();
  
//   const [company, setCompany] = useState(null);
//   const [flat, setFlat] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       showSuccess(`Delivery approved for ${flat}`);
//       navigation.goBack();
//     }, 1000);
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Delivery Entry" showBack />
      
//       <ScrollView contentContainerStyle={styles.content}>
        
//         <Text style={styles.sectionLabel}>Select Company</Text>
//         <View style={styles.grid}>
//           {COMPANIES.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={[
//                 styles.card,
//                 company === item.id && styles.cardSelected
//               ]}
//               onPress={() => setCompany(item.id)}
//             >
//               <View style={[styles.iconBox, company === item.id && styles.iconBoxSelected]}>
//                 <Icon 
//                   name={item.icon} 
//                   size={24} 
//                   color={company === item.id ? colors.white : colors.text.secondary} 
//                 />
//               </View>
//               <Text style={[styles.cardText, company === item.id && styles.textSelected]}>
//                 {item.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Input 
//           label="Flat Number"
//           placeholder="e.g. B-202"
//           value={flat}
//           onChangeText={setFlat}
//           autoCapitalize="characters"
//           leftIcon="home"
//         />

//         <Input 
//           label="Phone (Optional)"
//           placeholder="Agent mobile number"
//           keyboardType="phone-pad"
//           leftIcon="phone"
//         />

//       </ScrollView>

//       <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
//         <Button 
//           title="Allow Entry" 
//           onPress={handleSubmit} 
//           loading={loading}
//           disabled={!company || !flat}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.primary,
//   },
//   content: {
//     padding: spacing.lg,
//   },
//   sectionLabel: {
//     ...typography.textStyles.bodyMedium,
//     fontWeight: '600',
//     color: colors.text.primary,
//     marginBottom: spacing.md,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: spacing.md,
//     marginBottom: spacing.xl,
//   },
//   card: {
//     width: '30%',
//     aspectRatio: 1,
//     backgroundColor: colors.background.secondary,
//     borderRadius: borderRadius.lg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'transparent',
//   },
//   cardSelected: {
//     backgroundColor: colors.primary.background,
//     borderColor: colors.primary.main,
//   },
//   iconBox: {
//     marginBottom: spacing.sm,
//   },
//   cardText: {
//     ...typography.textStyles.caption,
//     fontWeight: '600',
//     color: colors.text.secondary,
//   },
//   textSelected: {
//     color: colors.primary.main,
//   },
//   footer: {
//     padding: spacing.lg,
//     borderTopWidth: 1,
//     borderTopColor: colors.border.light,
//   },
// });

// export default DeliveryEntryScreen;


/**
 * Delivery Entry Screen
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/borderRadius';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import { useToast } from '../../hooks/useToast';

const COMPANIES = [
  { id: 'swiggy', name: 'Swiggy', icon: 'fastfood' },
  { id: 'zomato', name: 'Zomato', icon: 'restaurant' },
  { id: 'amazon', name: 'Amazon', icon: 'shopping-bag' },
  { id: 'flipkart', name: 'Flipkart', icon: 'inventory-2' },
  { id: 'other', name: 'Courier', icon: 'local-shipping' },
];

const DeliveryEntryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  
  const [company, setCompany] = useState(null);
  const [flat, setFlat] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccess(`Delivery approved for ${flat}`);
      // ✅ FIX: Navigate back to Tabs to restore bottom bar
      navigation.navigate('GuardTabs', { screen: 'GuardHome' });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Delivery Entry" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionLabel}>Select Company</Text>
        <View style={styles.grid}>
          {COMPANIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                company === item.id && styles.cardSelected
              ]}
              onPress={() => setCompany(item.id)}
            >
              <View style={styles.iconBox}>
                <Icon 
                  name={item.icon} 
                  size={24} 
                  // ✅ FIX: Dark Blue (primary.main) when selected
                  color={company === item.id ? colors.primary.main : colors.text.secondary} 
                />
              </View>
              <Text style={[styles.cardText, company === item.id && styles.textSelected]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input 
          label="Flat Number"
          placeholder="e.g. B-202"
          value={flat}
          onChangeText={setFlat}
          autoCapitalize="characters"
          leftIcon="home"
        />

        <Input 
          label="Phone (Optional)"
          placeholder="Agent mobile number"
          keyboardType="phone-pad"
          leftIcon="phone"
        />

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Allow Entry" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!company || !flat}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing.lg,
  },
  sectionLabel: {
    ...typography.textStyles.bodyMedium,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: colors.primary.background, // Light Blue BG
    borderColor: colors.primary.main,
  },
  iconBox: {
    marginBottom: spacing.sm,
  },
  cardText: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  textSelected: {
    color: colors.primary.main, // Dark Blue Text
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default DeliveryEntryScreen;