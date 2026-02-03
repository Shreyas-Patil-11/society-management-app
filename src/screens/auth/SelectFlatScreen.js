// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// // import { colors } from '../../theme/colors';
// // import { spacing } from '../../theme/spacing';
// // import Header from '../../components/common/Header';
// // import { apiClient } from '../../services/api/apiClient'; // Or use service
// // import { useToast } from '../../hooks/useToast';

// // const SelectFlatScreen = ({ navigation, route }) => {
// //   const { userData, societyData } = route.params;
// //   const { showError } = useToast();

// //   const [step, setStep] = useState('BLOCK'); // 'BLOCK' or 'FLAT'
// //   const [blocks, setBlocks] = useState([]);
// //   const [flats, setFlats] = useState([]);
// //   const [selectedBlock, setSelectedBlock] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // 1. Fetch Blocks on Load
// //   useEffect(() => {
// //     fetchBlocks();
// //   }, []);

// //   const fetchBlocks = async () => {
// //     setLoading(true);
// //     try {
// //       // Fetch public blocks
// //       const response = await apiClient.get(`/blocks/public/${societyData.id}`);
// //       if (response.data) setBlocks(response.data);
// //     } catch (error) {
// //       showError('Failed to load blocks');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBlockSelect = async (block) => {
// //     setSelectedBlock(block);
// //     setStep('FLAT');
// //     setLoading(true);
// //     try {
// //       // Fetch public flats
// //       const response = await apiClient.get(`/flats/public/${block.id}`);
// //       if (response.data) setFlats(response.data);
// //     } catch (error) {
// //       showError('Failed to load flats');
// //       setStep('BLOCK');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleFlatSelect = (flat) => {
// //     // ✅ Navigate to OTP with ALL data
// //     navigation.navigate('OTPVerification', {
// //       phone: userData.phone,
// //       isNewUser: true,
// //       userData: userData,
// //       societyData: societyData,
// //       blockData: selectedBlock,
// //       flatData: flat, // Pass selected flat
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Header 
// //         title={step === 'BLOCK' ? "Select Block" : `Flats in ${selectedBlock?.name}`} 
// //         showBack 
// //         onBackPress={() => step === 'FLAT' ? setStep('BLOCK') : navigation.goBack()}
// //       />
      
// //       {loading ? (
// //         <View style={styles.center}><ActivityIndicator size="large" color={colors.primary.main} /></View>
// //       ) : (
// //         <FlatList
// //           data={step === 'BLOCK' ? blocks : flats}
// //           keyExtractor={(item) => item.id.toString()}
// //           contentContainerStyle={styles.list}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity 
// //               style={styles.card} 
// //               onPress={() => step === 'BLOCK' ? handleBlockSelect(item) : handleFlatSelect(item)}
// //             >
// //               <Text style={styles.text}>
// //                 {step === 'BLOCK' ? item.name : `Flat ${item.flat_number}`}
// //               </Text>
// //             </TouchableOpacity>
// //           )}
// //           ListEmptyComponent={<Text style={styles.empty}>No {step === 'BLOCK' ? 'blocks' : 'flats'} found</Text>}
// //         />
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: colors.background.secondary },
// //   list: { padding: spacing.md },
// //   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   card: {
// //     padding: spacing.lg,
// //     backgroundColor: colors.white,
// //     marginBottom: spacing.sm,
// //     borderRadius: 8,
// //     elevation: 1
// //   },
// //   text: { fontSize: 16, color: colors.text.primary, fontWeight: '500' },
// //   empty: { textAlign: 'center', marginTop: 20, color: colors.text.secondary }
// // });

// // export default SelectFlatScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';
// import Header from '../../components/common/Header';
// import { apiClient } from '../../services/api/apiClient';
// import { useToast } from '../../hooks/useToast';

// const SelectFlatScreen = ({ navigation, route }) => {
//   const insets = useSafeAreaInsets();
//   const { showError } = useToast();

//   const params = route?.params ?? {};
//   const userData = params?.userData ?? {};
//   const societyData = params?.societyData ?? null;
//   const blockData = params?.blockData ?? null;

//   const [flats, setFlats] = useState([]); // ✅ FIXED
//   const [loading, setLoading] = useState(false); // ✅ FIXED

//   useEffect(() => {
//     console.log('✅ SelectFlat params:', params);

//     if (!blockData?.id) {
//       showError('Block not selected');
//       navigation.goBack();
//       return;
//     }

//     fetchFlats(blockData.id);
//   }, [blockData?.id]);

//   const fetchFlats = async blockId => {
//     setLoading(true);
//     try {
//       console.log('✅ Fetching EMPTY flats for Block ID:', blockId);

