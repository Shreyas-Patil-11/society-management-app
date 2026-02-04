// /**
//  * Add Family Member Form
//  */

// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   Text,
//   Switch,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { colors } from '../../../theme/colors';
// import { typography } from '../../../theme/typography';
// import { spacing } from '../../../theme/spacing';
// import Header from '../../../components/common/Header';
// import Button from '../../../components/common/Button';
// import Input from '../../../components/common/Input';
// import { useToast } from '../../../hooks/useToast';

// const AddMemberScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { showSuccess } = useToast();
  
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [relation, setRelation] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);

//   const handleSubmit = () => {
//     // API Call
//     showSuccess('Member added successfully');
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Add Member" showBack />
      
//       <ScrollView contentContainerStyle={styles.content}>
        
//         <Input 
//           label="Full Name"
//           placeholder="e.g. Priya Sharma"
//           value={name}
//           onChangeText={setName}
//           leftIcon="person"
//         />

//         <Input 
//           label="Mobile Number"
//           placeholder="Enter 10-digit number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//           maxLength={10}
//           leftIcon="phone"
//         />

//         <Input 
//           label="Relationship"
//           placeholder="e.g. Spouse, Son, Father"
//           value={relation}
//           onChangeText={setRelation}
//           leftIcon="people"
//         />

//         <View style={styles.switchRow}>
//           <View style={styles.switchInfo}>
//             <Text style={styles.switchLabel}>Admin Access</Text>
//             <Text style={styles.switchSub}>Can approve visitors & manage household</Text>
//           </View>
//           <Switch 
//             value={isAdmin} 
//             onValueChange={setIsAdmin}
//             trackColor={{ true: colors.primary.main }}
//           />
//         </View>

//       </ScrollView>

//       <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
//         <Button 
//           title="Add Member" 
//           onPress={handleSubmit} 
//           disabled={!name || !phone}
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
//   switchRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: spacing.md,
//     padding: spacing.md,
//     backgroundColor: colors.background.secondary,
//     borderRadius: 8,
//   },
//   switchInfo: {
//     flex: 1,
//     marginRight: spacing.md,
//   },
//   switchLabel: {
//     ...typography.textStyles.bodyMedium,
//     fontWeight: '600',
//     color: colors.text.primary,
//   },
//   switchSub: {
//     ...typography.textStyles.caption,
//     color: colors.text.secondary,
//     marginTop: 2,
//   },
//   footer: {
//     padding: spacing.lg,
//     borderTopWidth: 1,
//     borderTopColor: colors.border.light,
//   },
// });

// export default AddMemberScreen;

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { spacing } from '../../../theme/spacing';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useToast } from '../../../hooks/useToast';
import { householdService } from '../../../services/householdService';

const AddFamilyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Note: Backend doesn't support 'isAdmin' yet, so it is purely visual for now
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async () => {
    if (!name || !relation) {
        showError("Name and Relation are required");
        return;
    }

    setLoading(true);
    const payload = {
        name,
        phone,
        relation,
        work: null // Null indicates Family member
    };

    const result = await householdService.addHouseholdMember(payload);
    setLoading(false);

    if (result.success) {
        showSuccess(result.message);
        navigation.goBack();
    } else {
        showError(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add Member" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Input 
          label="Full Name"
          placeholder="e.g. Priya Sharma"
          value={name}
          onChangeText={setName}
          leftIcon="person"
        />

        <Input 
          label="Mobile Number"
          placeholder="Enter 10-digit number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
          leftIcon="phone"
        />

        <Input 
          label="Relationship"
          placeholder="e.g. Spouse, Son, Father"
          value={relation}
          onChangeText={setRelation}
          leftIcon="people"
        />

        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Admin Access</Text>
            <Text style={styles.switchSub}>Can approve visitors & manage household</Text>
          </View>
          <Switch 
            value={isAdmin} 
            onValueChange={setIsAdmin}
            trackColor={{ true: colors.primary.main }}
          />
        </View>

      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button 
          title="Add Member" 
          onPress={handleSubmit} 
          disabled={loading || !name}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
  },
  switchInfo: { flex: 1, marginRight: spacing.md },
  switchLabel: { ...typography.textStyles.bodyMedium, fontWeight: '600', color: colors.text.primary },
  switchSub: { ...typography.textStyles.caption, color: colors.text.secondary, marginTop: 2 },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border.light },
});

export default AddFamilyScreen;