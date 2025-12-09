/**
 * Navigation Type Definitions
 */

export type RootStackParamList = {
  // Auth Flow
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;

  // Main App
  MainTabs: undefined;
  BookingFlow: undefined;
  MechanicProfile: { mechanicId: string };
  BookingDetails: { bookingId: string };
  AIDiagnosis: undefined;
  EmergencyService: undefined;
  ChatList: undefined;
  ChatRoom: { conversationId: string; userName: string };
  MyVehicles: undefined;
  AddVehicle: undefined;
  MaintenanceReminders: undefined;
  Loyalty: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Find: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type BookingFlowParamList = {
  SelectVehicle: undefined;
  SelectService: undefined;
  DescribeIssue: undefined;
  ChooseDateTime: undefined;
  SelectLocation: undefined;
  ReviewConfirm: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
