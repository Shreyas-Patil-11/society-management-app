/**
 * Resident Stack Navigator
 * 
 * Contains all screens accessible to resident users
 * Includes bottom tabs and all nested screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Main Tabs
import ResidentTabs from './ResidentTabs';

// Home Screens
import HomeAlertScreen from '../screens/resident/home/HomeAlertScreen';
import AllowGuestScreen from '../screens/resident/home/AllowGuestScreen';
import AllowCabScreen from '../screens/resident/home/AllowCabScreen';
import AllowDeliveryScreen from '../screens/resident/home/AllowDeliveryScreen';
import AllowServicemanScreen from '../screens/resident/home/AllowServicemanScreen';
import GatepassScreen from '../screens/resident/home/GatepassScreen';
import EntryCallScreen from '../screens/resident/home/EntryCallScreen';
import EmergencyScreen from '../screens/resident/home/EmergencyScreen';

// HelpDesk Screens
import HelpDeskScreen from '../screens/resident/helpdesk/HelpDeskScreen';
import RaiseComplaintScreen from '../screens/resident/helpdesk/RaiseComplaintScreen';
import ComplaintInfoScreen from '../screens/resident/helpdesk/ComplaintInfoScreen';

// Notice Screens
import NoticeBoardScreen from '../screens/resident/notices/NoticeBoardScreen';

// Payment Screens
// import PaymentMethodsScreen from '../screens/resident/payments/PaymentMethodsScreen';
// import PaymentReceiptScreen from '../screens/resident/payments/PaymentReceiptScreen';
// import PaymentSuccessScreen from '../screens/resident/home/PaymentSuccessScreen';
import PaymentsScreen from '../screens/resident/payments/PaymentsScreen';
import PaymentMethodsScreen from '../screens/resident/payments/PaymentMethodsScreen';
import PaymentReceiptScreen from '../screens/resident/payments/PaymentReceiptScreen';

// Amenity Screens
import BookedAmenitiesScreen from '../screens/resident/amenities/BookedAmenitiesScreen';
import SelectAmenityScreen from '../screens/resident/amenities/SelectAmenityScreen';
import AmenitiesPaymentScreen from '../screens/resident/amenities/AmenitiesPaymentScreen';

// Community Screens
import PostsScreen from '../screens/resident/community/PostsScreen';
import CreatePostScreen from '../screens/resident/community/CreatePostScreen';
import ChatScreen from '../screens/resident/community/ChatScreen';
import ResidentsScreen from '../screens/resident/community/ResidentsScreen';
import ChattingScreen from '../screens/resident/community/ChattingScreen';
// import EventsScreen from '../screens/resident/community/EventsScreen'; 
// import PollsScreen from '../screens/resident/community/PollsScreen';

// Service Screens
import ServicesScreen from '../screens/resident/services/ServicesScreen';
// import DailyHelpListScreen from '../screens/resident/services/DailyHelpListScreen'; // ✅ Added
import BookServiceScreen from '../screens/resident/services/BookServiceScreen';
// import RaiseTicketScreen from '../screens/resident/services/RaiseTicketScreen'; // ✅ Added
import TicketDetailScreen from '../screens/resident/services/TicketDetailScreen'; // ✅ Added
import MyBookingsScreen from '../screens/resident/services/MyBookingsScreen';
import BookingSlotScreen from '../screens/resident/services/BookingSlotScreen'

// Profile Screens
import MyPostsScreen from '../screens/resident/profile/MyPostsScreen';
import HouseholdScreen from '../screens/resident/profile/HouseholdScreen';
import AddFamilyScreen from '../screens/resident/profile/AddFamilyScreen';
import AddHelpsScreen from '../screens/resident/profile/AddHelpsScreen';
import AddVehicleScreen from '../screens/resident/profile/AddVehicleScreen';
import AddEntriesScreen from '../screens/resident/profile/AddEntriesScreen';
import NotificationsScreen from '../screens/resident/profile/NotificationsScreen';
import SettingsScreen from '../screens/resident/profile/SettingsScreen';
import SupportScreen from '../screens/resident/profile/SupportScreen';
import TermsConditionsScreen from '../screens/resident/profile/TermsConditionsScreen';
import ProfileScreen from '../screens/resident/profile/ProfileScreen';
import EditProfileScreen from '../screens/resident/profile/EditProfileScreen'; 
import ServicemanEntryScreen from '../screens/guard/ServicemanEntryScreen';
import RaiseTicketScreen from '../screens/resident/helpdesk/RaiseTicketScreen';
import NeighboursScreen from '../screens/resident/services/NeighboursScreen';
import DocumentsScreen from '../screens/resident/services/DocumentsScreen';
import ApprovalPendingScreen from '../screens/auth/ApprovalPendingScreen';

const Stack = createNativeStackNavigator();

/**
 * Default screen options
 */
const defaultScreenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: colors.background.primary,
  },
  animation: 'slide_from_right',
};

/**
 * Modal screen options
 */
const modalScreenOptions = {
  ...defaultScreenOptions,
  presentation: 'modal',
  animation: 'slide_from_bottom',
};

/**
 * Resident Stack Navigator
 */
const ResidentStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ResidentTabs"
      screenOptions={defaultScreenOptions}>
      
      {/* Main Tabs */}
      <Stack.Screen
        name="ResidentTabs"
        component={ResidentTabs}
      />

      <Stack.Screen 
        name="ApprovalPending" 
        component={ApprovalPendingScreen} 
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* ==================== HOME SCREENS ==================== */}
      
      <Stack.Screen
        name="HomeAlert"
        component={HomeAlertScreen}
        options={modalScreenOptions}
      />

      <Stack.Screen
        name="AllowGuest"
        component={AllowGuestScreen}
      />

      <Stack.Screen
        name="AllowCab"
        component={AllowCabScreen}
      />

      <Stack.Screen
        name="AllowDelivery"
        component={AllowDeliveryScreen}
      />

      <Stack.Screen
        name="AllowServiceman"
        component={AllowServicemanScreen}
      />

      <Stack.Screen name="ServicemanEntry" component={ServicemanEntryScreen} />

      <Stack.Screen
        name="Gatepass"
        component={GatepassScreen}
      />

      <Stack.Screen
        name="EntryCall"
        component={EntryCallScreen}
        options={modalScreenOptions}
      />

      {/* ==================== HELPDESK SCREENS ==================== */}

      <Stack.Screen
        name="HelpDesk"
        component={HelpDeskScreen}
      />

      <Stack.Screen
        name="RaiseComplaint"
        component={RaiseComplaintScreen}
      />

      <Stack.Screen
        name="ComplaintInfo"
        component={ComplaintInfoScreen}
      />

      <Stack.Screen name="RaiseTicket" component={RaiseTicketScreen} />

      {/* ==================== NOTICE SCREENS ==================== */}

      <Stack.Screen
        name="NoticeBoard"
        component={NoticeBoardScreen}
      />

      {/* ==================== PAYMENT SCREENS ==================== */}

      {/* <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
      /> 

      <Stack.Screen
        name="PaymentReceipt"
        component={PaymentReceiptScreen}
      /> */}

      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentReceipt" component={PaymentReceiptScreen} />

      {/* ==================== AMENITY SCREENS ==================== */}

      <Stack.Screen
        name="BookedAmenities"
        component={BookedAmenitiesScreen}
      />

      <Stack.Screen
        name="SelectAmenity"
        component={SelectAmenityScreen}
      />

      <Stack.Screen
        name="AmenitiesPayment"
        component={AmenitiesPaymentScreen}
      />

      {/* ==================== COMMUNITY SCREENS ==================== */}

       <Stack.Screen
        name="Posts"
        component={PostsScreen}
      />

      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={modalScreenOptions}
      />

      <Stack.Screen
        name="Chat"
        component={ChatScreen}
       /> 

      <Stack.Screen
        name="Residents"
        component={ResidentsScreen}
      /> 

       <Stack.Screen
        name="Chatting"
        component={ChattingScreen}
      /> 

      {/* ==================== SERVICE SCREENS ==================== */}

      <Stack.Screen
        name="Services"
        component={ServicesScreen}
      />

      <Stack.Screen
        name="BookService"
        component={BookServiceScreen}
      />

      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
      />

      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Neighbours" component={NeighboursScreen} />

      {/* ==================== PROFILE SCREENS ==================== */}
      

       <Stack.Screen
        name="MyPosts"
        component={MyPostsScreen}
      />

      <Stack.Screen
        name="Household"
        component={HouseholdScreen}
      />

      <Stack.Screen
        name="AddFamily"
        component={AddFamilyScreen}
      />

      <Stack.Screen
        name="AddHelps"
        component={AddHelpsScreen}
      />

      <Stack.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
      />

      <Stack.Screen
        name="AddEntries"
        component={AddEntriesScreen}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Stack.Screen
        name="Support"
        component={SupportScreen}
      />

      <Stack.Screen
        name="TermsConditions"
        component={TermsConditionsScreen}
      /> 


      

    </Stack.Navigator>
  );
};

export default ResidentStack;