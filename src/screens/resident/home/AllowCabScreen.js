// // import React from 'react';
// // import { View } from 'react-native';
// // import { Header, Button } from '../../../components/common';
// // import { spacing } from '../../../theme';

// // const AllowCabScreen = ({ navigation }) => {
// //   return (
// //     <View style={{ flex: 1 }}>
// //       <Header title="Allow Cab" />
// //       <View style={{ padding: spacing.base }}>
// //         <Button
// //           title="Generate Cab Gatepass"
// //           onPress={() => navigation.navigate('Gatepass', { type: 'cab' })}
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// // export default AllowCabScreen;


// /**
//  * Allow Cab Screen
//  * * Pre-approve a cab entry.
//  */

// import React, { useState } from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../../../theme/colors';
// import { typography } from '../../../theme/typography';
// import { spacing } from '../../../theme/spacing';
// import { borderRadius } from '../../../theme/borderRadius';
// import Header from '../../../components/common/Header';
// import Button from '../../../components/common/Button';
// import Input from '../../../components/common/Input';
// import { useForm } from '../../../hooks/useForm';
// import { useToast } from '../../../hooks/useToast';
// import { CAB_COMPANIES } from '../../../utils/constants';

// const AllowCabScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { showSuccess } = useToast();
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   const { values, handleChange, handleSubmit, isSubmitting } = useForm(
//     {
//       vehicleNumber: '',
//     },
//     null,
//     async (vals) => {
//       if (!selectedCompany) {
//         // Show error for company
//         return;
//       }
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       showSuccess('Cab entry pre-approved!');
//       navigation.goBack();
//     }
//   );

//   return (
//     <View style={styles.container}>
//       <Header title="Allow Cab" showBack />
      
//       <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
//         <Text style={styles.sectionTitle}>Select Cab Provider</Text>
//         <View style={styles.grid}>
//           {CAB_COMPANIES.map((company) => (
//             <TouchableOpacity
//               key={company.id}
//               style={[
//                 styles.companyItem,
//                 selectedCompany === company.id && styles.selectedItem
//               ]}
//               onPress={() => setSelectedCompany(company.id)}
//             >
//               <View style={[styles.iconContainer, selectedCompany === company.id && styles.selectedIcon]}>
//                 <Icon name={company.icon} size={28} color={selectedCompany === company.id ? colors.white : colors.text.secondary} />
//               </View>
//               <Text style={[styles.companyName, selectedCompany === company.id && styles.selectedText]}>
//                 {company.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.formSection}>
//           <Input
//             label="Vehicle Number (Optional)"
//             placeholder="e.g. MH 12 AB 1234"
//             value={values.vehicleNumber}
//             onChangeText={(t) => handleChange('vehicleNumber', t)}
//             autoCapitalize="characters"
//             leftIcon="directions-car"
//           />
//           <Text style={styles.hintText}>
//             Adding vehicle number allows auto-approval at the gate.
//           </Text>
//         </View>

//       </ScrollView>

//       <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
//         <Button 
//           title="Approve Entry" 
//           onPress={handleSubmit} 
//           loading={isSubmitting}
//           disabled={!selectedCompany}
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
//   sectionTitle: {
//     ...typography.textStyles.bodyLarge,
//     fontWeight: '600',
//     marginBottom: spacing.md,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: spacing.md,
//     marginBottom: spacing.xl,
//   },
//   companyItem: {
//     width: '30%',
//     aspectRatio: 1,
//     backgroundColor: colors.background.secondary,
//     borderRadius: borderRadius.lg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'transparent',
//   },
//   selectedItem: {
//     borderColor: colors.primary.main,
//     backgroundColor: colors.primary.background,
//   },
//   iconContainer: {
//     marginBottom: spacing.sm,
//   },
//   companyName: {
//     ...typography.textStyles.caption,
//     fontWeight: '600',
//     color: colors.text.secondary,
//   },
//   selectedText: {
//     color: colors.primary.main,
//   },
//   formSection: {
//     marginTop: spacing.md,
//   },
//   hintText: {
//     ...typography.textStyles.caption,
//     color: colors.text.tertiary,
//     marginTop: -spacing.sm,
//     marginLeft: spacing.xs,
//   },
//   footer: {
//     padding: spacing.lg,
//     borderTopWidth: 1,
//     borderTopColor: colors.border.light,
//     backgroundColor: colors.background.primary,
//   },
// });

// export default AllowCabScreen;


/**
 * Allow Cab Screen
 * * Pre-approve a cab entry.
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/borderRadius';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useToast } from '../../../hooks/useToast';

// Define constants locally or import them
const CAB_COMPANIES = [
  { id: 'uber', name: 'Uber', icon: 'local-taxi' },
  { id: 'ola', name: 'Ola', icon: 'directions-car' },
  { id: 'blu', name: 'BluSmart', icon: 'electric-car' },
  { id: 'other', name: 'Other', icon: 'taxi-alert' },
];

const AllowCabScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCompany) {
        showError("Please select a cab provider");
        return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showSuccess('Cab entry pre-approved!');
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Allow Cab" showBack />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        
        <Text style={styles.sectionTitle}>Select Cab Provider</Text>
        <View style={styles.grid}>
          {CAB_COMPANIES.map((company) => {
            const isSelected = selectedCompany === company.id;
            
            return (
              <TouchableOpacity
                key={company.id}
                style={[
                  styles.companyItem,
                  isSelected && styles.selectedItem
                ]}
                onPress={() => setSelectedCompany(company.id)}
              >
                <View style={styles.iconContainer}>
                  <Icon 
                    name={company.icon} 
                    size={32} 
                    // ✅ FIX: Use Dark Blue for icon when selected (Visible on Light Blue BG)
                    color={isSelected ? colors.primary.main : colors.text.secondary} 
                  />
                </View>
                <Text style={[
                  styles.companyName, 
                  isSelected && styles.selectedText
                ]}>
                  {company.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.formSection}>
          <Input
            label="Vehicle Number (Optional)"
            placeholder="e.g. MH 12 AB 1234"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            autoCapitalize="characters"
            leftIcon="directions-car"
          />
          <Text style={styles.hintText}>
            Adding vehicle number allows auto-approval at the gate.
          </Text>
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Approve Entry" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!selectedCompany}
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
  sectionTitle: {
    ...typography.textStyles.bodyLarge,
    fontWeight: '600',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  companyItem: {
    width: '30%', // Fits 3 items per row approx
    aspectRatio: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.background, // Light Blue
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  companyName: {
    ...typography.textStyles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.primary.main, // Dark Blue Text
  },
  formSection: {
    marginTop: spacing.md,
  },
  hintText: {
    ...typography.textStyles.caption,
    color: colors.text.tertiary,
    marginTop: -spacing.sm,
    marginLeft: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
});

export default AllowCabScreen;