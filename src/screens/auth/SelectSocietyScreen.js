
<<<<<<< HEAD
=======
// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { colors } from '../../theme/colors';
// // import { typography } from '../../theme/typography';
// // import { spacing } from '../../theme/spacing';
// // import { borderRadius } from '../../theme/borderRadius';
// // import Header from '../../components/common/Header';
// // import Input from '../../components/common/Input';
// // import { useAuth } from '../../hooks/useAuth';
// // import { useToast } from '../../hooks/useToast';

// // const SOCIETIES = [
// //   {
// //     id: '1',
// //     name: 'Green Valley Apartments',
// //     city: 'Mumbai',
// //     area: 'Andheri West',
// //   },
// //   { id: '2', name: 'Blue Ridge', city: 'Pune', area: 'Hinjewadi' },
// //   { id: '3', name: 'Prestige Lakeside', city: 'Bangalore', area: 'Varthur' },
// //   { id: '4', name: 'DLF Cyber City', city: 'Gurgaon', area: 'Phase 3' },
// // ];

// // const SelectSocietyScreen = ({ navigation, route }) => {
// //   const insets = useSafeAreaInsets();
// //   const { sendOTP } = useAuth();
// //   const { showSuccess, showError } = useToast();

// //   // Receive User Data from Step 1
// //   const { userData } = route.params || {};

// //   const [search, setSearch] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const filtered = SOCIETIES.filter(
// //     s =>
// //       s.name.toLowerCase().includes(search.toLowerCase()) ||
// //       s.city.toLowerCase().includes(search.toLowerCase()),
// //   );

// //   const handleSelect = society => {
// //     Alert.alert('Confirm Society', `Join ${society.name}?`, [
// //       { text: 'Cancel', style: 'cancel' },
// //       {
// //         text: 'Confirm & Send OTP',
// //         onPress: async () => {
// //           setLoading(true);
// //           try {
// //             // 1. Send OTP to the phone number collected in Step 1
// //             const result = await sendOTP(userData.phone);

// //             if (result.success) {
// //               showSuccess('OTP Sent');

// //               // ✅ NEXT STEP: Go to OTP (Pass User Data AND Society Data)
// //               navigation.navigate('OTPVerification', {
// //                 phone: userData.phone,
// //                 isNewUser: true,
// //                 userData: userData,
// //                 societyData: society, // <--- Passing selected society forward
// //               });
// //             } else {
// //               showError('Failed to send OTP');
// //             }
// //           } catch (e) {
// //             showError('Error sending OTP');
// //           } finally {
// //             setLoading(false);
// //           }
// //         },
// //       },
// //     ]);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Header title="Select Society" showBack />
// //       <View style={styles.searchBox}>
// //         <Input
// //           placeholder="Search society..."
// //           value={search}
// //           onChangeText={setSearch}
// //           leftIcon="search"
// //         />
// //       </View>
// //       <FlatList
// //         data={filtered}
// //         keyExtractor={item => item.id}
// //         contentContainerStyle={[
// //           styles.list,
// //           { paddingBottom: insets.bottom + spacing.lg },
// //         ]}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.card}
// //             onPress={() => handleSelect(item)}
// //           >
// //             <View style={styles.iconBox}>
// //               <Icon name="apartment" size={28} color={colors.primary.main} />
// //             </View>
// //             <View style={styles.info}>
// //               <Text style={styles.name}>{item.name}</Text>
// //               <Text style={styles.location}>
// //                 {item.area}, {item.city}
// //               </Text>
// //             </View>
// //             <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
// //           </TouchableOpacity>
// //         )}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: colors.background.secondary },
// //   searchBox: {
// //     padding: spacing.md,
// //     backgroundColor: colors.background.primary,
// //   },
// //   list: { padding: spacing.md },
// //   card: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: colors.white,
// //     padding: spacing.lg,
// //     borderRadius: borderRadius.lg,
// //     marginBottom: spacing.md,
// //     elevation: 1,
// //   },
// //   iconBox: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     backgroundColor: colors.primary.background,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginRight: spacing.md,
// //   },
// //   info: { flex: 1 },
// //   name: {
// //     ...typography.textStyles.bodyLarge,
// //     fontWeight: '600',
// //     color: colors.text.primary,
// //   },
// //   location: { ...typography.textStyles.caption, color: colors.text.secondary },
// // });

// // export default SelectSocietyScreen;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { colors } from '../../theme/colors';
// import { typography } from '../../theme/typography';
// import { spacing } from '../../theme/spacing';
// import { borderRadius } from '../../theme/borderRadius';
// import Header from '../../components/common/Header';
// import Input from '../../components/common/Input';
// import { useAuth } from '../../hooks/useAuth';
// import { useToast } from '../../hooks/useToast';
// import { societyService } from '../../services/societyService'; // ✅ Import Service

// const SelectSocietyScreen = ({ navigation, route }) => {
//   const insets = useSafeAreaInsets();
//   const { sendOTP } = useAuth();
//   const { showSuccess, showError } = useToast();

//   const { userData } = route.params || {};