//       const response = await apiClient.get(`/flats/public/${blockId}`);
//       const data = response?.data ?? response;

//       setFlats(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Flat Fetch Error:', error);
//       showError('Failed to load flats');
//       setFlats([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFlatSelect = flat => {
//     Alert.alert(
//       'Confirm Details',
//       `Society: ${societyData?.name}\nBlock: ${blockData?.name}\nFlat: ${flat?.flat_number}`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Confirm',
//           onPress: () => {
//             navigation.navigate('OTPVerification', {
//               phone: userData?.phone,
//               isNewUser: true,
//               userData,
//               societyData,
//               blockData,
//               flatData: flat,
//             });
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <View style={[styles.container, { paddingBottom: insets.bottom }]}>
//       <Header title={`Available Flats in ${blockData?.name || 'Block'}`} showBack />

//       {loading ? (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color={colors.primary.main} />
//         </View>
//       ) : (
//         <FlatList
//           data={flats}
//           keyExtractor={item => String(item.id)}
//           contentContainerStyle={styles.list}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <Icon name="info-outline" size={48} color={colors.text.tertiary} />
//               <Text style={styles.emptyText}>
//                 No empty flats available in this block.
//               </Text>
//             </View>
//           }
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.card} onPress={() => handleFlatSelect(item)}>
//               <View style={styles.iconBox}>
//                 <Icon name="door-front" size={24} color={colors.primary.main} />
//               </View>

//               <Text style={styles.text}>Flat {item.flat_number}</Text>

//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>VACANT</Text>
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
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   list: { padding: spacing.md },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//     padding: spacing.md,
//     borderRadius: 8,
//     marginBottom: spacing.sm,
//     elevation: 1,
//   },
//   iconBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.primary.background,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },
//   text: { flex: 1, fontSize: 16, color: colors.text.primary, fontWeight: '500' },
//   badge: {
//     backgroundColor: '#E8F5E9',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   badgeText: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
//   emptyContainer: { alignItems: 'center', marginTop: 40 },
//   emptyText: { textAlign: 'center', marginTop: 10, color: colors.text.secondary },
// });

// export default SelectFlatScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Header from '../../components/common/Header';
import { apiClient } from '../../services/api/apiClient';
import { useToast } from '../../hooks/useToast';

const SelectFlatScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();

  const params = route?.params ?? {};
  const userData = params?.userData ?? {};
  const societyData = params?.societyData ?? null;
  const blockData = params?.blockData ?? null;

  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('✅ SelectFlat params:', params);
    console.log('✅ userData received:', userData);

    // ✅ ensure password exists before going OTP screen
    if (!userData?.password) {
      console.log('❌ Password missing in userData:', userData);
      showError('Password missing. Please signup again.');
      navigation.replace('SignUp');
      return;
    }

    if (!blockData?.id) {
      showError('Block not selected');
      navigation.goBack();
      return;
    }

    fetchFlats(blockData.id);
  }, [blockData?.id]);

  const fetchFlats = async blockId => {
    setLoading(true);
    try {
      console.log('✅ Fetching EMPTY flats for Block ID:', blockId);

      const response = await apiClient.get(`/flats/public/${blockId}`);
      const data = response?.data ?? response;

      setFlats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('❌ Flat Fetch Error:', error);
      showError('Failed to load flats');
      setFlats([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFlatSelect = flat => {
    Alert.alert(
      'Confirm Details',
      `Society: ${societyData?.name}\nBlock: ${blockData?.name}\nFlat: ${flat?.flat_number}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            console.log("✅ Sending to OTPVerification. userData:", userData);

            navigation.navigate('OTPVerification', {
              phone: userData?.phone,
              isNewUser: true,
              userData, // ✅ includes password
              societyData,
              blockData,
              flatData: flat,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header
        title={`Available Flats in ${blockData?.name || 'Block'}`}
        showBack
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={flats}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="info-outline" size={48} color={colors.text.tertiary} />
              <Text style={styles.emptyText}>
                No empty flats available in this block.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleFlatSelect(item)}
            >
              <View style={styles.iconBox}>
                <Icon
                  name="door-front"
                  size={24}
                  color={colors.primary.main}
                />
              </View>

              <Text style={styles.text}>Flat {item.flat_number}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>VACANT</Text>
              </View>

              <Icon
                name="chevron-right"
                size={24}
                color={colors.text.tertiary}
              />
            </TouchableOpacity>
          )}
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
  text: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    color: colors.text.secondary,
  },
});

export default SelectFlatScreen;
