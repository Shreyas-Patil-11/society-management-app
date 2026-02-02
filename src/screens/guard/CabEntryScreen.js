// /**
//  * Cab Entry Screen
//  * * Record Cab entry details (Company + Vehicle No)
//  */

// import React, { useState } from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Keyboard,
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

// const CAB_BRANDS = [
//   { id: 'uber', name: 'Uber', color: 'black' },
//   { id: 'ola', name: 'Ola', color: '#B8D335' },
//   { id: 'blu', name: 'BluSmart', color: '#0052CC' },
//   { id: 'other', name: 'Other', color: '#6B7280' },
// ];

// const CabEntryScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { showSuccess, showError } = useToast();
  
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [vehicleNo, setVehicleNo] = useState('');
//   const [flat, setFlat] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = () => {
//     Keyboard.dismiss();
//     if (!selectedBrand || !flat) {
//       showError('Please select brand and enter flat number');
//       return;
//     }
    
//     setLoading(true);
//     // Mock API
//     setTimeout(() => {
//       setLoading(false);
//       showSuccess(`Entry logged for ${flat}`);
//       navigation.goBack();
//     }, 1000);
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Cab Entry" showBack />
      
//       <ScrollView contentContainerStyle={styles.content}>
        
//         <Text style={styles.sectionLabel}>Select Aggregator</Text>
//         <View style={styles.brandGrid}>
//           {CAB_BRANDS.map((brand) => (
//             <TouchableOpacity
//               key={brand.id}
//               style={[
//                 styles.brandItem,
//                 selectedBrand === brand.id && styles.brandSelected
//               ]}
//               onPress={() => setSelectedBrand(brand.id)}
//             >
//               <Text style={[
//                 styles.brandText,
//                 selectedBrand === brand.id && styles.brandTextSelected
//               ]}>{brand.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Input 
//           label="Vehicle Number"
//           placeholder="e.g. MH 12 AB 1234"
//           value={vehicleNo}
//           onChangeText={setVehicleNo}
//           autoCapitalize="characters"
//           leftIcon="directions-car"
//         />

//         <Input 
//           label="Flat Number"
//           placeholder="e.g. A-101"
//           value={flat}
//           onChangeText={setFlat}
//           autoCapitalize="characters"
//           leftIcon="home"
//         />

//         <View style={styles.summary}>
//           <Icon name="info" size={20} color={colors.primary.main} />
//           <Text style={styles.summaryText}>
//             Driver photo will be captured at the gate camera automatically.
//           </Text>
//         </View>

//       </ScrollView>

//       <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
//         <Button 
//           title="Allow Entry" 
//           onPress={handleSubmit} 
//           loading={loading}
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
//   brandGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: spacing.md,
//     marginBottom: spacing.lg,
//   },
//   brandItem: {
//     width: '47%',
//     padding: spacing.md,
//     borderRadius: borderRadius.md,
//     backgroundColor: colors.background.secondary,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'transparent',
//   },
//   brandSelected: {
//     backgroundColor: colors.primary.background,
//     borderColor: colors.primary.main,
//   },
//   brandText: {
//     ...typography.textStyles.bodyMedium,
//     color: colors.text.secondary,
//     fontWeight: '600',
//   },
//   brandTextSelected: {
//     color: colors.primary.main,
//   },
//   summary: {
//     flexDirection: 'row',
//     backgroundColor: colors.primary.background,
//     padding: spacing.md,
//     borderRadius: borderRadius.md,
//     marginTop: spacing.md,
//     gap: spacing.sm,
//   },
//   summaryText: {
//     flex: 1,
//     ...typography.textStyles.caption,
//     color: colors.primary.dark,
//   },
//   footer: {
//     padding: spacing.lg,
//     borderTopWidth: 1,
//     borderTopColor: colors.border.light,
//   },
// });

// export default CabEntryScreen;

/**
 * Cab Entry Screen
 * * Record Cab entry details (Company + Vehicle No)
 */

import React, { useState, useEffect } from 'react';
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

const CAB_BRANDS = [
  { id: 'uber', name: 'Uber', color: 'black' },
  { id: 'ola', name: 'Ola', color: '#B8D335' },
  { id: 'blu', name: 'BluSmart', color: '#0052CC' },
  { id: 'other', name: 'Other', color: '#6B7280' },
];

const CabEntryScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();
  
  // Get pre-selected company from previous screen
  const preSelectedCompany = route.params?.company;

  const [selectedBrand, setSelectedBrand] = useState(preSelectedCompany?.id || null);
  const [vehicleNo, setVehicleNo] = useState('');

  useEffect(() => {
    if (preSelectedCompany) {
      setSelectedBrand(preSelectedCompany.id);
    }
  }, [preSelectedCompany]);

  const handleNext = () => {
    Keyboard.dismiss();
    if (!selectedBrand) {
      showError('Please select a cab brand');
      return;
    }
    
    // Find name of brand
    const brandName = CAB_BRANDS.find(b => b.id === selectedBrand)?.name || 'Cab';
    
    // Prepare data for the flow
    // visitorName will be "Uber Driver" or similar
    const entryData = {
      visitorName: `${brandName} Driver`,
      visitorPhone: '', // Cabs usually don't give phone at gate
      vehicleNo: vehicleNo,
      visitorType: 'CAB', // Will be mapped to 'OTHER' or 'GUEST' in ConfirmScreen
    };

    // Navigate to Building Selection (Reusing the flow)
    navigation.navigate('SelectBuilding', entryData);
  };

  return (
    <View style={styles.container}>
      <Header title="Cab Entry" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionLabel}>Select Aggregator</Text>
        <View style={styles.brandGrid}>
          {CAB_BRANDS.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={[
                styles.brandItem,
                selectedBrand === brand.id && styles.brandSelected
              ]}
              onPress={() => setSelectedBrand(brand.id)}
            >
              <Text style={[
                styles.brandText,
                selectedBrand === brand.id && styles.brandTextSelected
              ]}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input 
          label="Vehicle Number (Optional)"
          placeholder="e.g. MH 12 AB 1234"
          value={vehicleNo}
          onChangeText={setVehicleNo}
          autoCapitalize="characters"
          leftIcon="directions-car"
        />

        {/* Removed "Flat Number" input -> Moved to next screen for accuracy */}

        <View style={styles.summary}>
          <Icon name="info" size={20} color={colors.primary.main} />
          <Text style={styles.summaryText}>
            Driver photo will be captured at the gate camera automatically.
          </Text>
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Next: Select Destination" 
          onPress={handleNext} 
          icon="arrow-forward"
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
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  brandItem: {
    width: '47%',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  brandSelected: {
    backgroundColor: colors.primary.background,
    borderColor: colors.primary.main,
  },
  brandText: {
    ...typography.textStyles.bodyMedium,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  brandTextSelected: {
    color: colors.primary.main,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: colors.primary.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  summaryText: {
    flex: 1,
    ...typography.textStyles.caption,
    color: colors.primary.dark,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default CabEntryScreen;