//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [dataLoading, setDataLoading] = useState(true); // ✅ Loading state for fetch
//   const [societies, setSocieties] = useState([]); // ✅ State for data

//   // ✅ Fetch Societies from Backend
//   useEffect(() => {
//     fetchSocieties();
//   }, []);

//   const fetchSocieties = async () => {
//     setDataLoading(true);
//     const result = await societyService.getSocieties();
//     if (result.success) {
//       setSocieties(result.data);
//     } else {
//       showError('Failed to load societies');
//     }
//     setDataLoading(false);
//   };

//   // ✅ Filter based on fetched data
//   const filtered = societies.filter(
//     s =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       (s.address && s.address.toLowerCase().includes(search.toLowerCase()))
//   );

//   // const handleSelect = society => {
//   //   Alert.alert('Confirm Society', `Join ${society.name}?`, [
//   //     { text: 'Cancel', style: 'cancel' },
//   //     {
//   //       text: 'Confirm & Send OTP',
//   //       onPress: async () => {
//   //         setLoading(true);
//   //         try {
//   //           const result = await sendOTP(userData.phone);

//   //           if (result.success) {
//   //             showSuccess('OTP Sent');
//   //             navigation.navigate('OTPVerification', {
//   //               phone: userData.phone,
//   //               isNewUser: true,
//   //               userData: userData,
//   //               societyData: society,
//   //             });
//   //           } else {
//   //             showError('Failed to send OTP');
//   //           }
//   //         } catch (e) {
//   //           showError('Error sending OTP');
//   //         } finally {
//   //           setLoading(false);
//   //         }
//   //       },
//   //     },
//   //   ]);
//   // };

//   const handleSelect = (society) => {
//     // ✅ Correct Navigation: Go to Select Block first
//     navigation.navigate('SelectBlock', {
//       userData: userData,
//       societyData: society,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Select Society" showBack />
//       <View style={styles.searchBox}>
//         <Input
//           placeholder="Search society..."
//           value={search}
//           onChangeText={setSearch}
//           leftIcon="search"
//         />
//       </View>

//       {/* ✅ Loading Indicator */}
//       {dataLoading ? (
//         <View style={styles.loader}>
//             <ActivityIndicator size="large" color={colors.primary.main} />
//         </View>
//       ) : (
//         <FlatList
//           data={filtered}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={[
//             styles.list,
//             { paddingBottom: insets.bottom + spacing.lg },
//           ]}
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>No societies found</Text>
//           }
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() => handleSelect(item)}
//             >
//               <View style={styles.iconBox}>
//                 <Icon name="apartment" size={28} color={colors.primary.main} />
//               </View>
//               <View style={styles.info}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 {/* ✅ Display Address from Backend */}
//                 <Text style={styles.location}>
//                   {item.address || 'Unknown Location'}
//                 </Text>
//               </View>
//               <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.background.secondary },
//   searchBox: {
//     padding: spacing.md,
//     backgroundColor: colors.background.primary,
//   },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   list: { padding: spacing.md },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//     padding: spacing.lg,
//     borderRadius: borderRadius.lg,
//     marginBottom: spacing.md,
//     elevation: 1,
//   },
//   iconBox: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: colors.primary.background,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },
//   info: { flex: 1 },
//   name: {
//     ...typography.textStyles.bodyLarge,
//     fontWeight: '600',
//     color: colors.text.primary,
//   },
//   location: { ...typography.textStyles.caption, color: colors.text.secondary },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: spacing.xl,
//     color: colors.text.secondary,
//   },
// });

// export default SelectSocietyScreen;

>>>>>>> 9cd90fc36dc1d86a549d4799016b5724986f618c

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/common/Header';
import { apiClient } from '../../services/api/apiClient';
import { useToast } from '../../hooks/useToast';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const SelectSocietyScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();

  const params = route?.params ?? {};
  const userData = params?.userData ?? {};

  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("✅ SelectSociety userData:", userData);

    if (!userData?.phone || !userData?.password) {
      showError("Signup details missing. Please signup again.");
      navigation.replace("SignUp");
      return;
    }

    fetchSocieties();
  }, []);

  const fetchSocieties = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/societies/public');
      const data = response?.data ?? response;

      setSocieties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('❌ Society fetch error:', error);
      showError('Failed to load societies');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = society => {
    if (!society?.id) {
      showError("Invalid society selected");
      return;
    }

    navigation.navigate('SelectBlock', {
      userData,        // ✅ includes password
      societyData: society,
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Select Society" showBack />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={societies}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelect(item)} // ✅ PASS item
            >
              <View style={styles.iconBox}>
                <Icon name="apartment" size={24} color={colors.primary.main} />
              </View>
              <Text style={styles.text}>{item.name}</Text>
              <Icon name="chevron-right" size={24} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No societies found</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.secondary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  text: { flex: 1, fontSize: 16, color: colors.text.primary, fontWeight: '500' },
  emptyText: { textAlign: 'center', marginTop: 20, color: colors.text.secondary },
});

export default SelectSocietyScreen;
